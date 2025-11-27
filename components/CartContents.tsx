"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartContents() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 lg:py-24">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Start shopping
          to fill it up!
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 lg:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            Cart Items ({cart.length})
          </h2>

          <div className="space-y-4">
            {cart.map(function (item) {
              return (
                <div
                  key={item.id}
                  className="group relative bg-gray-50 rounded-2xl p-4 lg:p-5 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-4 lg:gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-white">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <Link
                          href={`/products/${item.id}`}
                          className="block group-hover:text-purple-600 transition-colors"
                        >
                          <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                          {item.desc || "Premium quality product"}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl lg:text-2xl font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500">each</span>
                        </div>
                      </div>

                      {/* Quantity Controls & Delete */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 bg-white rounded-xl border-2 border-gray-200 p-1">
                          <Button
                            onClick={function () {
                              updateQuantity(item.id, item.quantity - 1);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={function () {
                              addToCart(item);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-600">
                            Subtotal:{" "}
                            <span className="text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </span>
                          <Button
                            onClick={function () {
                              removeFromCart(item.id);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue Shopping Button (Mobile) */}
        <div className="lg:hidden">
          <Button
            asChild
            variant="outline"
            className="w-full h-12 rounded-xl font-semibold"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Order Summary
          </h2>

          {/* Promo Code */}
          <div className="mb-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-900">
                Have a promo code?
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 px-3 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cart.length} items)</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold">
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            {shipping > 0 && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                💡 Add ${(100 - subtotal).toFixed(2)} more for free shipping!
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 text-xl font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Checkout Button */}
          <Button
            asChild
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-4"
          >
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          {/* Continue Shopping (Desktop) */}
          <Button
            asChild
            variant="outline"
            className="w-full h-12 rounded-full font-semibold hidden lg:flex"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>

          {/* Security Badge */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
