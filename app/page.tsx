/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import SlidableBanner from "@/components/SlidableBanner";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <SlidableBanner />

      <main className="container mx-auto px-4 py-12 lg:py-16">
        {/* New Arrivals Section */}
        <section className="w-full mb-16 lg:mb-24">
          <div className="text-center mb-10 lg:mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4 tracking-tight">
              New Arrivals
            </h2>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              Our new arrivals are built to withstand your activities while
              keeping you looking your best!
            </p>
          </div>

          <ProductGrid />

          <div className="w-full flex mt-10 lg:mt-12 items-center justify-center">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View More
            </Button>
          </div>
        </section>

        {/* Featured Sale Section */}
        <section className="mb-16 lg:mb-24">
          <div className="flex gap-6 lg:gap-8 flex-col lg:flex-row bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl overflow-hidden p-6 lg:p-10 shadow-xl">
            <div className="flex-[2] relative group">
              <img
                src="/sales.jpg"
                className="h-[320px] lg:h-[400px] rounded-2xl w-full object-cover shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                alt="sales promotion"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            <div className="flex-[1] pt-2 lg:pt-6 flex flex-col justify-center">
              <h3 className="font-bold mb-4 lg:mb-6 text-gray-900 text-3xl lg:text-4xl leading-tight">
                Find Your Perfect Look at Jolts Stylish Store
              </h3>
              <p className="font-normal text-gray-700 leading-relaxed mb-6 lg:mb-8 text-base lg:text-lg">
                Welcome to the newest Jolts outlet in Shibuya, Japan! Step into
                our stylish and trendy store and discover the latest in fashion
                and apparel. Come and experience the unique and vibrant
                atmosphere.
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg">
                <h2 className="font-semibold mb-3 text-gray-800 text-xl lg:text-2xl">
                  Come and Enjoy Sale!
                </h2>
                <div className="flex items-end gap-3">
                  <p className="text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    50%
                  </p>
                  <span className="text-3xl lg:text-4xl font-semibold text-gray-700 mb-3 lg:mb-4">
                    OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection Section */}
        <section className="mb-16 lg:mb-24">
          <div className="text-center mb-10 lg:mb-12 max-w-3xl mx-auto">
            <h3 className="font-bold text-3xl lg:text-5xl text-gray-900 mb-3 lg:mb-4 tracking-tight">
              Featured Collections
            </h3>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              Dare to mix and match! Check out our collection to level up your
              fashion game
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
            {/* Column 1 */}
            <div className="flex gap-3 lg:gap-5 flex-col">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="absolute flex items-center justify-center capitalize text-white w-full h-full z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500">
                  <p className="text-xl lg:text-3xl font-bold tracking-wide transform group-hover:scale-110 transition-transform duration-500">
                    Footwear
                  </p>
                </div>
                <img
                  src="/footware.jpg"
                  className="w-full rounded-2xl object-cover h-[180px] lg:h-[280px] group-hover:scale-110 transition-transform duration-500"
                  alt="footwear collection"
                />
              </div>

              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="absolute flex items-center justify-center capitalize text-white w-full h-full z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500">
                  <p className="text-xl lg:text-3xl font-bold tracking-wide transform group-hover:scale-110 transition-transform duration-500">
                    Headwear
                  </p>
                </div>
                <img
                  src="/cap.jpg"
                  className="w-full rounded-2xl object-cover h-[240px] lg:h-[400px] group-hover:scale-110 transition-transform duration-500"
                  alt="headwear collection"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex gap-3 lg:gap-5 flex-col">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="absolute flex items-center justify-center capitalize text-white w-full h-full z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500">
                  <p className="text-xl lg:text-3xl font-bold tracking-wide transform group-hover:scale-110 transition-transform duration-500">
                    Jackets
                  </p>
                </div>
                <img
                  src="/jacket.jpg"
                  className="w-full rounded-2xl object-cover h-[240px] lg:h-[400px] group-hover:scale-110 transition-transform duration-500"
                  alt="jacket collection"
                />
              </div>

              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="absolute flex items-center justify-center capitalize text-white w-full h-full z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500">
                  <p className="text-xl lg:text-3xl font-bold tracking-wide transform group-hover:scale-110 transition-transform duration-500">
                    Bags
                  </p>
                </div>
                <img
                  src="/bag.jpg"
                  className="w-full rounded-2xl object-cover h-[180px] lg:h-[280px] group-hover:scale-110 transition-transform duration-500"
                  alt="bags collection"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3 lg:gap-5 col-span-2 lg:col-span-1">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="absolute flex items-center justify-center capitalize text-white w-full h-full z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500">
                  <p className="text-xl lg:text-3xl font-bold tracking-wide transform group-hover:scale-110 transition-transform duration-500">
                    Accessories
                  </p>
                </div>
                <img
                  src="/watch.jpg"
                  className="w-full rounded-2xl object-cover h-[180px] lg:h-[280px] group-hover:scale-110 transition-transform duration-500"
                  alt="accessories collection"
                />
              </div>

              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="absolute flex items-center justify-center capitalize text-white w-full h-full z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500">
                  <p className="text-xl lg:text-3xl font-bold tracking-wide transform group-hover:scale-110 transition-transform duration-500">
                    Bottoms
                  </p>
                </div>
                <img
                  src="/pant.jpg"
                  className="w-full rounded-2xl object-cover h-[240px] lg:h-[400px] group-hover:scale-110 transition-transform duration-500"
                  alt="bottoms collection"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Newsletter Section */}
      <section className="relative mt-8 lg:mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-orange-900/90 z-10"></div>
        <div className="absolute top-[50%] -translate-y-1/2 text-white w-full left-0 z-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-bold mb-4 text-3xl lg:text-5xl leading-tight">
              Sign Up to Our Newsletter
            </h3>
            <p className="text-base lg:text-lg mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto">
              Get the latest trends and exclusive offers. Sign up for our
              newsletter and stay informed about all things fashion and beauty.
            </p>
            <div className="flex w-full justify-center gap-3 lg:gap-4 items-center flex-col sm:flex-row max-w-2xl mx-auto">
              <input
                placeholder="Enter your email address"
                className="w-full sm:flex-1 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white placeholder-white/80 text-base py-4 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all"
                type="email"
              />
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white hover:bg-gray-100 text-purple-900 font-semibold rounded-full px-8 py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <img
          src="/group-photo.jpg"
          className="h-[450px] lg:h-[500px] w-full object-cover"
          alt="newsletter signup"
        />
      </section>

      <Footer />
    </div>
  );
}
