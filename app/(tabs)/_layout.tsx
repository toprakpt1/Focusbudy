import { Tabs } from 'expo-router';
import { Home, User, ShoppingBag } from 'lucide-react-native';
import { THEME } from '../../src/constants/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: THEME.colors.primary.cat,
                tabBarInactiveTintColor: THEME.colors.text.secondary,
                tabBarStyle: {
                    backgroundColor: THEME.colors.backgrounds.card,
                    borderTopWidth: 1,
                    borderTopColor: THEME.colors.ui.border,
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
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
