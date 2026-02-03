import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Star } from 'lucide-react-native';
import { MotiText, MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageSlider from '../components/ImageSlider';
import PaymentFooter from '../components/PaymentFooter';
import { COLORS, FONT_FAMILY, ProductDataSample } from '../constants';
import { useAppDispatch } from '../store';
import { useGetProductsQuery } from '../store/api';
import { RootStackParamList } from '../types';

type ProductDetailsScreenProp = RouteProp<RootStackParamList, 'ProductDetails'>;
const ProductDetailsScreen = () => {
    const route = useRoute<ProductDetailsScreenProp>();
    const { _id } = route.params;
    const { data: products } = useGetProductsQuery(undefined, {
        pollingInterval: 5000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    // dummy data..
    const productItem = ProductDataSample.filter(item => item._id === _id)[0];
    const animatedTitle = [...productItem.name.split(' '), '"'].filter(
        word => word !== '"',
    );
    const [price, setPrice] = useState(productItem.prices[0]);

    // animation
    const [step, setStep] = useState(0);
    // small delay before creating first animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep(1);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    // add item to the cart
    const handleAddItemToTheCart = (product: any, size: string) => {
        setLoading(true);
        dispatch({
            type: 'cart/addToCart',
            payload: {
                ...product,
                selectedSize: size,
            },
        });
        navigation.navigate('MainTabs', { screen: 'Cart' });
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.screenContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                <View>
                    {/* header & img slider */}
                    <MotiView
                        from={{ opacity: 0, translateY: 15 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        onDidAnimate={(key, finished) => {
                            if (key === 'opacity' && finished && step === 1) {
                                setStep(2); // trigger next step
                            }
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}
                            style={styles.backButton}>
                            <ArrowLeft
                                color={COLORS.primaryLightGrey}
                                size={15} />
                        </TouchableOpacity>
                        <ImageSlider imageLists={productItem.images} />
                    </MotiView>
                    {/* rating & price */}
                    <MotiView
                        from={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.5 }}
                        onDidAnimate={(key, finished) => {
                            if (key === 'opacity' && finished && step === 2) {
                                setStep(3); // trigger next step
                            }
                        }}
                        transition={{
                            type: 'spring',
                            damping: 20,
                            stiffness: 50,
                            delay: 300,
                        }}
                        style={styles.ratingContainer}>
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
                                    opacity: step >= 3 ? 1 : 0,
                                    translateY: step >= 3 ? 0 : 10,
                                }}
                                transition={{
                                    type: 'spring',
                                    delay: index * 250,
                                }}
                                onDidAnimate={(key, finished) => {
                                    if (key === 'opacity' && finished && step === 3) {
                                        setStep(4); // trigger next step
                                    }
                                }}
                            >
                                <Text style={styles.titleText}>{text}</Text>
                            </MotiView>
                        ))}
                    </View>
                    {/* desc & size */}
                    <View style={styles.footerInfoArea}>
                        {/* desc title */}
                        <MotiText
                            from={{
                                opacity: 0,
                                translateY: 10,
                            }}
                            animate={{
                                opacity: step >= 4 ? 1 : 0,
                                translateY: step >= 4 ? 0 : 10,
                            }}
                            transition={{
                                type: 'spring',
                                delay: 250,
                            }}
                            onDidAnimate={(key, finished) => {
                                if (key === 'opacity' && finished && step === 4) {
                                    setStep(5); // trigger next step
                                }
                            }}
                            style={styles.infoTitle}
                        >
                            Description
                        </MotiText>
                        <MotiText
                            from={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: step >= 5 ? 1 : 0,
                            }}
                            transition={{
                                type: 'spring',
                            }}
                            onDidAnimate={(key, finished) => {
                                if (key === 'opacity' && finished && step === 5) {
                                    setStep(6); // trigger next step
                                }
                            }}
                            style={styles.descText}
                        >
                            {productItem.description}
                        </MotiText>
                        {/* size */}
                        <MotiText
                            from={{
                                opacity: 0,
                                translateY: 10,
                            }}
                            animate={{
                                opacity: step >= 6 ? 1 : 0,
                                translateY: step >= 6 ? 0 : 10,
                            }}
                            transition={{
                                type: 'spring',
                                delay: 250,
                            }}
                            onDidAnimate={(key, finished) => {
                                if (key === 'opacity' && finished && step === 6) {
                                    setStep(7); // trigger next step
                                }
                            }}
                            style={styles.infoTitle}
                        >
                            Size
                        </MotiText>
                        {/* size selection */}
                        <View style={styles.sizeOuterContainer}>
                            {productItem.prices.map((item, index) => (
                                <MotiPressable
                                    from={{
                                        opacity: 0,
                                        translateY: 10,
                                    }}
                                    animate={{
                                        opacity: step >= 7 ? 1 : 0,
                                        translateY: step >= 7 ? 0 : 10,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        delay: index * 250,
                                    }}

                                    onPress={() => {
                                        setPrice(item);
                                    }}
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
                </View>

                <PaymentFooter
                    price={price.price}
                    onPress={() => handleAddItemToTheCart(productItem, price.size)}
                    buttonTitle={'Add To Cart'}
                    loading={loading}
                />
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