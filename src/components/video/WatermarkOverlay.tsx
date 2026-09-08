'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

export const WatermarkOverlay: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [quadrant, setQuadrant] = useState(0);

  const quadrants = [
    { top: '10%', left: '8%' },
    { top: '10%', right: '8%' },
    { bottom: '15%', left: '8%' },
    { bottom: '15%', right: '8%' },
    { top: '45%', left: '40%' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuadrant((prev) => (prev + 1) % quadrants.length);
    }, 12000); // Shift every 12 seconds
    return () => clearInterval(interval);
  }, [quadrants.length]);

  if (!user) return null;

  return (
    <div
      style={quadrants[quadrant] as any}
      className="absolute pointer-events-none z-30 transition-all duration-1000 select-none bg-black/20 px-2.5 py-1 rounded backdrop-blur-[1px]"
    >
      <span className="text-[10px] font-mono font-bold text-white/40 tracking-wider block">
        {user.name} • {user.email}
      </span>
      <span className="text-[8px] font-mono text-white/30 block">SkillHub DRM Protected</span>
    </div>
  );
};
