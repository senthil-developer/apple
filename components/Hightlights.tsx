"use client";

import { rightImg, watchImg } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import VideoCarousel from "./Videocarousel";

type Props = {};

const Hightlights = (props: Props) => {
  useGSAP(() => {
    gsap.to("#title", {
      duration: 1,
      delay: 2,
      opacity: 1,
      y: 0,
    });
    gsap.to(".link", {
      duration: 1,
      delay: 2,
      opacity: 1,
      y: 0,
      stagger: 0.25,
    });
  }, []);
  return (
    <section
      id="highlights"
      className="common-padding h-full w-screen overflow-hidden bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1 id="title" className="section-heading">
            get the highlights.
          </h1>
          <div className=" flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <span className="relative h-[18px] w-[14px]">
                <Image
                  src={watchImg}
                  alt="watch"
                  fill
                  className="object-fill"
                />
              </span>
            </p>
            <p className="link">
              Watch the event
              <span className="relative h-[18px] w-[14px]">
                <Image
                  src={rightImg}
                  alt="watch"
                  fill
                  className="object-fill"
                />
              </span>
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Hightlights;
