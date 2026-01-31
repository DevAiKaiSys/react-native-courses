import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabsNavigation } from './MainTabsNavigation';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

export const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        MainTabs: MainTabsNavigation,
        ProductDetails: ProductDetailsScreen,
    },
});

const Navigation = createStaticNavigation(RootStack);

const RootNavigator = () => {
    return <Navigation />;
}

export default RootNavigator