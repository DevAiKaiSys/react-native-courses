import { MotiView } from 'moti'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartItem from '../components/CartItem'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PaymentFooter from '../components/PaymentFooter'
import { COLORS } from '../constants'
import { useAppSelector, useAppDispatch } from '../app/hooks'

const CartScreen = () => {
  const CartList = useAppSelector((state) => state.cart.cartList)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)
  console.log("CartList:", CartList);
  const dispatch = useAppDispatch()

  return (
    <SafeAreaView style={styles.cartContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.itemsContainer}>
          {CartList.length === 0 ? (
            <EmptyListAnimation title='Cart Is Empty' />
          ) : (
            <View style={styles.listItemContainer}>
              {
                CartList.map((item, index) => (
                  <MotiView
                    key={index}
                  >
                    <CartItem
                      brand={item.brand}
                      _id={item._id ?? ""}
                      prices={item.prices}
                      name={item.name}
                      image={item.images[0]}
                    />
                  </MotiView>
                ))
              }
            </View>
          )}
        </View>
        <PaymentFooter
          price={totalPrice}
          onPress={() => dispatch({
            type: "cart/clearCart",
            payload: {}
          })}
          buttonTitle={"Order Now"}
          loading={false}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  itemsContainer: {
    flex: 1
  },
  listItemContainer: {
    gap: 20,
  }
})