"use client";

import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const spanRef = useRef<HTMLSpanElement[]>([]);
  const divRef = useRef<HTMLDivElement[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    isPlaying: false,
    videoId: 0,
    isLastVideo: false,
    startPlay: false,
  });

  const [loadedData, setLoadedData] = useState<
    SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);

  const { isEnd, isLastVideo, isPlaying, startPlay, videoId } = video;

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = spanRef.current;
    if (span) {
      if (span[videoId]) {
        let anim = gsap.to(span[videoId], {
          onUpdate: () => {
            const progress = Math.ceil(anim.progress() * 100);
            if (progress != currentProgress) {
              currentProgress = progress;
              gsap.to(divRef.current[videoId], {
                width:
                  window.innerWidth < 760
                    ? "10vw"
                    : window.innerWidth < 1024
                      ? "10vw"
                      : "4vw",
              });
              gsap.to(span[videoId], {});
            }
          },
          onComplete: () => {},
        });
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type: string, i: number) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };
  const handleLoadedProcess = (
    e: SyntheticEvent<HTMLVideoElement, Event>,
    i: number,
  ) => {
    setLoadedData((prev) => [...prev, e]);
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((item, i) => (
          <div key={item.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center pointer-events-none h-full w-full overflow-hidden rounded-3xl bg-black">
                <video
                  muted
                  playsInline
                  preload="auto"
                  id={`video`}
                  ref={(el) => {
                    if (el) {
                      videoRef.current[i] = el;
                    }
                  }}
                  onLoadedMetadata={(e) => {
                    handleLoadedProcess(e, i);
                  }}
                  onPlay={() => {
                    setVideo((prev) => ({
                      ...prev,
                      isPlaying: true,
                    }));
                  }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>
              <div className="left[-5%] absolute top-12 z-10">
                {item.textLists.map((text) => (
                  <p className="text-xl font-medium md:text-2xl" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <div
              key={i}
              className="relative mx-2 h-3 w-3 cursor-pointer rounded-full bg-gray-200"
              ref={(el) => {
                if (el) {
                  divRef.current[i] = el;
                }
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => {
                  if (el) {
                    spanRef.current[i] = el;
                  }
                }}
              />
            </div>
          ))}
        </div>
        <button className="control-btn relative">
          <Image
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            fill
            onClick={() =>
              handleProcess(
                isLastVideo ? "video-reset" : !isPlaying ? "play" : "pause",
                videoId,
              )
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
