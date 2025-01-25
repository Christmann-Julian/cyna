import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Charger le panier depuis localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn('Erreur de chargement du localStorage', e);
    return undefined;
  }
};

// Sauvegarder le panier dans localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.warn('Erreur de sauvegarde dans le localStorage', e);
  }
};

// Charger l'état initial
const preloadedState = {
  cart: loadFromLocalStorage() || {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Écouter les changements pour sauvegarder dans localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;