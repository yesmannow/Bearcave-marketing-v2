"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { Camera, Palette, Shield } from "lucide-react";
import type { GalleryCategory, MixedMediaResource } from "@/app/types/cloudinary";

type CategoryConfig = {
  id: GalleryCategory;
  label: string;
  icon: React.ReactNode;
};

const CATEGORIES: CategoryConfig[] = [
  { id: "photography", label: "PHOTOGRAPHY", icon: <Camera className="w-4 h-4" /> },
  { id: "graphic-design", label: "DESIGN", icon: <Palette className="w-4 h-4" /> },
  { id: "proof", label: "PROOF", icon: <Shield className="w-4 h-4" /> },
];

interface GalleryResponse {
  success: boolean;
  category: GalleryCategory;
  folder: string;
  total: number;
  resources: MixedMediaResource[];
  error?: string;
}

// Per-project accent colors — badge color overrides for non-teal projects
const PROJECT_ACCENTS: Record<string, string> = {
  'tuohy-bailey-moore':    '#D4AF37', // Gold / Champagne
  'circle-city-kicks':     '#E63946', // Street Crimson
  'behr-pet-essentials':   '#8ECAE6', // Sky Blue / Organic
  'clean-aesthetics':      '#C8A2C8', // Soft Lilac / Beauty
  'hoosierboy-barber-shop':'#B22222', // Classic Barber Pole Red
  'taco-ninja':            '#FFB800', // Taco Gold / Warning Yellow
  'primarycare-indy':      '#0077B6', // Medical Professional Blue
  'piko-project':          '#00D4FF', // Electric Cyan / Workstation Blue
};
const DEFAULT_ACCENT = '#40E0D0';

function getProjectAccent(projectSlug?: string): string {
  return (projectSlug && PROJECT_ACCENTS[projectSlug]) || DEFAULT_ACCENT;
}

// Cinematic signal badge text for drone / motion videos
const UPLINK_SIGNAL = 'UPLINK: ACTIVE // 4K SIGNAL';
function isDroneVideo(publicId: string): boolean {
  const f = publicId.toLowerCase();
  return f.includes('photography-motion') || f.includes('dji_') || f.includes('graphic-design-motion');
}

// Custom hook to detect if the mouse is hovering over the featured showcase
const useFeaturedHover = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return { hoveredIndex, setHoveredIndex };
};

// Render the specific layout for the 6 featured items
const FeaturedGrid = ({ featuredItems }: { featuredItems: MixedMediaResource[] }) => {
  const { hoveredIndex, setHoveredIndex } = useFeaturedHover();

  if (featuredItems.length === 0) return null;

  // Ensure we only take up to 6 items to match the exact Aperture layout
  const items = featuredItems.slice(0, 6);

  const getGridClasses = (index: number) => {
    switch (index) {
      case 0: return "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[600px]"; // The Anchor
      case 1: return "md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-[300px]"; // Vertical 1
      case 2: return "md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-[300px]"; // Vertical 2
      case 3: return "md:col-span-4 md:row-span-1 min-h-[250px] md:min-h-[400px]"; // The Panorama (Full Width)
      case 4: return "md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-[300px]"; // Detail Square 1
      case 5: return "md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-[300px]"; // Detail Square 2
      default: return "md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-[300px]";
    }
  };

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-[#40E0D0] font-mono text-sm tracking-[0.2em] uppercase">
          Director&apos;s Cut
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-[#40E0D0]/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min grid-flow-dense">
        {items.map((resource, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
          const optimizedUrl = resource.resource_type === 'video'
                ? resource.secure_url.replace('/upload/', '/upload/f_auto,q_auto/')
                : resource.secure_url;

          return (
            <div
              key={resource.public_id}
              className={`relative group overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#1a1f35] transition-all duration-700 ease-out cursor-pointer ${getGridClasses(index)} ${
                isOtherHovered ? "blur-[3px] opacity-70 scale-[0.98]" : "blur-0 opacity-100 scale-100"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Media Container */}
              <div className="absolute inset-0">
                {resource.resource_type === 'video' ? (
                  <>
                    <video
                      src={optimizedUrl}
                      className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    {resource.duration && (
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#40E0D0]/30 z-20">
                        <p className="text-[#40E0D0] text-xs font-mono font-bold tracking-wider">
                          0:{String(Math.floor(resource.duration)).padStart(2, '0')}s
                        </p>
                      </div>
                    )}
                    {isDroneVideo(resource.public_id) && (
                      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                        <p className="text-[#40E0D0]/60 text-[9px] font-mono tracking-[0.2em] uppercase">{UPLINK_SIGNAL}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <Image
                    src={optimizedUrl}
                    alt={resource.context?.custom?.alt || resource.display_name || "Featured photography"}
                    fill
                    priority={true}
                    className={`object-cover transition-transform duration-1000 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder={resource.blurDataURL ? "blur" : "empty"}
                    blurDataURL={resource.blurDataURL}
                  />
                )}

                {/* Aperture Focus Gradient */}
                <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 pointer-events-none z-10`} />
              </div>

              {/* Teal Inner Glow Accent */}
              <div className={`absolute inset-0 border border-white/5 transition-all duration-500 rounded-lg pointer-events-none z-30 ${
                isHovered
                  ? 'border-[#40E0D0]/50 shadow-[inset_0_0_40px_rgba(64,224,208,0.15)]'
                  : ''
              }`} />

              {/* Metadata Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 transition-all duration-500 z-20 flex flex-col justify-end ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <p className="text-white text-lg font-bold tracking-wide">
                  {resource.context?.custom?.caption || resource.display_name}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#40E0D0]">
                    Aperture Collection
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#40E0D0]/50" />
                  <span className="text-[10px] font-mono text-[#64748b]">
                    0{index + 1}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DesignShowcase = ({ featuredItems }: { featuredItems: MixedMediaResource[] }) => {
  const { hoveredIndex, setHoveredIndex } = useFeaturedHover();

  if (featuredItems.length === 0) return null;

  // Take up to 8 items for the Design Systems layout
  const items = featuredItems.slice(0, 8);

  const getGridClasses = (index: number) => {
    switch (index) {
      case 0: return "col-span-2 md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[600px]"; // Spotlight 1 (Indy Bicentennial)
      case 1: return "col-span-2 md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[600px]"; // Spotlight 2 (Day at the Track)
      case 2:
      case 3:
      case 4: return "col-span-1 md:col-span-4 lg:col-span-2 min-h-[300px]"; // Medium Row
      case 5:
      case 6:
      case 7: return "col-span-1 md:col-span-2 lg:col-span-1 min-h-[250px]"; // Detail Row
      default: return "col-span-1 min-h-[250px]";
    }
  };

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-[#40E0D0] font-mono text-sm tracking-[0.2em] uppercase">
          Brand Architecture
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-[#40E0D0]/30 to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-min">
        {items.map((resource, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
          const optimizedUrl = resource.resource_type === 'video'
                ? resource.secure_url.replace('/upload/', '/upload/f_auto,q_auto/')
                : resource.secure_url;

          return (
            <div
              key={resource.public_id}
              className={`relative group overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#1a1f35] transition-all duration-700 ease-out cursor-pointer ${getGridClasses(index)} ${
                isOtherHovered ? "grayscale-50 opacity-60 scale-[0.98]" : "grayscale-0 opacity-100 scale-100"
              } ${isHovered ? "-translate-y-1" : "translate-y-0"}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Media Container */}
              <div className="absolute inset-0">
                {resource.resource_type === 'video' ? (
                  <>
                    <video
                      src={optimizedUrl}
                      className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    {resource.duration && (
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#40E0D0]/30 z-20">
                        <p className="text-[#40E0D0] text-xs font-mono font-bold tracking-wider">
                          0:{String(Math.floor(resource.duration)).padStart(2, '0')}s
                        </p>
                      </div>
                    )}
                    {isDroneVideo(resource.public_id) && (
                      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                        <p className="text-[#40E0D0]/60 text-[9px] font-mono tracking-[0.2em] uppercase">{UPLINK_SIGNAL}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <Image
                    src={optimizedUrl}
                    alt={resource.context?.custom?.alt || resource.display_name || "Featured design"}
                    fill
                    priority={true}
                    className={`object-cover transition-transform duration-1000 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder={resource.blurDataURL ? "blur" : "empty"}
                    blurDataURL={resource.blurDataURL}
                  />
                )}

                {/* Brand System Gradient Overlay */}
                <div className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 pointer-events-none z-10`} />
              </div>

              {/* Teal System Glow Accent */}
              <div className={`absolute inset-0 border border-white/5 transition-all duration-500 rounded-lg pointer-events-none z-30 ${
                isHovered
                  ? 'border-[#40E0D0]/50 shadow-[0_0_40px_rgba(64,224,208,0.15)]'
                  : ''
              }`} />

              {/* Systems Architecture Metadata Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-500 z-20 flex flex-col justify-end transform ${
                isHovered ? "translate-y-0" : "translate-y-2"
              }`}>
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <h3 className="text-white text-xl md:text-2xl font-black tracking-tight mb-2">
                      {resource.context?.custom?.caption || resource.display_name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#40E0D0]">
                        Identity System
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#40E0D0]/50" />
                      <span className="text-[10px] md:text-xs font-mono text-[#64748b]">
                        SYS.0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Related Work Link */}
                  {resource.relatedWorkUrl && (
                    <a
                      href={resource.relatedWorkUrl}
                      className={`shrink-0 flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 md:py-2.5 rounded-full transition-all duration-500 border border-white/10 ${
                        isHovered ? "text-[#40E0D0] border-[#40E0D0]/50 bg-[#40E0D0]/10 shadow-[0_0_20px_rgba(64,224,208,0.2)]" : "text-white/70"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="hidden md:inline">Explore</span> Case Study
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function StudioPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("photography");
  const [resources, setResources] = useState<MixedMediaResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/gallery?category=${activeCategory}`);
        const data: GalleryResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch gallery');
        }

        setResources(data.resources);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [activeCategory]);

  // Prefer curated featured-p-* assets; fall back to top-6 for the Aperture hero grid
  const curatedP = resources.filter(r => r.public_id.includes('featured-p-'));
  const featuredItems = curatedP.length > 0 ? curatedP : resources.slice(0, 6);

  // Prefer curated featured-gd-* assets; fall back to top-8 for the Design Showcase
  const curatedGd = resources.filter(r => r.public_id.includes('featured-gd-'));
  const featuredGdItems = curatedGd.length > 0 ? curatedGd : resources.slice(0, 8);

  // Standard masonry grid: exclude whichever items were promoted to hero/showcase
  const promotedIds = new Set([...featuredItems, ...featuredGdItems].map(r => r.public_id));
  const standardItems = resources.filter(r => !promotedIds.has(r.public_id));

  return (
    <div className="min-h-screen bg-[#0f172a] relative">
      {/* Mix-Blend Background Typography */}
      <div
        aria-hidden="true"
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ mixBlendMode: "difference" }}
      >
        <span
          className="font-serif font-black select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(6rem, 20vw, 24rem)",
            color: "#ffffff",
            opacity: 0.05,
            letterSpacing: "0.08em",
          }}
        >
          STUDIO
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 md:px-12 py-16 border-b border-[#1f1f1f]">
        <p className="text-[#40E0D0] text-xs tracking-[0.3em] uppercase mb-4">
          Visual Uplink
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-black text-white">
          Systems Architecture
          <br />
          Through Execution.
        </h1>
      </div>

      {/* Triple-Lens Perspective Switcher */}
      <div className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-[#1f1f1f]">
        <div className="px-6 md:px-12 py-6">
          <div className="relative inline-flex items-center gap-2 bg-[#1a1f35] rounded-full p-1.5">
            {/* Magnetic Pill Background */}
            <motion.div
              className="absolute h-[calc(100%-12px)] rounded-full bg-[#40E0D0]/20 border border-[#40E0D0]/40"
              layoutId="activePill"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
              style={{
                left: `${CATEGORIES.findIndex(c => c.id === activeCategory) * 33.33}%`,
                width: "33.33%",
              }}
            />

            {/* Category Buttons */}
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative z-10 px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-colors duration-200 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "text-[#40E0D0]"
                    : "text-[#64748b] hover:text-white"
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="relative z-10 px-6 md:px-12 py-12 min-h-[60vh]">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#40E0D0]/30 border-t-[#40E0D0] rounded-full animate-spin" />
              <p className="text-[#64748b] text-sm tracking-wider">LOADING ARTIFACTS...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-24">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-6 py-4 max-w-md">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && resources.length === 0 && (
          <div className="flex items-center justify-center py-24">
            <p className="text-[#64748b] text-sm tracking-wider">NO ARTIFACTS FOUND IN THIS CATEGORY</p>
          </div>
        )}

        {/* Featured Aperture Showcase */}
        {activeCategory === "photography" && featuredItems.length > 0 && (
          <FeaturedGrid featuredItems={featuredItems} />
        )}

        {/* Featured Design Systems Showcase */}
        {activeCategory === "graphic-design" && featuredGdItems.length > 0 && (
          <DesignShowcase featuredItems={featuredGdItems} />
        )}

        {/* Standard Masonry Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {standardItems.map((resource, index) => {
              const aspectRatio = resource.width / resource.height;
              const dominantColor = resource.colors?.[0]?.[0] || "#1a1f35";

              const optimizedUrl = resource.resource_type === 'video'
                ? resource.secure_url.replace('/upload/', '/upload/f_auto,q_auto/')
                : resource.secure_url;

              return (
                <motion.div
                  key={resource.public_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="break-inside-avoid mb-6"
                >
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    perspective={1000}
                    scale={1.02}
                    transitionSpeed={400}
                    gyroscope={true}
                  >
                    <div className="relative group overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#1a1f35] transition-all duration-500 hover:border-[#40E0D0]/50 hover:shadow-[0_0_40px_rgba(64,224,208,0.15)] hover:-translate-y-1">
                      {/* Image Container */}
                      <div
                        className="relative overflow-hidden"
                        style={{
                          aspectRatio: aspectRatio.toString(),
                          backgroundColor: dominantColor,
                        }}
                      >
                        {resource.resource_type === 'video' ? (
                          <>
                            <video
                              src={optimizedUrl}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              muted
                              loop
                              playsInline
                              autoPlay
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => e.currentTarget.pause()}
                            />
                            {/* Modified Video Duration Badge */}
                            {resource.duration && (
                              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#40E0D0]/30 z-20">
                                <p className="text-[#40E0D0] text-xs font-mono font-bold">
                                  0:{String(Math.floor(resource.duration)).padStart(2, '0')}s
                                </p>
                              </div>
                            )}
                            {isDroneVideo(resource.public_id) && (
                              <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                                <p className="text-[#40E0D0]/60 text-[9px] font-mono tracking-[0.2em] uppercase">{UPLINK_SIGNAL}</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <Image
                            src={optimizedUrl}
                            alt={resource.context?.custom?.alt || resource.display_name || "Studio artifact"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            placeholder={resource.blurDataURL ? "blur" : "empty"}
                            blurDataURL={resource.blurDataURL}
                          />
                        )}

                        {/* Holographic Overlay on Hover */}
                        <div className="absolute inset-0 bg-linear-to-br from-[#40E0D0]/0 via-[#40E0D0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                      </div>

                      {/* Metadata Overlay */}
                      {(resource.context?.custom?.caption || resource.display_name || resource.workId || resource.isAnchor) && (
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end">
                          <div className="flex justify-between items-end gap-4">
                            <div>
                              <p className="text-white text-sm font-bold tracking-wide">
                                {resource.context?.custom?.caption || resource.display_name}
                              </p>
                              {resource.isAnchor ? (
                                <span
                                  className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase tracking-widest px-2 py-0.5"
                                  style={{
                                    color: getProjectAccent(resource.projectSlug),
                                    border: `1px solid ${getProjectAccent(resource.projectSlug)}60`,
                                    background: `${getProjectAccent(resource.projectSlug)}18`,
                                  }}
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                                    style={{ background: getProjectAccent(resource.projectSlug) }}
                                  />
                                  Primary Mark
                                </span>
                              ) : resource.tags?.includes('featured') ? (
                                <span className="inline-block mt-2 text-[10px] uppercase tracking-widest text-[#40E0D0] border border-[#40E0D0]/30 bg-[#40E0D0]/10 px-2 py-0.5 rounded-full">
                                  Featured
                                </span>
                              ) : resource.projectSlug ? (
                                <span className="inline-block mt-2 text-[10px] uppercase tracking-widest text-[#a0a0a0] border border-[#3a3a3a] px-2 py-0.5">
                                  {resource.projectSlug}
                                </span>
                              ) : null}
                            </div>

                            {/* View Strategy — fires on relatedWorkUrl or legacy workId */}
                            {(resource.relatedWorkUrl || resource.workId) && (
                              <a
                                href={resource.relatedWorkUrl || `/work/${resource.workId}`}
                                className="shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#40E0D0] hover:text-white bg-[#40E0D0]/10 hover:bg-[#40E0D0]/20 backdrop-blur-md px-3 py-1.5 rounded-full transition-all border border-[#40E0D0]/30 hover:border-[#40E0D0]/60"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View Strategy
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                  <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Technical Accent Border - Teal glow for videos */}
                      <div className={`absolute inset-0 border-2 transition-all duration-300 rounded-lg pointer-events-none z-30 ${
                        resource.resource_type === 'video'
                          ? 'border-[#40E0D0]/0 group-hover:border-[#40E0D0]/50 group-hover:shadow-[0_0_20px_rgba(64,224,208,0.3)]'
                          : 'border-[#40E0D0]/0 group-hover:border-[#40E0D0]/30'
                      }`} />
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-6 md:px-12 py-16 border-t border-[#1f1f1f] mt-24">
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          High-performance artifact gallery powered by Cloudinary. Each category
          represents a distinct lens through which Systems Architecture manifests:
          visual capture, design synthesis, and technical proof.
        </p>
      </div>
    </div>
  );
}
