import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { COLORS, FONT_FAMILY, ProductDataSample } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star } from 'lucide-react-native';
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
                {/* header & img slider */}
                <MotiView>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <ArrowLeft
                            color={COLORS.primaryLightGrey}
                            size={15} />
                    </TouchableOpacity>
                    <ImageSlider imageLists={productItem.images} />
                </MotiView>
                {/* rating & price */}
                <MotiView style={styles.ratingContainer}>
                    <View style={styles.ratingValueContainer}>
                        <Star color={COLORS.primaryOrange} size={16} />
                        <Text style={styles.ratingText}>
                            {productItem.average_rating}
                        </Text>
                    </View>
                    <Text style={styles.cardPriceCurrency}>
                        ${' '}
                        <Text style={styles.cardPriceAmount}>
                            {productItem.prices[0].price}
                        </Text>
                    </Text>
                </MotiView>
            </ScrollView>
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
    ratingContainer: {
        marginHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 15,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.BlackRGBA30,
    },
    ratingValueContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    ratingText: {
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryLightGrey,
        fontSize: 14,
    },
    cardPriceCurrency: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryOrange,
        fontSize: 18,
    },
    cardPriceAmount: {
        color: COLORS.primaryBlack,
        fontSize: 25,
    },
})