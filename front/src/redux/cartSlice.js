import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      const duration = action.payload.duration || 1;
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price = existingItem.price * duration;
        existingItem.total = existingItem.price * existingItem.quantity;
        state.totalPrice += existingItem.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalPrice += action.payload.price * duration;
      }
      state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
        state.items.splice(itemIndex, 1);
      }
    },
    decreaseFromCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.total = existingItem.price * existingItem.quantity;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      }
      state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
    },
    updateDuration: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        state.totalPrice -= existingItem.total;
        existingItem.price =  (existingItem.price / existingItem.duration) * action.payload.duration;
        existingItem.duration = action.payload.duration;
        existingItem.total = existingItem.price * existingItem.quantity;
        state.totalPrice += existingItem.total;
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseFromCart, updateDuration, clearCart } = cartSlice.actions;
export default cartSlice.reducer;