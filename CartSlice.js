import { createSlice } from '@reduxjs/toolkit';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://fakestoreapi.com/users');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


const initialState = { items: {}, totalQuantity: 0, totalPrice: 0 };


const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
addToCart(state, action) {
const product = action.payload;
const existing = state.items[product.id];
if (existing) {
existing.quantity += 1;
} else {
state.items[product.id] = { ...product, quantity: 1 };
}
state.totalQuantity += 1;
state.totalPrice += product.price;
},
removeFromCart(state, action) {
const id = action.payload;
const existing = state.items[id];
if (!existing) return;
state.totalQuantity -= existing.quantity;
state.totalPrice -= existing.price * existing.quantity;
delete state.items[id];
},
changeQuantity(state, action) {
const { id, quantity } = action.payload;
const item = state.items[id];
if (!item) return;
state.totalQuantity += quantity - item.quantity;
state.totalPrice += (quantity - item.quantity) * item.price;
item.quantity = quantity;
},
clearCart(state) {
state.items = {};
state.totalQuantity = 0;
state.totalPrice = 0;
},
},
});


export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;