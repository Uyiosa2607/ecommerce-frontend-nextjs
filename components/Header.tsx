"use client";
import { useState } from "react";
import { CircleUser, Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <div
      className={`${
        openNav ? "overflow-hidden max-w-[100vh]" : ""
      } z-[400] mb-14 lg:mb-16 text-black`}
    >
      <header>
        <div className="w-full fixed top-0 left-0 mx-auto">
          <div className="bg-stone-100 flex w-full md:flex lg:w-full text-black font-medium px-2 py-2.5 lg:py-4 text-sm capitalize flex-col lg:flex-row lg:justify-between lg:items-center">
            <div className="flex items-center justify-between">
              <Link className="w-fit" href="/">
                <h3 className="text-lg font-semibold">Brand Logo</h3>
              </Link>
              <Menu
                onClick={() => setOpenNav(!openNav)}
                className="lg:hidden"
                size={30}
              />
            </div>

            <div
              className={`${
                openNav ? "block" : "hidden"
              } flex-[12] lg:flex absolute text-center lg:pt-0 gap-6 text-base top-0 left-0 lg:relative bg-white h-[100vh] lg:h-0 lg:ml-10 flex flex-col lg:flex-row w-full lg:justify-between lg:items-center`}
            >
              <X
                onClick={() => setOpenNav(false)}
                size={40}
                className={`${
                  openNav ? "flex" : "hidden"
                } mt-10 place-self-end mb-5 mr-6`}
              />
              <div className="flex lg:flex font-semibold gap-8 flex-col lg:flex-row lg:items-center">
                <p>categories</p>
                <p>collections</p>
                <p>blog</p>
              </div>
              <div className="flex lg:flex flex-col lg:flex-row place-items-center font-semibold gap-8 lg:items-center">
                <div className="flex items-center gap-1 flex-row">
                  <Search size={18} />
                  <p>search</p>
                </div>
                <Link href="/cart">
                  <div className="flex items-center gap-1 lg:flex-row">
                    <ShoppingBag size={18} />
                    <p>cart</p>
                  </div>
                </Link>
                <Link href="/login">
                  <div className="flex flex-row items-center gap-1">
                    <CircleUser size={18} />
                    <p>login</p>
                  </div>
                </Link>
              </div>
              {/* <div
                className={`${
                  openNav ? "hidden" : "flex"
                }  lg:hidden items-center flex-row gap-6`}
              >
                <Search className="lg:hidden w-5 h-5 lg:h-8 lg:w-8" />
                <Link href="/cart">
                  <ShoppingBag className="lg:hidden w-5 h-5 lg:h-8 lg:w-8" />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
