/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface CartItem {
  desc: string;
  id: string;
  title: string;
  rating?: {
    count: number;
    rate: number;
  };
  price: number;
  quantity: number;
  image: string;
}

interface LikedProducts {
  title: string;
  quantity: number;
  id: string;
  image: string;
  desc: string;
  rating?: {
    count: number;
    rate: number;
  };
  category?: string;
  price: number;
}

interface CartState {
  cart: CartItem[];
  likedProduct: LikedProducts[];
  addToCart(item: CartItem): void;
  removeFromCart(id: string): void;
  updateQuantity(id: string, quantity: number): void;
  addToFavourites: (item: LikedProducts) => void;
  toggleFavourite: (item: LikedProducts) => void;
  clearCart(): void;
  removeFromFavourites: (id: string | number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    function (set, get) {
      return {
        cart: [],
        likedProduct: [],

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
              toast.success("Product added to Cart");
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

        addToFavourites: (item: LikedProducts) => {
          set((state) => {
            const alreadyExists = state.likedProduct.some(
              (i) => i.id === item.id
            );

            if (alreadyExists) {
              toast.info("Already in your favourites ❤️");
              return state;
            }

            toast.success("Added to favourites ❤️");
            return {
              likedProduct: [...state.likedProduct, item],
            };
          });
        },

        removeFromFavourites: (id) => {
          set((state) => ({
            likedProduct: state.likedProduct.filter((item) => item.id !== id),
          }));
        },

        toggleFavourite: (item) => {
          const { likedProduct, addToFavourites, removeFromFavourites } = get();
          const exists = likedProduct.some((i) => i.id === item.id);
          if (exists) removeFromFavourites(item.id);
          else addToFavourites(item);
        },

        clearCart: () => {
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
