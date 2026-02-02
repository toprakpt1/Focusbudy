// Character Types
export type CompanionType = 'cat' | 'dog' | 'panda' | 'fox';

export type CharacterMood =
    | 'idle'
    | 'happy'
    | 'sad'
    | 'sleepy'
    | 'focused'
    | 'celebrating';

export interface Companion {
    id: CompanionType;
    name: string;
    unlocked: boolean;
    price?: number;
    color: string;
}

// Timer Types
export type TimerPhase = 'work' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerState {
    timeLeft: number;
    totalTime: number;
    phase: TimerPhase;
    status: TimerStatus;
    sessionsCompleted: number;
}

// User Progress Types
export interface UserStats {
    xp: number;
    level: number;
    streak: number;
    totalFocusTime: number; // in seconds
    sessionsToday: number;
    currency: number;
    activeCompanion: CompanionType;
    unlockedCompanions: CompanionType[];
    isPremium: boolean;
     lastSessionOutcome: 'none' | 'completed' | 'abandoned';
}

// Settings Types
export interface AppSettings {
    workDuration: number;      // in minutes
    shortBreakDuration: number;
    longBreakDuration: number;
    sessionsUntilLongBreak: number;
    soundEnabled: boolean;
    hapticsEnabled: boolean;
    notificationsEnabled: boolean;
}
