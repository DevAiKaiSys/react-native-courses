import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const MainTabsNavigation = createBottomTabNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Home: HomeScreen,
        Profile: ProfileScreen,
        Cart: CartScreen,
    },
});