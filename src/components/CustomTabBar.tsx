import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import * as icons from 'lucide-react-native/icons';
import { COLORS } from '../constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import Animated, { LinearTransition, FadeInRight, FadeOutRight } from 'react-native-reanimated'

interface IconProps {
    name: keyof typeof icons;
    color?: string;
    size?: number;
}

const Icon = ({ name, color, size }: IconProps) => {
    const LucideIcon = icons[name];

    return <LucideIcon color={color} size={size} />;
};

type dataItem = {
    label: string;
    route: string;
    name: keyof typeof icons;
}

type CustomTabBarProps = BottomTabBarProps & {
    data: dataItem[],
    onChange?: (index: number) => void,
};

const CustomTabBar = ({ state, descriptors, navigation, data, onChange }: CustomTabBarProps) => {
    const { bottom } = useSafeAreaInsets();
    const { width } = Dimensions.get('window');

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
            {data.map((item, index) => {
                const isSelected = state.index === index;

                return (
                    <MotiView
                        key={index}
                        layout={LinearTransition.springify().damping(80).stiffness(200)}
                        animate={styles.itemView}
                    >
                        {!isSelected && item.route === 'Cart' && (
                            <View style={styles.productNumberContainer}>
                                <Text style={styles.productNumber}>0</Text>
                            </View>
                        )}

                        <Pressable
                            onPress={() => {
                                onChange?.(index);
                                navigation.navigate('MainTabs', { screen: item.route });
                            }}
                            style={[styles.itemButton, { backgroundColor: isSelected ? COLORS.primaryOrange : COLORS.primaryVeryWhite }]}>
                            <Icon name={item.name} color={isSelected ? COLORS.primaryVeryWhite : COLORS.primaryBlack} />
                            {isSelected && (
                                <Animated.Text
                                    style={[styles.text, { color: isSelected ? COLORS.primaryVeryWhite : COLORS.primaryBlack }]}
                                    exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                                    entering={FadeInRight.springify().damping(80).stiffness(200)}
                                >
                                    {item.label}
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