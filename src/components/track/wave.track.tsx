"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  useEffect(() => {
    if (containerRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        url: `/api?audio=${fileName}`,
      });

      // Clean up on component unmount
      return () => wavesurfer.destroy();
    }
  }, []);

  return <div ref={containerRef}>wave track</div>;
}
