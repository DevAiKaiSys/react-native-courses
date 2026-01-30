import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { categories, COLORS, FONT_FAMILY, homeTitle } from '../constants'
import { MotiView } from 'moti'
import { Search, X } from 'lucide-react-native'

const HomeScreen = () => {
  /* const animatedTitle = [...homeTitle.split(' '), '"'].filter(
    word => word !== '"',
  ); */
  const animatedTitle = homeTitle.trim().split(/\s+/);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    index: 0,
    category: categories[0],
  });

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
      {/* Input */}
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 50,
          delay: 300,
        }}
        style={styles.inputContainer}>
        <Search
          style={styles.icon}
          size={18}
          color={
            searchText.length > 0
              ? COLORS.primaryOrange
              : COLORS.primaryLightGrey
          }
        />
        <TextInput
          placeholder="Find Your Product..."
          style={styles.textInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={COLORS.primaryLightGrey}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText('')}
          >
            <X
              style={styles.icon}
              color={COLORS.primaryLightGrey}
              size={16}
            />
          </TouchableOpacity>
        )}
      </MotiView>
      {/* Category Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainerStyle}
        data={categories}
        renderItem={({ index, item }) => (
          <MotiView
            from={{
              opacity: 0,
              translateY: 10,
            }}
            animate={{
              opacity: 1,
              translateY: 0
            }}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 150,
              delay: index * 200,
            }}
            key={index.toString()}
            style={styles.categoryAnimatedView}
          >
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                setSelectedCategory({
                  index: index,
                  category: categories[index],
                });
              }}
            >
              <Text
                style={[
                  styles.categoryTitle,
                  {
                    color:
                      selectedCategory.index === index
                        ? COLORS.primaryOrange
                        : COLORS.primaryLightGrey,
                  },
                ]}
              >
                {item}
              </Text>
              {/* circle */}
              {selectedCategory.index === index && (
                <MotiView
                  from={{
                    opacity: 0,
                    translateY: 10,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                  }}
                  style={styles.activeCircle}
                />
              )}
            </TouchableOpacity>
          </MotiView>
        )}
      />
      <Text>HomeScreen</Text>
    </SafeAreaView >
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
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.primaryVeryWhite,
    borderRadius: 20,
    margin: 30,
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    height: 60,
    fontFamily: FONT_FAMILY.poppins_medium,
    fontSize: 14,
    color: COLORS.primaryDarkGrey,
  },
  categoryContainerStyle: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryAnimatedView: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontFamily: FONT_FAMILY.poppins_semibold,
    fontSize: 16,
    marginBottom: 4,
  },
  activeCircle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primaryOrange,
  },
})