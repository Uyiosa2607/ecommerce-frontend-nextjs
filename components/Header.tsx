"use client";
import { useState, useEffect } from "react";
import { CircleUser, Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 lg:py-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Jolts
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/categories"
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold relative group"
              >
                Categories
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/collections"
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold relative group"
              >
                Collections
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group relative">
                <Search className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
              </button>
              <Link
                href="/cart"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group relative"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </Link>
              <Link
                href="/login"
                className="ml-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 font-semibold flex items-center gap-2"
              >
                <CircleUser className="w-4 h-4" />
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpenNav(!openNav)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          openNav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenNav(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 lg:hidden transition-transform duration-300 shadow-2xl ${
          openNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Jolts
              </span>
            </div>
            <button
              onClick={() => setOpenNav(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-1 mb-8">
              <Link
                href="/categories"
                onClick={() => setOpenNav(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-colors font-semibold"
              >
                Categories
              </Link>
              <Link
                href="/collections"
                onClick={() => setOpenNav(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-colors font-semibold"
              >
                Collections
              </Link>
            </div>

            <div className="h-px bg-gray-200 my-6" />

            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-colors font-semibold">
                <Search className="w-5 h-5" />
                Search
              </button>
              <Link
                href="/cart"
                onClick={() => setOpenNav(false)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-colors font-semibold"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  Cart
                </div>
                <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full font-semibold">
                  3
                </span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-200">
            <Link
              href="/login"
              onClick={() => setOpenNav(false)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all font-semibold"
            >
              <CircleUser className="w-5 h-5" />
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
