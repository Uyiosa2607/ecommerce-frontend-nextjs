"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bannerItems = [
  {
    id: 1,
    title: "Summer Tech Sale",
    description: "Up to 50% off on selected items",
    image: "/banner.jpg",
    link: "/products",
    gradient: "from-purple-600/80 to-pink-600/80",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest gadgets",
    image: "/banner.jpg",
    link: "/products",
    gradient: "from-blue-600/80 to-cyan-600/80",
  },
  {
    id: 3,
    title: "Limited Time Offer",
    description: "Free shipping on orders over $500",
    image: "/banner.jpg",
    link: "/products",
    gradient: "from-orange-600/80 to-red-600/80",
  },
];

export default function SlidableBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerItems.length) % bannerItems.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {bannerItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${item.gradient}`}
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center text-white max-w-4xl">
              <h2
                className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight transition-all duration-700 ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: index === currentSlide ? "200ms" : "0ms",
                }}
              >
                {item.title}
              </h2>
              <p
                className={`text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 transition-all duration-700 ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: index === currentSlide ? "400ms" : "0ms",
                }}
              >
                {item.description}
              </p>
              <div
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: index === currentSlide ? "600ms" : "0ms",
                }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <a href={item.link}>Shop Now</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-110"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-110"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 md:w-10 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
