import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn('Erreur de chargement du localStorage', e);
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.warn('Erreur de sauvegarde dans le localStorage', e);
  }
};

const initialState = loadFromLocalStorage() || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  promotionalCodeItems: [],
  subscriptions: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
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
      saveToLocalStorage(state);
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

      recalculateTotalWithPromotions(state);

      saveToLocalStorage(state);
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

      recalculateTotalWithPromotions(state);

      state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
      saveToLocalStorage(state);
    },
    updateDuration: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        state.totalPrice -= existingItem.total;
        existingItem.price = (existingItem.price / existingItem.duration) * action.payload.duration;
        existingItem.duration = action.payload.duration;
        existingItem.total = existingItem.price * existingItem.quantity;
        state.totalPrice += existingItem.total;
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
      }
    },
    applyPromotionalCode: (state, action) => {
      const { id, name, promotion, isPercent } = action.payload;

      const existingCode = state.promotionalCodeItems.find((code) => code.id === id);
      if (!existingCode) {
        state.promotionalCodeItems.push({ id, name, promotion, isPercent });

        if (isPercent) {
          state.totalPrice -= (state.totalPrice * promotion) / 100;
        } else {
          state.totalPrice -= promotion;
        }
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
      }
      saveToLocalStorage(state);
    },
    removePromotionalCode: (state, action) => {
      const { id } = action.payload;

      const codeIndex = state.promotionalCodeItems.findIndex((code) => code.id === id);
      if (codeIndex !== -1) {
        const code = state.promotionalCodeItems[codeIndex];

        if (code.isPercent) {
          state.totalPrice /= 1 - code.promotion / 100;
        } else {
          state.totalPrice += code.promotion;
        }
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2));

        state.promotionalCodeItems.splice(codeIndex, 1);
      }
      saveToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.promotionalCodeItems = [];
      state.subscriptions = [];
      saveToLocalStorage(state);
    },
    addSubscription: (state, action) => {
      state.subscriptions = [action.payload];
      saveToLocalStorage(state);
    },
    clearSubscriptions: (state) => {
      state.subscriptions = [];
      saveToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseFromCart,
  updateDuration,
  applyPromotionalCode,
  removePromotionalCode,
  clearCart,
  addSubscription,
  clearSubscriptions,
} = cartSlice.actions;
export default cartSlice.reducer;

const recalculateTotalWithPromotions = (state) => {
  let total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validPromotions = [];
  const removedPromotions = [];

  state.promotionalCodeItems.forEach((code) => {
    const discount = code.isPercent ? (total * code.promotion) / 100 : code.promotion;

    if (total - discount >= 0) {
      total -= discount;
      validPromotions.push(code);
    } else {
      removedPromotions.push(code);
    }
  });

  state.totalPrice = parseFloat(total.toFixed(2));
  state.promotionalCodeItems = validPromotions;
};
