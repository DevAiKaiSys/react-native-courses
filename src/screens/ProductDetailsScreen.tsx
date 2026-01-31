import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { COLORS, FONT_FAMILY, ProductDataSample } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star } from 'lucide-react-native';
import ImageSlider from '../components/ImageSlider';
import { MotiText, MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';

type ProductDetailsScreenProp = RouteProp<RootStackParamList, 'ProductDetails'>;
const ProductDetailsScreen = () => {
    const route = useRoute<ProductDetailsScreenProp>();
    const { _id } = route.params;
    const navigation = useNavigation();
    // dummy data..
    const productItem = ProductDataSample.filter(item => item._id === _id)[0];
    const animatedTitle = [...productItem.name.split(' '), '"'].filter(
        word => word !== '"',
    );
    const [price, setPrice] = useState(productItem.prices[0]);

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
                <View style={styles.titleContainer}>
                    {animatedTitle.map((text, index) => (
                        <MotiView
                            key={index}
                            from={{
                                opacity: 0,
                                translateY: 10,
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0,
                            }}
                            transition={{
                                type: 'spring',
                                delay: index * 250,
                            }}>
                            <Text style={styles.titleText}>{text}</Text>
                        </MotiView>
                    ))}
                </View>
                {/* desc & size */}
                <View style={styles.footerInfoArea}>
                    {/* desc title */}
                    <MotiText style={styles.infoTitle}>
                        Description
                    </MotiText>
                    <MotiText style={styles.descText}>
                        {productItem.description}
                    </MotiText>
                    {/* size */}
                    <MotiText style={styles.infoTitle}>
                        Size
                    </MotiText>
                    {/* size selection */}
                    <View style={styles.sizeOuterContainer}>
                        {productItem.prices.map((item, index) => (
                            <MotiPressable
                                onPress={() => setPrice(item)}
                                style={[
                                    styles.sizeBox,
                                    {
                                        borderColor:
                                            item.size === price.size
                                                ? COLORS.primaryOrange
                                                : COLORS.primaryGrey,
                                    },
                                ]}
                                key={index}
                            >
                                <Text style={[
                                    styles.sizeTextBox,
                                    {
                                        color:
                                            item.size === price.size
                                                ? COLORS.primaryOrange
                                                : COLORS.primaryGrey,
                                    },
                                ]}>
                                    {' '}
                                    {item.size}{' '}
                                </Text>
                            </MotiPressable>
                        ))}
                    </View>
                </View>
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
    titleText: {
        fontSize: 22,
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryBlack,
        paddingLeft: 5,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        rowGap: 3,
        flexWrap: 'wrap',
        paddingTop: 8,
        paddingHorizontal: 10,
    },
    footerInfoArea: {
        padding: 20,
    },
    infoTitle: {
        fontSize: 16,
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryBlack,
        marginTop: 18,
    },
    descText: {
        fontSize: 14,
        fontFamily: FONT_FAMILY.poppins_regular,
        color: COLORS.primaryGrey,
        marginTop: 3,
    },
    sizeOuterContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginTop: 8,
    },
    sizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryVeryWhite,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        width: Dimensions.get('window').width * 0.26,
    },
    sizeTextBox: {
        fontFamily: FONT_FAMILY.poppins_medium,
    },
})