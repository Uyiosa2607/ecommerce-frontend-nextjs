"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Share2,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const images = ["/jordan.jpg", "/jordan.jpg", "/jordan.jpg", "/jordan.jpg"];

  const colors = [
    { name: "Black", value: "bg-black" },
    { name: "Forest Green", value: "bg-green-900" },
    { name: "Navy Blue", value: "bg-blue-800" },
  ];

  const sizes = ["M", "L", "XL"];

  const relatedProducts = [
    {
      id: 1,
      name: "T Shirt",
      desc: "Round collar T Shirt",
      price: 60,
      image: "/jacket.jpg",
    },
    {
      id: 2,
      name: "T Shirt",
      desc: "Round collar T Shirt",
      price: 60,
      image: "/jacket.jpg",
    },
    {
      id: 3,
      name: "T Shirt",
      desc: "Round collar T Shirt",
      price: 60,
      image: "/jacket.jpg",
    },
    {
      id: 4,
      name: "T Shirt",
      desc: "Round collar T Shirt",
      price: 60,
      image: "/jacket.jpg",
    },
  ];

  return (
    <div className="text-gray-800 bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12 min-h-screen">
        {/* Product Section */}
        <div className="max-w-7xl mx-auto mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
                <Image
                  alt="Product image"
                  width={1500}
                  height={1500}
                  quality={100}
                  src={images[selectedImage]}
                  className="w-full h-full object-cover"
                />
                {/* Wishlist & Share Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                      }`}
                    />
                  </button>
                  <button className="p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-4 ring-purple-600 scale-95"
                        : "ring-2 ring-gray-200 hover:ring-gray-400"
                    }`}
                  >
                    <Image
                      alt={`Product thumbnail ${index + 1}`}
                      width={160}
                      height={160}
                      quality={100}
                      src={img}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    In Stock
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Boa Fleece Jacket
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">4.8 (127 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-gray-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                    $122.00
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    $180.00
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                    32% OFF
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience ultimate comfort with our premium Boa Fleece
                  Jacket. Crafted with high-quality materials, this jacket
                  offers exceptional warmth and style. Perfect for outdoor
                  adventures or casual everyday wear, featuring a modern fit and
                  durable construction that will last for years.
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Available Colors
                </h3>
                <div className="flex items-center gap-3">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`relative w-12 h-12 rounded-xl ${
                        color.value
                      } transition-all ${
                        selectedColor === index
                          ? "ring-4 ring-purple-600 ring-offset-2 scale-110"
                          : "ring-2 ring-gray-300 hover:scale-105"
                      }`}
                      title={color.name}
                    >
                      {selectedColor === index && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Select Size
                </h3>
                <div className="flex gap-3">
                  {sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`w-16 h-16 rounded-xl font-semibold transition-all ${
                        selectedSize === index
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                          : "bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-gray-600">Only 12 items left</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-4 px-6 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all hover:scale-105 shadow-lg">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 shadow-lg">
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-xs font-semibold text-gray-900">
                    Free Shipping
                  </span>
                  <span className="text-xs text-gray-600">
                    Orders over $100
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-xs font-semibold text-gray-900">
                    Secure Payment
                  </span>
                  <span className="text-xs text-gray-600">100% Protected</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <RefreshCw className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-xs font-semibold text-gray-900">
                    Easy Returns
                  </span>
                  <span className="text-xs text-gray-600">30 Days Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-10 lg:mb-12 text-center lg:text-left">
            You May Also Like
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={product.image}
                    alt={product.name}
                  />
                  <button className="absolute top-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <div className="p-5 lg:p-6">
                  <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors duration-300">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {product.desc}
                  </p>
                  <p className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
