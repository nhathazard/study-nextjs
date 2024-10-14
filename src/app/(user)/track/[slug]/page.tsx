"use client";
import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";
export default function DetailTrackPage(prop: any) {
  const { params } = prop;
  const searchParams = useSearchParams();

  const search = searchParams.get("audio");
  return (
    <div>
      <WaveTrack></WaveTrack>
    </div>
  );
}
