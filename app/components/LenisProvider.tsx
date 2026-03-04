"use client";

import { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GSAPSyncBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    const raf = (time: number) => {
      ScrollTrigger.update();
      void time;
    };
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(raf);
    return () => gsap.ticker.remove(raf);
  }, []);

  return null;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      <GSAPSyncBridge />
      {children}
    </ReactLenis>
  );
}
