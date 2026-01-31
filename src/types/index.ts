import { StaticParamList } from "@react-navigation/native";
import { RootStack } from "../navigation/RootNavigator";
import { MainTabsNavigation } from "../navigation/MainTabsNavigation";

export type RootStackParamList = StaticParamList<typeof RootStack>;

export type TabNavigationParamList = StaticParamList<typeof MainTabsNavigation>;

export type ProductCardType = {
  _id?: string;
  image?: string;
  name: string;
  brand: string;
  average_rate: number | string;
  price: number;
  onPress?: () => void;
};