"use client";
import { heroVideo, smallHeroVideo } from "@/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import Link from "next/link";
type Props = {};

const Hero = (props: Props) => {
  useGSAP(() => {
    gsap.to(".hero-title", {
      duration: 1,
      delay: 2,
      opacity: 1,
    });
    gsap.to("#cta", {
      y: -50,
      duration: 1,
      delay: 2,
      opacity: 1,
    });
  }, []);

  return (
    <section className="nav-height relative w-full bg-black">
      <div className="flex-center h-5/6 w-full flex-col">
        <p className="hero-title">Iphone 15 pro</p>
        <div className="w-9/12 md:w-10/12">
          <video
            autoPlay
            muted
            playsInline
            className=" pointer-events-none block md:hidden"
          >
            <source src={smallHeroVideo} type="video/mp4" />
          </video>
          <video
            autoPlay
            muted
            playsInline
            className=" pointer-events-none hidden md:flex"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex translate-y-20 flex-col  items-center opacity-0 "
      >
        <Link href={"#highlights"} className="btn">
          buy
        </Link>
        <p className="ml-1 text-xl font-normal"> From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
