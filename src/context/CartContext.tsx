"use client";

import { Product } from "@/lib/types";
import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  ReactNode,
} from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; amount: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

// ৩. Context টাইপ
interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, amount: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const loadCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart_items");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  items: loadCart(),
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existingIndex = state.items.findIndex(
        (i) => i.product._id === product._id,
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += quantity || 1;
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: quantity || 1 }],
      };
    }
    case "UPDATE_QUANTITY": {
      const { productId, amount } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item,
        ),
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((i) => i.product._id !== action.payload),
      };
    }
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };

  const updateQuantity = (productId: string, amount: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, amount } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
