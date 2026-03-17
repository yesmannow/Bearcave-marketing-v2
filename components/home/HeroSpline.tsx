"use client";

import Spline from '@splinetool/react-spline/next';
import { Suspense } from 'react';
import HeroLoadingSystem from './HeroLoadingSystem';

export default function HeroSpline() {
  return (
    <div className="h-[400px] lg:h-[520px] w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 relative">
      <Suspense fallback={<HeroLoadingSystem />}>
        <Spline 
          scene="https://prod.spline.design/LvWgyBF-mshgx2CU/scene.splinecode" 
        />
      </Suspense>
    </div>
  );
}
