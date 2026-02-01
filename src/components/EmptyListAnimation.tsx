import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_FAMILY, lottieUrl } from '../constants';
import LottieView from 'lottie-react-native';

type EmptyListAnimationType = {
    title: string;
}

const EmptyListAnimation = ({ title }: EmptyListAnimationType) => {
    return (
        <View style={styles.emptyCardContainer}>
            <LottieView
                style={styles.lottieStyle}
                source={{ uri: lottieUrl }}
                autoPlay
                loop
            />
            <Text style={styles.lottieText}>{title}</Text>
        </View>
    )
}

export default EmptyListAnimation

const styles = StyleSheet.create({
    emptyCardContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    lottieStyle: {
        height: 300

    },
    lottieText: {
        fontSize: 16,
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryOrange,
        textAlign: 'center',
    }
})