import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabsNavigation } from './MainTabsNavigation';

export const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        MainTabs: MainTabsNavigation,
    },
});

const Navigation = createStaticNavigation(RootStack);

const RootNavigator = () => {
    return <Navigation />;
}

export default RootNavigator