/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  desc: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

interface CartState {
  cart: CartItem[];
  addToCart(item: CartItem): void;
  removeFromCart(id: string): void;
  updateQuantity(id: string, quantity: number): void;
  clearCart(): void;
}

export const useCartStore = create<CartState>()(
  persist(
    function (set, get) {
      return {
        cart: [],

        addToCart: function (item) {
          set(function (state) {
            const existingItem = state.cart.find(function (i) {
              return i.id === item.id;
            });

            if (existingItem) {
              return {
                cart: state.cart.map(function (i) {
                  return i.id === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i;
                }),
              };
            } else {
              return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }
          });
        },

        removeFromCart: function (id) {
          set(function (state) {
            return {
              cart: state.cart.filter(function (item) {
                return item.id !== id;
              }),
            };
          });
        },

        updateQuantity: function (id, quantity) {
          set(function (state) {
            return {
              cart: state.cart.map(function (item) {
                return item.id === id
                  ? { ...item, quantity: Math.max(1, quantity) }
                  : item;
              }),
            };
          });
        },

        clearCart: function () {
          set({ cart: [] });
        },
      };
    },
    {
      name: "cart-storage",
      storage: createJSONStorage(function () {
        return localStorage;
      }),
    }
  )
);
