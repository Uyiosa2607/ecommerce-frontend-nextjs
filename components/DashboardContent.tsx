/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProductList from "./ProductList";
import {
  Loader2,
  Package,
  ShoppingCart,
  DollarSign,
  Plus,
  X,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/utils";

export default function DashboardContent() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [spec, setSpec] = useState<string>("");
  const [feature, setFeature] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  async function verifyAdminStatus() {
    setLoading(true);
    try {
      const getUser = await api.get("/api/auth/get-auth");
      const isAdmin = getUser.data?.user?.isAdmin;
      if (isAdmin !== true) {
        console.log("user is not admin, cant access route");
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const desc = formData.get("desc") as string;
    const price = Number(formData.get("price"));
    const img = image.split(",").map((tag) => tag.trim());
    const specs = spec.split(",").map((tag) => tag.trim());
    const features = feature.split(",").map((tag) => tag.trim());

    const data = {
      name,
      desc,
      price,
      img,
      specs,
      features,
    };

    try {
      setCreateLoading(true);
      const response = await api.post("/api/products/add-product", data);
      if (response.status === 201) {
        console.log(response);
        toast({
          description: "New product added successfully!",
        });
        setShowAddProduct(false);
        // Reset form
        setSpec("");
        setFeature("");
        setImage("");
        return;
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Failed to add product. Please try again.",
      });
    } finally {
      setCreateLoading(false);
    }
  };

  useEffect(() => {
    verifyAdminStatus();
  }, []);

  if (loading)
    return (
      <main className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4 animate-pulse">
          <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        </div>
        <p className="text-gray-600 font-medium">Loading dashboard...</p>
      </main>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your products and view your store analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="px-3 py-1 bg-purple-600/20 text-purple-700 text-xs font-semibold rounded-full">
              Inventory
            </span>
          </div>
          <h3 className="text-sm font-semibold text-purple-900 mb-1">
            Total Products
          </h3>
          <p className="text-4xl font-bold text-purple-900 mb-2">24</p>
          <div className="flex items-center gap-1 text-sm text-purple-700">
            <TrendingUp className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="px-3 py-1 bg-blue-600/20 text-blue-700 text-xs font-semibold rounded-full">
              Sales
            </span>
          </div>
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            Total Orders
          </h3>
          <p className="text-4xl font-bold text-blue-900 mb-2">156</p>
          <div className="flex items-center gap-1 text-sm text-blue-700">
            <TrendingUp className="w-4 h-4" />
            <span>+8% from last month</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="px-3 py-1 bg-green-600/20 text-green-700 text-xs font-semibold rounded-full">
              Revenue
            </span>
          </div>
          <h3 className="text-sm font-semibold text-green-900 mb-1">
            Total Revenue
          </h3>
          <p className="text-4xl font-bold text-green-900 mb-2">$12,345</p>
          <div className="flex items-center gap-1 text-sm text-green-700">
            <TrendingUp className="w-4 h-4" />
            <span>+23% from last month</span>
          </div>
        </div>
      </div>

      {/* Products Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-sm text-gray-600">Manage your product inventory</p>
        </div>
        <Button
          onClick={() => setShowAddProduct(!showAddProduct)}
          size="lg"
          className={`rounded-full px-6 font-semibold transition-all shadow-lg hover:shadow-xl ${
            showAddProduct
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          }`}
        >
          {showAddProduct ? (
            <>
              <X className="w-5 h-5 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              Add New Product
            </>
          )}
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddProduct && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 lg:px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Add New Product
            </h3>
            <p className="text-purple-100 mt-1">
              Fill in the details to add a new product to your store
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 lg:p-8 space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Product Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Premium Wireless Headphones"
                  required
                  className="h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="desc"
                  className="text-sm font-semibold text-gray-700"
                >
                  Description
                </Label>
                <Textarea
                  id="desc"
                  name="desc"
                  placeholder="Describe your product in detail..."
                  required
                  rows={4}
                  className="rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-semibold text-gray-700"
                >
                  Price (USD)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    required
                    className="pl-11 h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Grid for Specs and Features */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Specifications */}
                <div className="space-y-2">
                  <Label
                    htmlFor="specs"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Specifications
                  </Label>
                  <Input
                    id="specs"
                    value={spec}
                    onChange={(event) => setSpec(event.target.value)}
                    type="text"
                    placeholder="e.g., Weight: 250g, Battery: 20hrs"
                    required
                    className="h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500">Separate with commas</p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label
                    htmlFor="features"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Features
                  </Label>
                  <Input
                    id="features"
                    value={feature}
                    onChange={(event) => setFeature(event.target.value)}
                    type="text"
                    placeholder="e.g., Noise Cancelling, Wireless"
                    required
                    className="h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500">Separate with commas</p>
                </div>
              </div>

              {/* Image URLs */}
              <div className="space-y-2">
                <Label
                  htmlFor="image"
                  className="text-sm font-semibold text-gray-700"
                >
                  Image URLs
                </Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="image"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    name="image"
                    type="text"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    required
                    className="pl-11 h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter multiple image URLs separated by commas
                </p>
              </div>
            </div>

            {/* Form Footer */}
            <div className="bg-gray-50 px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-end border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddProduct(false)}
                className="rounded-full px-6 font-semibold"
              >
                Cancel
              </Button>
              <Button
                disabled={createLoading}
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full px-6 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {createLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      <ProductList />
    </div>
  );
}
