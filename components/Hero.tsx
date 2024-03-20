"use client";
import { heroVideo, smallHeroVideo } from "@/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import Link from "next/link";
type Props = {};

const Hero = (props: Props) => {
  const [videoSrc, setVideoSrc] = useState(heroVideo);

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, [videoSrc]);

  useGSAP(() => {
    gsap.fromTo(
      "#cta",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
      },
    );
  }, []);

  useGSAP(() => {
    gsap.to(".hero-title", {
      delay: 2,
      opacity: 1,
    });
    gsap.to("#cta", {
      y: -50,
      delay: 2,
      opacity: 1,
    });
  }, []);

  return (
    <section className="nav-height relative w-full bg-black">
      <div className="flex-center h-5/6 w-full flex-col">
        <p className="hero-title">Iphone 15 pro</p>
        <div className=" w-9/12 md:w-10/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
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
