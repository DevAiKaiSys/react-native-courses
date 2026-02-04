import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MotiView } from 'moti';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeOutRight, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { useAppSelector } from '../app/hooks';
import { selectCount } from '../features/cart/cartSlice';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { bottom } = useSafeAreaInsets();
    const { width } = Dimensions.get('window');
    const cartCount = useAppSelector(selectCount)

    return (
        <MotiView
            from={{ marginBottom: 0, opacity: 0 }}
            animate={{ marginBottom: bottom, opacity: 1 }}
            transition={{
                type: 'spring',
                damping: 80,
                stiffness: 500,
            }}
            style={[styles.container, { marginHorizontal: width * 0.06 }]}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const tabBarIcon = options.tabBarIcon;

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const renderedLabel = typeof label === 'function'
                    ? label({
                        focused: isFocused,
                        color: COLORS.primaryDarkGrey,
                        position: 'below-icon',
                        children: route.name
                    })
                    : label;

                return (
                    <MotiView
                        key={route.key}
                        layout={LinearTransition.springify().damping(80).stiffness(200)}
                        animate={styles.itemView}
                    >
                        {!isFocused && route.name === 'Cart' && cartCount > 0 && (
                            <View style={styles.productNumberContainer}>
                                <Text style={styles.productNumber}>{cartCount} </Text>
                            </View>
                        )}

                        <Pressable
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={[styles.itemButton, { backgroundColor: isFocused ? COLORS.primaryOrange : COLORS.primaryVeryWhite }]}>
                            {tabBarIcon && tabBarIcon({
                                focused: isFocused,
                                color: isFocused ? COLORS.primaryVeryWhite : COLORS.primaryBlack,
                                size: 24
                            })}
                            {isFocused && (
                                <Animated.Text
                                    style={[styles.text, { color: isFocused ? COLORS.primaryVeryWhite : COLORS.primaryBlack }]}
                                    exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                                    entering={FadeInRight.springify().damping(80).stiffness(200)}
                                >
                                    {renderedLabel}
                                </Animated.Text>
                            )}
                        </Pressable>
                    </MotiView>
                )
            })}
        </MotiView>
    )
}

export default CustomTabBar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.primaryVeryWhite,
        borderRadius: 50,
        overflow: 'hidden',
        paddingVertical: 12,
    },
    itemView: {
        overflow: 'hidden',
    },
    itemButton: {
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 4,
    },
    text: {
        fontSize: 15,
        fontWeight: 'medium',
    },
    productNumberContainer: {
        position: 'absolute',
        top: 0,
        right: 1,
        width: 22,
        height: 22,
        backgroundColor: COLORS.primaryRed,
        borderRadius: 50,
        zIndex: 70,
        alignItems: 'center',
        justifyContent: 'center'

    },
    productNumber: {
        color: COLORS.primaryVeryWhite,
        alignSelf: 'center'
    }
})