import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_FAMILY } from '../constants';

type FooterPaymentType = {
    price: string | number;
    onPress: () => void;
    buttonTitle: string;
    loading: boolean
}

const PaymentFooter = ({ price, onPress, buttonTitle, loading }: FooterPaymentType) => {
    return (
        <View style={styles.footerContainer}>
            <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}> Price </Text>
                <Text style={styles.cardPriceCurrency}>
                    $ <Text style={styles.cardPriceAmount}>{Number(price).toFixed(0) || 0}</Text>
                </Text>
            </View>
            <TouchableOpacity style={[styles.buttonContainer, loading && styles.buttonDisabled]} onPress={onPress}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PaymentFooter

const styles = StyleSheet.create({
    footerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: 20,
    },
    priceContainer: {
        alignItems: 'center',
        width: 100
    },
    priceTitle: {
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.secondaryLightGrey,
        fontSize: 14,
    },
    cardPriceCurrency: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryOrange,
        fontSize: 24,
    },
    cardPriceAmount: {
        color: COLORS.primaryBlack,
    },
    buttonContainer: {
        backgroundColor: COLORS.primaryOrange,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 72,
        borderRadius: 20
    },
    buttonText: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        fontSize: 18,
        color: COLORS.primaryVeryWhite
    },
    buttonDisabled: {
        opacity: 0.5
    }
})