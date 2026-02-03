import { StaticParamList } from "@react-navigation/native";
import { MainTabsNavigation } from "../navigation/MainTabsNavigation";
import { RootStack } from "../navigation/RootNavigator";

export type RootStackParamList = Omit<StaticParamList<typeof RootStack>, 'ProductDetails'> & {
    ProductDetails: {
        _id: string;
    };
};

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

export type ItemPrice = {
    currency: '$';
    size: 'S' | 'M' | 'L' | string;
    quantity: number;
    price: number;
};
export type CartProductType = {
    _id?: string;
    images: string[];
    name: string;
    brand: string;
    prices: ItemPrice[];
};

export type CartSliceType = {
    cartList: CartProductType[];
    totalPrice: number; // -> calc the total price
    totalItems: number;
};