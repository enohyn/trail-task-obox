"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingWrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const wrap = headingWrapRef.current;
    if (wrap) gsap.set(wrap, { autoAlpha: 0, y: 12, scale: 0.98 });
    const scroller = document.getElementById("page-scroll") || undefined;
    const st = wrap
      ? ScrollTrigger.create({
          trigger: section || wrap,
          scroller,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => gsap.to(wrap, { autoAlpha: 1, y: 0, scale: 1, duration: 1.6, ease: "power3.out" }),
          onEnterBack: () => gsap.to(wrap, { autoAlpha: 1, y: 0, scale: 1, duration: 1.6, ease: "power3.out" }),
          onLeave: () => gsap.to(wrap, { autoAlpha: 0, y: -12, scale: 0.98, duration: 1.0, ease: "power2.inOut" }),
          onLeaveBack: () => gsap.to(wrap, { autoAlpha: 0, y: 12, scale: 0.98, duration: 1.0, ease: "power2.inOut" }),
        })
      : null;
    return () => {
      if (st) st.kill();
    };
  }, []);
  return (
    <section ref={sectionRef} className="font-domaine relative font-domine w-full snap-center min-h-[calc(100dvh-120px)]">
      <div className="flex container mx-auto justify-center items-center ">
        <div className="outer-box  aspect-square text-center flex justify-center ">
          <div className="inner-box h-full w-full flex flex-col justify-center p-16">
            <div ref={headingWrapRef} className="hero-gradient  max-sm:py-10 text-4xl font-semibold lg:text-5xl">
              <h1 className=" hero-gradient drop-shadow-xl mb-2">
                HALL OF NATURE
              </h1>
              <p className="font-medium">
                Scroll down below <br /> to view the collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
