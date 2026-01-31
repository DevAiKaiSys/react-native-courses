import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { COLORS, ProductDataSample } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Scroll } from 'lucide-react-native';
import ImageSlider from '../components/ImageSlider';
import { MotiView } from 'moti';

type ProductDetailsScreenProp = RouteProp<RootStackParamList, 'ProductDetails'>;
const ProductDetailsScreen = () => {
    const route = useRoute<ProductDetailsScreenProp>();
    const { _id } = route.params;
    // dummy data..
    const productItem = ProductDataSample.filter(item => item._id === _id)[0];
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <ArrowLeft
                        color={COLORS.primaryLightGrey}
                        size={15} />
                </TouchableOpacity>
                <MotiView>
                    <ImageSlider />
                </MotiView>
            </ScrollView>
            <Text>ProductDetailsScreen {productItem.name}</Text>
        </SafeAreaView>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhite,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    backButton: {
        marginTop: 10,
        position: 'absolute',
        padding: 12,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryWhite,
        borderColor: COLORS.primaryOrange,
        borderWidth: 2,
        borderRadius: 12,
        top: -3,
        left: 15,
    },
})