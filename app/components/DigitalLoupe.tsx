"use client";

import type { ReactNode } from "react";

/** Aperture radius in px (default). */
const DEFAULT_RADIUS = 80;

/** Magnification factor — the duplicate content is rendered at this scale. */
const MAGNIFICATION = 2;

interface DigitalLoupeProps {
  /**
   * The content to render inside the zoomed aperture.
   * Should be an identical copy of the gallery track so pixel-accurate
   * magnification can be applied.
   */
  children: ReactNode;
  /** Cursor X in the container's coordinate space (px). */
  cursorX: number;
  /** Cursor Y in the container's coordinate space (px). */
  cursorY: number;
  /** Whether the loupe is active / visible. */
  visible: boolean;
  /** Aperture radius in px. Defaults to 80. */
  radius?: number;
}

/**
 * DigitalLoupe
 *
 * An optical glass lens that reveals a pixel-accurate 2× zoom of the
 * content beneath the cursor.
 *
 * Technique:
 *  1. A `clip-path: circle()` aperture layer is positioned absolutely over
 *     the gallery, revealing only a circular window around the cursor.
 *  2. Inside that aperture, a duplicate of the gallery content is rendered
 *     with `transform: translate(cx,cy) scale(2) translate(-cx,-cy)` so
 *     the point under the cursor stays fixed while everything around it
 *     is magnified — true optical zoom, not a backdrop filter.
 *  3. A decorative glass ring with crosshair, cardinal ticks, and a conic
 *     lens-sheen gradient gives the instrument its premium optical feel.
 */
export default function DigitalLoupe({
  children,
  cursorX,
  cursorY,
  visible,
  radius = DEFAULT_RADIUS,
}: DigitalLoupeProps) {
  const opacity = visible ? 1 : 0;
  const trans = "opacity 0.15s ease";

  /**
   * Scale 2× around the cursor point.
   * Matrix: translate(cx,cy) · scale(2) · translate(-cx,-cy)
   * This keeps (cx,cy) pinned while magnifying the surrounding content.
   */
  const zoomTransform = `translate(${cursorX}px, ${cursorY}px) scale(${MAGNIFICATION}) translate(${-cursorX}px, ${-cursorY}px)`;

  return (
    <>
      {/* ── 1. Aperture: clip-path circle containing the 2× scaled content ─ */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          pointerEvents: "none",
          // Clip to a circle centred on the cursor
          clipPath: `circle(${radius}px at ${cursorX}px ${cursorY}px)`,
          WebkitClipPath: `circle(${radius}px at ${cursorX}px ${cursorY}px)`,
          opacity,
          transition: trans,
          // Subtle brightness lift so the zoomed area feels illuminated
          filter: "brightness(1.12) contrast(1.08)",
        }}
      >
        {/* Scale wrapper — magnifies content around the cursor point */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: zoomTransform,
          }}
        >
          {children}
        </div>
      </div>

      {/* ── 2. Optical glass ring ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          width: radius * 2,
          height: radius * 2,
          zIndex: 21,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          opacity,
          transition: trans,
          // Outer aperture ring
          border: "1px solid rgba(0, 242, 255, 0.55)",
          // Dark inner ring for depth
          outline: "1px solid rgba(0, 0, 0, 0.45)",
          // Outer glow + inner depth shadow
          boxShadow:
            "0 0 0 6px rgba(0, 242, 255, 0.04), " +
            "0 0 28px rgba(0, 242, 255, 0.2), " +
            "inset 0 0 24px rgba(0, 0, 0, 0.18)",
          // Lens sheen: refraction highlight at top-left (simulates glass curvature)
          background:
            "conic-gradient(" +
            "from 220deg at 36% 36%, " +
            "rgba(255,255,255,0.07) 0deg, " +
            "transparent 48deg, " +
            "transparent 310deg, " +
            "rgba(255,255,255,0.04) 360deg" +
            ")",
        }}
      >
        {/* Horizontal crosshair arm */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "8%",
            right: "8%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(0,242,255,0.55) 28%, rgba(0,242,255,0.55) 72%, transparent)",
            transform: "translateY(-50%)",
          }}
        />
        {/* Vertical crosshair arm */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "8%",
            bottom: "8%",
            width: 1,
            background:
              "linear-gradient(180deg, transparent, rgba(0,242,255,0.55) 28%, rgba(0,242,255,0.55) 72%, transparent)",
            transform: "translateX(-50%)",
          }}
        />
        {/* Centre aiming dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(0, 242, 255, 0.95)",
            boxShadow: "0 0 8px #00F2FF, 0 0 18px rgba(0, 242, 255, 0.4)",
          }}
        />
        {/* Cardinal tick marks (N / E / S / W) */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 10,
              height: 1,
              background: "rgba(0, 242, 255, 0.65)",
              transformOrigin: "left center",
              transform: `translateY(-50%) rotate(${deg}deg) translateX(${radius - 16}px)`,
            }}
          />
        ))}
      </div>
    </>
  );
}
