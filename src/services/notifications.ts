import { Platform } from 'react-native';
import i18n from '../translate/i18n';

// Expo Go'da expo-notifications hatasını önlemek için koşullu import
let Notifications: any;
try {
    Notifications = require('expo-notifications');
} catch (error) {
    console.warn('expo-notifications not available in Expo Go');
    Notifications = null;
}

const TIMER_NOTIFICATION_KIND = 'timer-complete';
const STREAK_NOTIFICATION_KIND = 'streak-reminder';
const DEFAULT_CHANNEL_ID = 'default';
const STREAK_REMINDER_HOUR = 20;

type TimerNotificationPhase = 'work' | 'shortBreak' | 'longBreak';
type DailyHistory = Record<string, { count: number; duration: number }>;

if (Notifications) {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });
}

const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getNotificationBodyForPhase = (phase: TimerNotificationPhase) => {
    if (phase === 'work') {
        return {
            title: i18n.t('notifications.focus_complete_title'),
            body: i18n.t('notifications.focus_complete_body'),
        };
    }

    return {
        title: i18n.t('notifications.break_complete_title'),
        body: i18n.t(
            phase === 'longBreak'
                ? 'notifications.long_break_complete_body'
                : 'notifications.short_break_complete_body'
        ),
    };
};

async function ensureAndroidChannel() {
    if (Platform.OS !== 'android' || !Notifications) return;

    await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL_ID, {
        name: 'General',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: 'default',
    });
}

async function cancelNotificationsByKind(kind: string) {
    if (!Notifications) return;
    
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const matching = scheduled.filter((item: any) => item.content.data?.kind === kind);

    await Promise.all(matching.map((item: any) => Notifications.cancelScheduledNotificationAsync(item.identifier)));
}

export async function ensureNotificationPermissions() {
    if (Platform.OS === 'web' || !Notifications) return false;

    const current = await Notifications.getPermissionsAsync();

    if (current.granted || current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
        await ensureAndroidChannel();
        return true;
    }

    const requested = await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: false,
            allowSound: true,
        },
    });

    const granted =
        requested.granted ||
        requested.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

    if (granted) {
        await ensureAndroidChannel();
    }

    return granted;
}

export async function scheduleTimerCompletionNotification({
    phase,
    secondsUntilTrigger,
}: {
    phase: TimerNotificationPhase;
    secondsUntilTrigger: number;
}) {
    if (Platform.OS === 'web' || !Notifications) return;
    if (secondsUntilTrigger <= 0) return;

    const hasPermission = await ensureNotificationPermissions();
    if (!hasPermission) return;

    await cancelNotificationsByKind(TIMER_NOTIFICATION_KIND);

    const content = getNotificationBodyForPhase(phase);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: content.title,
            body: content.body,
            sound: 'default',
            data: { kind: TIMER_NOTIFICATION_KIND, phase },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            channelId: DEFAULT_CHANNEL_ID,
            date: Date.now() + secondsUntilTrigger * 1000,
        },
    });
}

export async function cancelTimerCompletionNotifications() {
    if (Platform.OS === 'web' || !Notifications) return;
    await cancelNotificationsByKind(TIMER_NOTIFICATION_KIND);
}

export async function scheduleStreakReminder({
    history,
    streak,
}: {
    history: DailyHistory;
    streak: number;
}) {
    if (Platform.OS === 'web' || !Notifications) return;
    await cancelNotificationsByKind(STREAK_NOTIFICATION_KIND);

    if (streak <= 0) return;

    const hasPermission = await ensureNotificationPermissions();
    if (!hasPermission) return;

    const today = new Date();
    const todayKey = formatDateKey(today);
    const hasFocusedToday = (history[todayKey]?.count ?? 0) > 0;

    const reminderAt = new Date();
    reminderAt.setHours(STREAK_REMINDER_HOUR, 0, 0, 0);

    if (hasFocusedToday || reminderAt.getTime() <= Date.now()) {
        reminderAt.setDate(reminderAt.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: i18n.t('notifications.streak_title'),
            body: i18n.t('notifications.streak_body', { streak }),
            sound: 'default',
            data: { kind: STREAK_NOTIFICATION_KIND },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            channelId: DEFAULT_CHANNEL_ID,
            date: reminderAt,
        },
    });
}

export async function cancelAllAppNotifications() {
    if (Platform.OS === 'web' || !Notifications) return;
    await Promise.all([
        cancelNotificationsByKind(TIMER_NOTIFICATION_KIND),
        cancelNotificationsByKind(STREAK_NOTIFICATION_KIND),
    ]);
}
