import { createContext, useReducer, useMemo, useEffect } from 'react';

export const CartContext = createContext(null);

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex >= 0) {
        const updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity }],
      };
    }

    case ACTIONS.REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };
    }

    case ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case ACTIONS.CLEAR_CART: {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

const STORAGE_KEY = 'luxe-cart';

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Validate: must be an array of objects with product and quantity
    if (
      !Array.isArray(parsed) ||
      !parsed.every(
        (item) =>
          item &&
          typeof item === 'object' &&
          item.product &&
          typeof item.product.id === 'string' &&
          typeof item.quantity === 'number' &&
          item.quantity > 0
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return parsed;
  } catch {
    // Corrupted JSON — clear it and start fresh
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

const initialState = {
  items: loadCartFromStorage(),
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart items to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }, [state.items]);

  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: { product, quantity },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: { productId },
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: ACTIONS.UPDATE_QUANTITY,
      payload: { productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const cartCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items]
  );

  const cartTotal = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [state.items]
  );

  const isInCart = (productId) => {
    return state.items.some((item) => item.product.id === productId);
  };

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isInCart,
    }),
    [state.items, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
