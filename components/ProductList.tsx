"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import EditProductForm from "./EditProductForm";
import { api } from "@/lib/utils";
import { Eye, Pencil, Trash2, Package } from "lucide-react";

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string[];
  features: string[];
  specs: string[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(
          "https://shopping-backend-server.onrender.com/api/products"
        );
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log("something went wrong unable to fetch product:", error);
      }
    }
    getProducts();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await api.delete(`/api/products/remove?product=${id}`);
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = () => {
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <EditProductForm
              product={editingProduct}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Products Yet
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Start adding products to your inventory to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src={product.img[0]}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="icon"
                    asChild
                    className="bg-white/95 hover:bg-white text-gray-900 rounded-full w-12 h-12 shadow-lg hover:scale-110 transition-all duration-300"
                  >
                    <Link href={`/products/${product.id}`}>
                      <Eye className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleEdit(product)}
                    className="bg-white/95 hover:bg-white text-gray-900 rounded-full w-12 h-12 shadow-lg hover:scale-110 transition-all duration-300"
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="bg-red-500/95 hover:bg-red-600 text-white rounded-full w-12 h-12 shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Features Count Badge */}
                {product.features && product.features.length > 0 && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full shadow-md">
                      {product.features.length} Features
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                  {product.desc}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons - Mobile */}
                <div className="flex gap-2 lg:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 rounded-full"
                  >
                    <Link href={`/products/${product.id}`}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="rounded-full"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Specs Indicator */}
              {product.specs && product.specs.length > 0 && (
                <div className="px-5 pb-5 pt-0">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span>{product.specs.length} Specifications</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
