import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONT_FAMILY, homeTitle } from '../constants'
import { MotiView } from 'moti'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <View>
        <MotiView>
          <Text style={styles.titleText}>{homeTitle}</Text>
        </MotiView>
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
})