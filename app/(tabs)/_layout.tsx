import { Tabs } from 'expo-router';
import { Home, User, ShoppingBag } from 'lucide-react-native';
import { useTheme } from '../../src/constants/theme';

export default function TabLayout() {
    const theme = useTheme();
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
                    paddingTop: 10,
                    paddingBottom: 10,
                    height: 64,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    letterSpacing: 0.3,
                },
                tabBarItemStyle: {
                    paddingVertical: 4,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: 'Shop',
                    tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}
