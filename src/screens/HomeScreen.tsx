import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONT_FAMILY, homeTitle } from '../constants'
import { MotiView } from 'moti'

const HomeScreen = () => {
  /* const animatedTitle = [...homeTitle.split(' '), '"'].filter(
    word => word !== '"',
  ); */
  const animatedTitle = homeTitle.trim().split(/\s+/);

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
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
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  titleText: {
    fontSize: 28,
    fontFamily: FONT_FAMILY.poppins_semibold,
    color: COLORS.primaryBlack,
    paddingLeft: 8,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: 3,
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
})