import { Tabs } from 'expo-router';
import { Home, User, ShoppingBag } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/constants/theme';

export default function TabLayout() {
    const theme = useTheme();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    // YouTube tarzı düzgün tab bar yüksekliği
    const bottomPad = Math.max(insets.bottom, 0);
    const tabBarHeight = 56 + bottomPad;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary.cat,
                tabBarInactiveTintColor: theme.colors.text.muted,
                tabBarStyle: {
                    backgroundColor: theme.colors.backgrounds.cardSolid,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.ui.border,
                    height: tabBarHeight,
                    paddingTop: 8,
                    paddingBottom: bottomPad > 0 ? bottomPad : 0,
                    paddingHorizontal: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    marginTop: 0,
                    marginBottom: 0,
                },
                tabBarIconStyle: {
                    marginTop: 0,
                    marginBottom: 0,
                },
                tabBarItemStyle: {
                    paddingVertical: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: t('common.home'),
                    tabBarIcon: ({ color }) => <Home color={color} size={24} strokeWidth={2} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('common.profile'),
                    tabBarIcon: ({ color }) => <User color={color} size={24} strokeWidth={2} />,
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: t('common.shop'),
                    tabBarIcon: ({ color }) => <ShoppingBag color={color} size={24} strokeWidth={2} />,
                }}
            />
        </Tabs>
    );
}
