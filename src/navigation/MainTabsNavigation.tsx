import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar';

export const MainTabsNavigation = createBottomTabNavigator({
    screenOptions: {
        headerShown: false,
    },
    tabBar: (props) => <CustomTabBar
        onChange={() => { }}
        data={[
            { label: "Home", name: 'House', route: 'Home' },
            { label: "Cart", name: 'ShoppingCart', route: 'Cart' },
            { label: "Profile", name: 'User', route: 'Profile' },
        ]}
        {...props}
    />,
    screens: {
        Home: HomeScreen,
        Cart: CartScreen,
        Profile: ProfileScreen,
    },
});