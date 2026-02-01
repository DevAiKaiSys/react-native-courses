import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_FAMILY } from '../constants';
import { LinearGradient } from 'react-native-linear-gradient';
import { Minus, Plus } from 'lucide-react-native';
import { ItemPrice } from '../types';

type CartItemType = {
    _id: string;
    name: string;
    image: string;
    brand: string;
    prices: ItemPrice[]
}

const CartItem = ({ name, image, brand, prices }: CartItemType) => {
    return (
        <View>
            {prices.length > 1 ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cartItemLinearGradient}
                    colors={[COLORS.primaryVeryWhite, COLORS.primaryVeryWhite]}>

                    <View style={styles.cartItemInfoDetails}>
                        <Image source={{ uri: image }}
                            style={styles.cartImage}
                            resizeMode="cover" />

                        <View style={styles.cartItemInfo}>
                            <View>
                                <Text style={styles.cardTitle}>{name}</Text>
                                <Text style={styles.cardBrandName}>{brand}</Text>
                            </View>
                        </View>
                    </View>

                    {prices.map((item, index) => (
                        <View key={index} style={styles.cartItemRowQntContainer} >
                            <View style={styles.cartItemSizeContainer}>
                                <View style={styles.sizeBoxContainer}>
                                    <Text style={styles.sizeBoxText}> {item.size}</Text>
                                </View>
                                <Text style={styles.cardPriceCurrency}>
                                    $ <Text style={styles.cardPriceAmount}>{item.price}</Text>
                                </Text>
                            </View>

                            <View style={styles.cartItemQntContainer}>
                                <TouchableOpacity
                                    style={styles.addToCardButton}
                                    onPress={() => { }}>
                                    <Minus
                                        color={COLORS.primaryWhite}
                                        size={16}
                                    />
                                </TouchableOpacity>

                                <View style={styles.cartItemQnt}>
                                    <Text style={styles.cartItemQntText}> {3} </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.addToCardButton}
                                    onPress={() => { }}
                                >
                                    <Plus
                                        color={COLORS.primaryWhite}
                                        size={16}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <View style={styles.extraPadding} />
                </LinearGradient >
            ) : (
                // single size
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cartItemSingleLinearGradient}
                    colors={[COLORS.primaryVeryWhite, COLORS.primaryVeryWhite + '40']}>
                    <View>

                        <Image source={{ uri: image }}
                            style={styles.cardSingleImage}
                            resizeMode="cover" />
                    </View>

                    {/* product details */}
                    <View style={styles.cardItemInfoSingleContainer}>
                        {/* title & brand */}
                        <View>
                            <Text style={styles.cardTitle}>{name}</Text>
                            <Text style={styles.cardBrandName}>{brand}</Text>
                        </View>
                        {/* size & price */}
                        <View style={styles.cartItemSingleSizeContainer}>
                            <View style={styles.sizeBoxContainer}>
                                <Text style={styles.sizeBoxText}> {prices[0].size}</Text>
                            </View>
                            <Text style={styles.cardPriceCurrency}>
                                $ <Text style={styles.cardPriceAmount}>{prices[0].price}</Text>
                            </Text>
                        </View>

                        <View style={styles.cartItemSingleQntContainer}>
                            <TouchableOpacity
                                style={styles.addToCardButton}
                                onPress={() => { }}>
                                <Minus
                                    color={COLORS.primaryWhite}
                                    size={16}
                                />
                            </TouchableOpacity>
                            <View style={styles.cartItemQnt}>
                                <Text style={styles.cartItemQntText}> {3} </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.addToCardButton}
                                onPress={() => { }}>
                                <Plus
                                    color={COLORS.primaryWhite}
                                    size={16}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )}
        </View >
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItemSingleLinearGradient: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 25,
    },
    extraPadding: {
        height: 20,
    },
    cartItemLinearGradient: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 12,
        padding: 12,
        borderRadius: 25,
    },
    cartItemRowQntContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20,
        paddingRight: 20,
        height: 55,
    },
    cartItemQntContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cartItemInfoDetails: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        flex: 1,
    },
    cartItemInfo: {
        flex: 1,
        paddingVertical: 4,
        justifyContent: 'space-between'
    },
    cardItemInfoSingleContainer: {
        display: 'flex',
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around'
    },
    cartItemSizeContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between'
    },
    cartImage: {
        width: 130,
        height: 90,
        borderRadius: 10,
    },
    cardSingleImage: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    cartItemSingleSizeContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        justifyContent: 'space-evenly'

    },
    cartItemSingleQntContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 70,
        marginTop: -12

    },
    cartItemQnt: {
        backgroundColor: COLORS.primaryVeryWhite,
        height: 38,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primaryOrange
    },
    cartItemQntText: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryGrey,
        fontSize: 16
    },
    sizeBoxContainer: {
        backgroundColor: COLORS.primaryWhite,
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    sizeBoxText: {
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryLightGrey + 'AA'
    },
    addToCardButton: {
        backgroundColor: COLORS.primaryOrange,
        padding: 7,
        borderRadius: 8
    },
    cardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 15,
        position: 'absolute',
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        top: 0,
        right: 0,
    },
    cardTitle: {
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryBlack,
        fontSize: 18,
    },
    cardBrandName: {
        fontFamily: FONT_FAMILY.poppins_light,
        color: COLORS.secondaryLightGrey,
        fontSize: 11,
    },
    cardFooterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 22
    },
    cardPriceCurrency: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryOrange,
        fontSize: 18,
    },
    cardPriceAmount: {
        color: COLORS.primaryBlack,
    },
    cardDetailsWrapper: {
        paddingHorizontal: 18
    }
})