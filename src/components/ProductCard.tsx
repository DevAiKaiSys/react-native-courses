import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ProductCardType } from '../types'
import { Plus, Star } from 'lucide-react-native'
import { COLORS, FONT_FAMILY } from '../constants'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const IMAGE_WIDTH = Dimensions.get('window').width * 0.32
const ProductCard = ({ _id, image, name, brand, average_rate, price, onPress }: ProductCardType) => {
  const opacity = useSharedValue(1);
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
      colors={[COLORS.primaryVeryWhite, COLORS.primaryVeryWhite + '40']}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.cardImage}
        resizeMode="cover"
      >
        <View style={styles.cardRatingContainer}>
          <Star
            color={COLORS.primaryOrange}
            size={16}
          />
          <Text style={styles.cardRatingText}>{Number(average_rate).toFixed(1)}</Text>
        </View>
      </ImageBackground>

      <View style={styles.cardDetailsWrapper}>
        <Text style={styles.cardTitle}>{name.length >= 22 ? name.slice(0, 22) + "..." : name}</Text>
        <Text style={styles.cardBrandName}>{brand}</Text>
        <View style={styles.cardFooterContainer}>
          <Text style={styles.cardPriceCurrency}>
            $ <Text style={styles.cardPriceAmount}>{price}</Text>
          </Text>
          <AnimatedTouchableOpacity
            style={[animatedStyle, styles.addToCardButton]}
            onPress={onPress}>
            <Plus
              color={COLORS.primaryWhite}
              size={16}
            />
          </AnimatedTouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  linearGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 25,
    width: 175,
    minHeight: 300,
    display: 'flex',
  },
  cardImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
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
  cardRatingText: {
    fontFamily: FONT_FAMILY.poppins_medium,
    color: COLORS.primaryWhite,
    lineHeight: 22,
    fontSize: 14,
  },
  cardTitle: {
    fontFamily: FONT_FAMILY.poppins_medium,
    color: COLORS.primaryBlack,
    fontSize: 16,
  },
  cardBrandName: {
    fontFamily: FONT_FAMILY.poppins_light,
    color: COLORS.secondaryLightGrey,
    fontSize: 10,
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