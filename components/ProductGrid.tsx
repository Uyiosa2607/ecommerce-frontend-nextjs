"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import ProductCard from "./product-card";

interface Product {
  id: string;
  image: string;
  title: string;
  desc: string;
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
            <ProductCard key={product.id} product={product} />
          ))}
        </>
      )}
    </div>
  );
}
