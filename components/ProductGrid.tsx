"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { ShoppingCart, Heart, Eye } from "lucide-react";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  rating?: {
    rate: number;
    count: number;
  };
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const elements = Array.from({ length: 8 });

  async function getProducts() {
    axios.get(
      "https://shopping-backend-server-1.onrender.com/api/v1/auth/auth-status",
      { withCredentials: true }
    );
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      if (response.status === 200) {
        console.log(response.data);
        setLoading(false);
        return response.data.slice(0, 8);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="grid grid-cols-2 w-full sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {loading ? (
        <>
          {elements.map((item, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-[200px] lg:h-[280px] w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-5 w-1/2 rounded-lg" />
              <Skeleton className="h-8 w-1/3 rounded-lg" />
            </div>
          ))}
        </>
      ) : (
        <>
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={400}
                    quality={100}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>

                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 px-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(product.id);
                      }}
                      className="p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          likedProducts.has(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700"
                        }`}
                      />
                    </button>
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg font-semibold text-gray-900 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Quick View
                    </Link>
                    <button
                      className="p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full shadow-md">
                    {product.category}
                  </span>
                </div>

                {/* Like Button (Mobile) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 shadow-md"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      likedProducts.has(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    }`}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link
                  href={`/products/${product.id}`}
                  className="block hover:text-purple-600 transition-colors"
                >
                  <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug min-h-[2.5rem] lg:min-h-[3rem]">
                    {product.title}
                  </h3>
                </Link>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 lg:w-4 lg:h-4 ${
                            i < Math.floor(product.rating!.rate)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.rating.count})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl lg:text-2xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button (Mobile) */}
              <div className="px-4 pb-4 lg:hidden">
                <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
