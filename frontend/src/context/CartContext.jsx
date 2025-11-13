import React, { createContext, useContext, useReducer } from "react";
import { ITEMS } from "../utils/constants";

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          quantity: state[action.payload.id]
            ? state[action.payload.id].quantity + 1
            : 1,
        },
      };
    case REMOVE_FROM_CART:
      const updatedCart = { ...state };
      if (updatedCart[action.payload.id]) {
        if (updatedCart[action.payload.id].quantity > 1) {
          updatedCart[action.payload.id].quantity -= 1;
        } else {
          delete updatedCart[action.payload.id];
        }
      }
      return updatedCart;
    case CLEAR_CART:
      return {};
    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {});

  const addToCart = (item) => dispatch({ type: ADD_TO_CART, payload: item });
  const removeFromCart = (item) =>
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  const clearCart = () => dispatch({ type: CLEAR_CART });

  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
