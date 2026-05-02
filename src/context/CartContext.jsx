import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'shopsphere.cart.v1';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { items: [] };
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + (action.quantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: action.quantity || 1 }],
      };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.id ? { ...item, quantity: action.quantity } : item
          )
          .filter((item) => item.quantity > 0),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 0 && subtotal < 50 ? 4.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return {
      items: state.items,
      totalItems,
      subtotal,
      shipping,
      tax,
      total,
      addToCart: (product, quantity = 1) =>
        dispatch({ type: 'ADD', product, quantity }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: 'UPDATE_QTY', id, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
