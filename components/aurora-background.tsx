"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
}: AuroraBackgroundProps) => {

  const auroraColors = {
    from: "#18181b",
    teal900: "#134e4a",
    teal800: "#115e59",
    teal700: "#0f766e",
  };
  return (
    <main className="relative min-h-screen w-full">
      <div
        className={cn(
          "fixed inset-0 z-0 overflow-hidden",
          "bg-gradient-to-tr from-zinc-900 via-zinc-900 to-teal-900",
          className
        )}
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora-from": auroraColors.from,
              "--aurora-teal900": auroraColors.teal900,
              "--aurora-teal800": auroraColors.teal800,
              "--aurora-teal700": auroraColors.teal700,
              "--black": "#18181b",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--aurora-from)_0%,var(--aurora-teal900)_25%,var(--aurora-teal800)_50%,var(--aurora-teal700)_75%,var(--aurora-from)_100%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
      </div>
      <div
        id="page-scroll"
        className="relative z-10 flex h-screen w-full flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        {children}
      </div>
    </main>
  );
};
