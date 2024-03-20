"use client";

import { navLists } from "@/constants";
import { appleImg, bagImg, searchImg } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isHover, setIsHover] = useState(false);
  const [isExit, setIsExit] = useState(false);

  useGSAP(() => {
    isHover &&
      gsap.to("#nav-list", {
        opacity: 1,
        height: "40vh",
        duration: 1,
        ease: "elastic.inOut",
        onComplete: () => {
          gsap.to("#nav-list", {
            backgroundColor: "red",
          });
        },
      });
  }, [isHover]);

  return (
    <>
      <nav className="screen-max-width flex w-full gap-2">
        <div className="relative h-[18px] w-[14px]">
          <Image src={appleImg} fill className="object-cover" alt="logo" />
        </div>
        <div className=" flex-1 flex-col">
          <div className="z-[200]  flex justify-center max-sm:hidden">
            {navLists.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="group cursor-pointer px-5 text-sm text-gray transition-all duration-[200ms] hover:text-white "
              >
                {item}
              </div>
            ))}
          </div>
          {isHover && (
            <div
              id="nav-list"
              className="absolute left-0 top-5 z-[10]  w-full   bg-red-300 opacity-0 "
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              hello
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
          <div className=" relative size-[1.125rem]">
            <Image
              src={searchImg}
              fill
              alt="search Img"
              className="object-fill"
            />
          </div>
          <div className=" relative size-[1.125rem]">
            <Image src={bagImg} fill alt="Bag Img" className="object-fill" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
