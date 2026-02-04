import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { CartProductType, ItemPrice } from "../../types"

export type CartSliceState = {
    cartList: CartProductType[],
    totalPrice: number,
    totalItems: number,
    status: "idle" | "loading" | "failed"
}

const initialState: CartSliceState = {
    cartList: [],
    totalPrice: 0, // -> calc the total price
    totalItems: 0,
    status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const cartSlice = createAppSlice({
    name: "cart",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: create => ({
        addToCart: create.reducer((state, action: PayloadAction<CartProductType & { selectedSize: 'S' | 'M' | 'L' }>) => {
            //   item that passed 
            const newItem = action.payload;
            // check if the item is in the cart already
            const existingItem = state.cartList.find(item => item._id === newItem._id)

            console.log("Adding to cart:", newItem);
            console.log(existingItem);
            // item in the cart => increment the size quantity
            if (existingItem) {
                // size of that item
                const sizeObj = existingItem.prices.find(product => product.size === newItem.selectedSize)
                // if the size is already existed so we'll increase the quantity of that size if not we'll add it...
                if (sizeObj) {
                    sizeObj.quantity = (sizeObj.quantity || 0) + 1;
                    state.totalItems += 1
                    state.totalPrice += sizeObj.price
                }
            } else {
                // if not -> add the new item to the cart....
                const updatedPrices = newItem.prices.map(product => product.size === newItem.selectedSize ? { ...product, quantity: 1 } : { ...product, quantity: 0 })
                // add that to the cart list
                state.cartList.push({
                    ...newItem, prices: updatedPrices
                })
                state.totalItems += 1
                // price should calc based on the price
                state.totalPrice += getPriceForSize(updatedPrices, newItem.selectedSize)
            }
        }
        ),
        removeFromCart: create.reducer((state, action: PayloadAction<{ _id: string, selectedSize: 'S' | 'M' | 'L' }>) => {
            const payloadItem = action.payload
            // which item it is -> which size -> remove it!!!
            const removedItem = state.cartList.find(item => item._id === payloadItem._id)
            if (!removedItem) return;
            // get the size
            const sizeObj = removedItem.prices.find(product => product.size === payloadItem.selectedSize)
            // if the size is already existed so we'll increase the quantity of that size if not we'll add it...
            if (sizeObj) {
                const quantityToRemove = sizeObj.quantity || 0
                sizeObj.quantity = 0;
                state.totalItems -= quantityToRemove
                state.totalPrice -= sizeObj.price * quantityToRemove;
            }
            // if all zeros -> quantities
            const allZero = removedItem.prices.every(product => product.quantity === 0)
            if (allZero) {
                state.cartList = state.cartList.filter(item => item._id !== removedItem._id)
            }
        }),
        incrementQuantity: create.reducer((state, action: PayloadAction<{ _id: string, selectedSize: 'S' | 'M' | 'L' }>) => {
            const payloadItem = action.payload
            const foundItem = state.cartList.find(item => item._id === payloadItem._id)
            const sizeObj = foundItem?.prices.find(product => product.size === payloadItem.selectedSize)


            if (foundItem && sizeObj) {
                sizeObj.quantity += 1;
                state.totalItems += 1
                state.totalPrice += sizeObj.price;
            }
        }),
        decrementQuantity: create.reducer((state, action: PayloadAction<{ _id: string, selectedSize: 'S' | 'M' | 'L' }>) => {
            const payloadItem = action.payload
            const foundItem = state.cartList.find(item => item._id === payloadItem._id)
            const sizeObj = foundItem?.prices.find(product => product.size === payloadItem.selectedSize)


            if (foundItem && sizeObj && sizeObj.quantity > 0) {
                sizeObj.quantity -= 1;
                state.totalItems -= 1
                state.totalPrice -= sizeObj.price;
            }
            // if all quantities are 0 -> remove the product completely
            const totalQuantities = foundItem?.prices.reduce((sum, p) => sum + p.quantity, 0)
            if (totalQuantities === 0) {
                // remove the complete product form the cartList
                state.cartList = state.cartList.filter(itm => itm._id !== foundItem?._id)
            }
        }),
        clearCart: create.reducer((state) => {
            state.cartList = [];
            state.totalItems = 0
            state.totalPrice = 0
        })
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectCount: counter => counter.cartList.length,
        selectStatus: counter => counter.status,
    },
})

// helper func => calc the price
function getPriceForSize(prices: ItemPrice[], size: 'S' | 'M' | 'L'): number {
    return prices.find(p => p.size === size)?.price || 0
}

// Action creators are generated for each case reducer function.
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } =
    cartSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCount, selectStatus } = cartSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentValue = selectCount(getState())

//             if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//                 dispatch(incrementByAmount(amount))
//             }
//         }
