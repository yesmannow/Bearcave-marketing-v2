"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import HeroSynapticNetwork from "./HeroSynapticNetwork";

export default function Hero() {
  return (
    <section className="relative bg-black pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-[#EDEDED] leading-[1.1] tracking-tight"
              >
                Jacob Darling — <span className="text-[#40E0D0]">Marketing Strategist</span> & Systems Architect
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl leading-relaxed"
              >
                I design and build integrated marketing ecosystems—blending brand strategy, websites, automation, and analytics to drive measurable growth.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-[#7a7a7a] text-sm md:text-base max-w-xl leading-relaxed"
              >
                Most teams stop at strategy or design. I build the full system—so everything actually works together.
              </motion.p>
            </div>

            {/* Micro-proof strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] uppercase text-[#4a4a4a]"
            >
              <span>Strategy</span>
              <span className="w-1 h-1 rounded-full bg-[#333]" />
              <span>Automation</span>
              <span className="w-1 h-1 rounded-full bg-[#333]" />
              <span>Growth</span>
              <span className="w-1 h-1 rounded-full bg-[#333]" />
              <span>Leadership</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.02} transitionSpeed={2000}>
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#EDEDED] text-black text-xs font-bold tracking-[0.15em] uppercase pearl-interact shadow-[0_0_20px_rgba(64,224,208,0.1)] hover:shadow-[0_0_30px_rgba(64,224,208,0.3)]"
                >
                  My Work
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Tilt>
              
              <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.02} transitionSpeed={2000}>
                <Link
                  href="/my-story"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[#333] text-[#EDEDED] text-xs font-bold tracking-[0.15em] uppercase pearl-interact hover:border-[#EDEDED]"
                >
                  My Story
                </Link>
              </Tilt>
            </motion.div>
          </div>

          {/* Synaptic Network Column (5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <HeroSynapticNetwork />
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Subtle decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#40E0D005] to-transparent pointer-events-none" />
    </section>
  );
}
