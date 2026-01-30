import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar';
import * as icons from 'lucide-react-native/icons';

interface IconProps {
    name: keyof typeof icons;
    color?: string;
    size?: number;
}

const Icon = ({ name, color, size }: IconProps) => {
    const LucideIcon = icons[name];

    return <LucideIcon color={color} size={size} />;
};

export const MainTabsNavigation = createBottomTabNavigator({
    screenOptions: ({ route }) => ({
        tabBarIcon: ({ color, size }) => {
            const iconMaps: Record<string, keyof typeof icons> = {
                Home: 'House',
                Profile: 'User',
                Cart: 'ShoppingCart',
            };

            return (
                <Icon
                    name={iconMaps[route.name]}
                    color={color}
                    size={size}
                />
            );
        },
    }),
    tabBar: (props) => <CustomTabBar {...props} />,
    screens: {
        Home: HomeScreen,
        Cart: CartScreen,
        Profile: ProfileScreen,
    },
});