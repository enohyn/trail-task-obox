"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  videos: string[];
  width?: number;
  spinDuration?: number;
  gap?: number;
};

export default function Discrete3DVideoCarousel({
  videos,
  width = 210,
  spinDuration = 0.8,
  gap = 1.8,
}: Props) {
  const count = videos.length;
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingBoxRef = useRef<HTMLDivElement | null>(null);
  const panesRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const degPer = 360 / Math.max(1, count);
  const radiusRef = useRef<number>(0);
  const isCooldownRef = useRef(false);
  const currentIndexRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const WHEEL_THRESHOLD = 30;
  const SWIPE_THRESHOLD = 30;
  const MIN_WHEEL_INTERVAL_MS = 80;
  const lastWheelTsRef = useRef(0);
  const pendingAutoplayRef = useRef(false);

  const getActiveVideo = useCallback(() => {
    const pane = panesRef.current[currentIndexRef.current];
    if (!pane) return null;
    return pane.querySelector("video") as HTMLVideoElement | null;
  }, []);

  const autoplayGestureKick = useCallback(() => {
    const v = getActiveVideo();
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
    window.removeEventListener("pointerdown", autoplayGestureKick);
    window.removeEventListener("touchend", autoplayGestureKick);
    pendingAutoplayRef.current = false;
  }, [getActiveVideo]);

  const tryPlay = useCallback((video: HTMLVideoElement | null | undefined) => {
    if (!video) return;
    video.muted = true;
    const p = video.play();
    if (p && typeof (p as Promise<void>).catch === "function") {
      (p as Promise<void>).catch(() => {
        if (!pendingAutoplayRef.current) {
          pendingAutoplayRef.current = true;
          window.addEventListener("pointerdown", autoplayGestureKick, {
            once: true,
          });
          window.addEventListener("touchend", autoplayGestureKick, {
            once: true,
          });
        }
      });
    }
  }, [autoplayGestureKick]);

  const setPaneRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    panesRef.current[i] = el;
  };

  const translateZ = useMemo(() => {
    const panelSize = width;
    const baseRadius = panelSize / 2 / Math.tan((Math.PI * 2) / count / 2);
    return Math.round(baseRadius * gap);
  }, [count, width, gap]);


  const getScrollContainer = () =>
    (typeof window !== "undefined"
      ? (document.getElementById("page-scroll") as HTMLDivElement | null)
      : null);

  const lockScroll = useCallback(() => {
    const sc = getScrollContainer();
    if (!sc) return;
    if (!sc.classList.contains("scroll-locked")) sc.classList.add("scroll-locked");
  }, []);

  const unlockScroll = useCallback(() => {
    const sc = getScrollContainer();
    if (!sc) return;
    if (sc.classList.contains("scroll-locked")) sc.classList.remove("scroll-locked");
  }, []);

  const updateActive = useCallback((active: number) => {
    panesRef.current.forEach((pane, i) => {
      const video = pane?.querySelector("video") as HTMLVideoElement | null;
      if (!video) return;
      if (i === active) {
        try {
          video.currentTime = 0;
        } catch {}
        tryPlay(video);
      } else {
        video.pause();
      }
    });
    setActiveIndex(active);
    currentIndexRef.current = active;
  }, [tryPlay]);

  const goToIndex = useCallback(
    (idx: number) => {
      if (!carouselRef.current) return;
      const wrapped = ((idx % count) + count) % count;
      const deg = -wrapped * degPer;
      gsap.to(carouselRef.current, {
        rotationY: deg,
        duration: spinDuration,
        ease: "power3.out",
        onComplete: () => updateActive(wrapped),
      });
    },
    [count, degPer, spinDuration, updateActive]
  );

  useEffect(() => {
    if (!carouselRef.current || count === 0) return;
    radiusRef.current = translateZ;

    for (let i = 0; i < panesRef.current.length; i++) {
      const pane = panesRef.current[i];
      if (!pane) continue;
      const deg = i * degPer;
      pane.style.transform = `rotateY(${deg}deg) translateZ(${translateZ}px)`;
      pane.style.transformStyle = "preserve-3d";
      pane.style.backfaceVisibility = "hidden";
      const inner = pane.querySelector<HTMLDivElement>(".inner");
      if (inner) inner.style.transform = `rotateY(${-deg}deg)`;
    }

    gsap.set(carouselRef.current, { rotationY: 0 });
    updateActive(0);
  }, [degPer, translateZ, count, updateActive]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const heading = headingBoxRef.current;
    const section = containerRef.current;
    const ring = carouselRef.current;
    const scroller = document.getElementById("page-scroll") || undefined;
    
    const headingTrigger = heading
      ? ScrollTrigger.create({
          trigger: section || heading,
          scroller,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => gsap.to(heading, { autoAlpha: 1, y: 0, scale: 1, duration: 1.6, ease: "power3.out" }),
          onEnterBack: () => gsap.to(heading, { autoAlpha: 1, y: 0, scale: 1, duration: 1.6, ease: "power3.out" }),
          onLeave: () => gsap.to(heading, { autoAlpha: 0, y: -12, scale: 0.98, duration: 1.0, ease: "power2.inOut" }),
          onLeaveBack: () => gsap.to(heading, { autoAlpha: 0, y: 12, scale: 0.98, duration: 1.0, ease: "power2.inOut" }),
        })
      : null;
    if (heading) gsap.set(heading, { autoAlpha: 0, y: 12, scale: 0.98 });
    const ringTrigger = ring
      ? ScrollTrigger.create({
          trigger: section || ring,
          scroller,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => gsap.to(ring, { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power3.out" }),
          onEnterBack: () => gsap.to(ring, { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power3.out" }),
          onLeave: () => gsap.to(ring, { autoAlpha: 0, scale: 0.98, duration: 1.0, ease: "power2.inOut" }),
          onLeaveBack: () => gsap.to(ring, { autoAlpha: 0, scale: 0.98, duration: 1.0, ease: "power2.inOut" }),
        })
      : null;
    if (ring) gsap.set(ring, { autoAlpha: 0, scale: 0.98 });
    return () => {
      if (headingTrigger) headingTrigger.kill();
      if (ringTrigger) ringTrigger.kill();
    };
  }, []);

  useEffect(() => {
    if (activeIndex > 0) lockScroll();
    else unlockScroll();
    return () => {
      unlockScroll();
    };
  }, [activeIndex, lockScroll, unlockScroll]);

  const triggerStep = useCallback(
    (dir: "next" | "prev") => {
      if (isCooldownRef.current) return;
      isCooldownRef.current = true;
      const nextIndex =
        dir === "next"
          ? currentIndexRef.current + 1
          : currentIndexRef.current - 1;
      goToIndex(nextIndex);
      setTimeout(() => {
        isCooldownRef.current = false;
      }, 450);
    },
    [goToIndex]
  );

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      if (!containerRef.current) return;
  const rect = containerRef.current.getBoundingClientRect();
  const vh = window.innerHeight || 800;
  const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
  const ratio = visible / Math.min(vh, Math.max(1, rect.height));
  const isMostlyVisible = ratio >= 0.6; 
  if (!isMostlyVisible) return; 

      
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

  const goingNext = e.deltaY > 0;

      if (activeIndex === 0) {
        if (!goingNext) {
          return;
        }
      } else {
        if (goingNext && currentIndexRef.current >= count - 1) {
          return;
        }
        if (!goingNext && currentIndexRef.current <= 0) {
          return;
        }
      }

      const now = performance.now();
      if (now - lastWheelTsRef.current < MIN_WHEEL_INTERVAL_MS) {
        e.preventDefault();
        return;
      }
      lastWheelTsRef.current = now;

      e.preventDefault();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        if (goingNext) triggerStep("next");
        else triggerStep("prev");
      });
    };

    let touchStartY = 0;
    let touchStartInside = false;

    const touchStartHandler = (e: TouchEvent) => {
      if (!containerRef.current) {
        touchStartInside = false;
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const t = e.touches[0];
      touchStartInside =
        t.clientY >= rect.top &&
        t.clientY <= rect.bottom &&
        t.clientX >= rect.left &&
        t.clientX <= rect.right;
      touchStartY = t.clientY;
    };

    const touchEndHandler = (e: TouchEvent) => {
  if (!touchStartInside) return;
      const endY = e.changedTouches[0].clientY;
      const dy = touchStartY - endY;
      if (Math.abs(dy) < SWIPE_THRESHOLD) return;

      const goingNext = dy > 0;
      if (activeIndex === 0 && !goingNext) return;
      if (goingNext && currentIndexRef.current >= count - 1) {
        return;
      }

      e.preventDefault();
      triggerStep(goingNext ? "next" : "prev");
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });
    window.addEventListener("touchstart", touchStartHandler, { passive: true });
    window.addEventListener("touchend", touchEndHandler, { passive: false });

    return () => {
      window.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("touchstart", touchStartHandler);
      window.removeEventListener("touchend", touchEndHandler);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [videos, count, activeIndex, triggerStep]);

  useEffect(() => {
    updateActive(activeIndex);
    return () => unlockScroll();
  }, [activeIndex, updateActive, unlockScroll]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
        className="relative pb-12  lg:pb-20 mx-0 w-full overflow-x-hidden p-[20px] snap-center min-h-[calc(100dvh-120px)]"
      >
  <div ref={headingBoxRef} className="relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 bg-black/20 backdrop-blur-sm shadow-lg rounded-xl px-4 py-6 text-center">
          <h1
            key={activeIndex === count - 1 ? "last" : "default"}
            className="font-domaine drop-shadow-xl hero-gradient text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 transition-all duration-300 ease-out"
            aria-live="polite"
          >
            {activeIndex === count - 1
              ? "You have reached the last slide, scroll back to the first slide."
              : "Scroll to spin the carousel."}
          </h1>
        </div>
        <div
          style={{
            width: width,
            height: Math.round((width / 9) * 16),
            perspective: 1000,
            margin: "30px 0",
          }}
        >
          <div
            ref={carouselRef}
            className="theme-header"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
              transition: `transform ${spinDuration}s`,
            }}
          >
            {videos.map((src, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={i}
                  ref={(el) => setPaneRef(el, i)}
                  className="pane"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="pane-outer bg-white/50 backdrop-blur-lg"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 12,
                      overflow: "hidden",
                      border: isActive
                        ? "1px solid #134e4a"
                        : "0.5px solid #134e4a",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
                      position: "relative",
                    }}
                  >
                    <div
                      className="inner"
                      style={{
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <video
                        src={src}
                        loop
                        muted
                        autoPlay
                        playsInline
                        preload="auto"
                        onLoadedMetadata={(e) => {
                          if (i === currentIndexRef.current) {
                            const v = e.currentTarget as HTMLVideoElement;
                            v.muted = true;
                            v.play().catch(() => {});
                          }
                        }}
                        onCanPlay={(e) => {
                          if (i === currentIndexRef.current) {
                            const v = e.currentTarget as HTMLVideoElement;
                            v.muted = true;
                            v.play().catch(() => {});
                          }
                        }}
                        style={{
                          width: "100%",
                          aspectRatio: "16/9",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          display: "block",
                          transform: "translateZ(0)",
                          scale: 2,
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>

                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: isActive
                          ? "rgba(6,95,70,0.2)"
                          : "rgba(6,95,70,0.3)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
