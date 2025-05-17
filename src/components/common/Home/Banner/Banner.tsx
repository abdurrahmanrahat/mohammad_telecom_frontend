"use client";

import type React from "react";

import Container from "@/components/shared/Ui/Container";
import { IMAGES } from "@/image-data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    src: IMAGES.home.Banner1,
    alt: "Banner 1",
  },
  {
    id: 2,
    src: IMAGES.home.Banner2,
    alt: "Banner 2",
  },
  {
    id: 3,
    src: IMAGES.home.Banner3,
    alt: "Banner 3",
  },
  {
    id: 4,
    src: IMAGES.home.Banner4,
    alt: "Banner 4",
  },
];

export function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalSlides = banners.length;

  const nextSlide = useCallback(() => {
    setPrevSlide(currentSlide);
    setDirection("next");
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [currentSlide, totalSlides]);

  const previousSlide = useCallback(() => {
    setPrevSlide(currentSlide);
    setDirection("prev");
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [currentSlide, totalSlides]);

  const goToSlide = (index: number) => {
    setPrevSlide(currentSlide);
    setDirection(index > currentSlide ? "next" : "prev");
    setCurrentSlide(index);
    // Reset the auto-play timer when manually changing slides
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 100);
    }
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setPrevSlide(currentSlide);
      setDirection("next");
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setPrevSlide(currentSlide);
      setDirection("prev");
      previousSlide();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000); // 4 seconds interval
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play when user interacts with controls
  const handleControlInteraction = (callback: () => void) => {
    setIsAutoPlaying(false);
    callback();
    // Resume auto-play after a short delay
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <Container className="relative w-full overflow-hidden rounded-lg shadow-xl">
      {/* Main slider container */}
      <div
        className="relative h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform:
              // Special case for last to first slide
              prevSlide === totalSlides - 1 &&
              currentSlide === 0 &&
              direction === "next"
                ? `translateX(${-currentSlide * 100}%)`
                : // Special case for first to last slide
                prevSlide === 0 &&
                  currentSlide === totalSlides - 1 &&
                  direction === "prev"
                ? `translateX(${-(currentSlide - totalSlides) * 100}%)`
                : // Normal case
                  `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full">
              <div className="relative aspect-[16/9] w-full sm:aspect-[16/9]">
                <Image
                  src={banner.src || "/placeholder.svg"}
                  alt={banner.alt}
                  fill
                  priority={banner.id === 1}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows with Preview */}
        <button
          onClick={() => handleControlInteraction(previousSlide)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-all hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:p-3 group overflow-hidden cursor-pointer"
          aria-label="Previous slide"
        >
          {/* Preview of previous slide */}
          <div className="absolute inset-0 opacity-40 transition-opacity">
            <Image
              src={
                banners[currentSlide === 0 ? totalSlides - 1 : currentSlide - 1]
                  .src
              }
              alt="Previous slide preview"
              fill
              className="object-cover"
            />
          </div>
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 drop-shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
        </button>

        <button
          onClick={() => handleControlInteraction(nextSlide)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-all hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:p-3 group overflow-hidden cursor-pointer"
          aria-label="Next slide"
        >
          {/* Preview of next slide */}
          <div className="absolute inset-0 opacity-40 transition-opacity">
            <Image
              src={
                banners[currentSlide === totalSlides - 1 ? 0 : currentSlide + 1]
                  .src
              }
              alt="Next slide preview"
              fill
              className="object-cover"
            />
          </div>
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 drop-shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all sm:h-3 sm:w-3 cursor-pointer",
              currentSlide === index
                ? "bg-primary scale-110"
                : "bg-white/70 hover:bg-white"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute -bottom-1 left-1/2 z-10 flex -translate-x-1/2 transform translate-y-full transition-transform duration-300 ease-in-out hover:translate-y-0 bg-white/90 p-2 rounded-t-lg shadow-md">
        <div className="flex space-x-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative h-12 w-20 overflow-hidden rounded border-2 transition-all",
                currentSlide === index
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={banner.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}
