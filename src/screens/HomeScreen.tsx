import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Search, X } from 'lucide-react-native'
import { MotiView } from 'moti'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductCard from '../components/ProductCard'
import { categories, COLORS, FONT_FAMILY, homeTitle, ProductDataSample } from '../constants'
import { AppRootState, useAppDispatch, useAppSelector } from '../store'
import { RootStackParamList } from '../types'

const HomeScreen = () => {
  /* const animatedTitle = [...homeTitle.split(' '), '"'].filter(
    word => word !== '"',
  ); */
  const animatedTitle = homeTitle.trim().split(/\s+/);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // use selector...
  const dispatch = useAppDispatch();
  const totalProduct = useAppSelector(
    (state: AppRootState) => state.cart.cartList,
  );
  const [selectedCategory, setSelectedCategory] = useState({
    index: 0,
    category: categories[0],
  });
  const [step, setStep] = useState(0);
  // small delay before creating first animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(1);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  // filtered data
  const AllCategories = selectedCategory.category === 'All';
  const filteredProductsWithCategory = ProductDataSample?.filter(item =>
    AllCategories ? item : item.category === selectedCategory.category,
  );
  const filteredProductsWithSearch = filteredProductsWithCategory?.filter(
    item => item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  // add item to the cart
  const handleAddItemToTheCart = (product: any) => {
    dispatch({
      type: 'cart/addToCart',
      payload: {
        ...product,
        selectedSize: product.prices[0].size,
      },
    });
    console.log(totalProduct);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >

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
              onDidAnimate={(key, finished) => {
                if (key === 'opacity' && finished && step === 1) {
                  setStep(2); // trigger next step
                }
              }}
              transition={{
                type: 'spring',
                delay: index * 250,
              }}>
              <Text style={styles.titleText}>{text}</Text>
            </MotiView>
          ))}
        </View>
        {/* Search Input */}
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
        <View>
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
                  opacity: step >= 3 ? 1 : 0,
                  translateY: step >= 3 ? 0 : 10,
                }}
                onDidAnimate={(key, finished) => {
                  if (key === 'opacity' && finished && step === 3) {
                    setStep(4); // trigger next step
                  }
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
          {/* Products Section */}
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.productContainerFlatlist}
            data={filteredProductsWithSearch}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <MotiView
                from={{
                  opacity: 0,
                  translateY: 15,
                }}
                animate={{
                  opacity: step >= 4 ? 1 : 0,
                  translateY: step >= 4 ? 0 : 15,
                }}
                style={styles.emptyListContainer}
              >
                <Text style={styles.categoryTitle}>No Product Available</Text>
              </MotiView>
            )}
            numColumns={2}
            keyExtractor={item => item.name}
            renderItem={({ index, item }) => {
              const isLeftColumn = index % 2 === 0; // -> 1, 3, 5, .....

              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductDetails', { _id: item._id })}
                >
                  <MotiView
                    from={{
                      opacity: 0,
                      translateY: 15,
                    }}
                    animate={{
                      opacity: step >= 4 ? 1 : 0,
                      translateY: step >= 4 ? 0 : 15,
                      marginRight: isLeftColumn ? 22 : 0,
                    }}
                    onDidAnimate={(key, finished) => {
                      if (key === 'opacity' && finished && step === 4) {
                        setStep(5) // trigger next step
                      }
                    }}
                    transition={{
                      type: 'spring',
                      damping: 12,
                      stiffness: 30,
                      delay: index * 200,
                    }}
                  >
                    <ProductCard
                      name={item.name}
                      average_rate={item.average_rating}
                      _id={item._id}
                      image={item.images[0]}
                      brand={item.brand}
                      price={item.prices[0].price}
                      onPress={() => handleAddItemToTheCart(item)} />
                  </MotiView>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </ScrollView>
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
  productContainerFlatlist: {
    paddingVertical: 20,
    paddingBottom: 180,
    paddingHorizontal: 30,
  },
  emptyListContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  scrollView: {
    flexGrow: 1,
    flex: 1,
    minHeight: Dimensions.get('window').height,
  },
})