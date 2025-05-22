"use client";
import Slider from "@/components/Slider";
import Upcoming from "@/components/Upcoming";
import Popular from "@/components/Popular";
import Toprated from "@/components/Toprated";
export default function Home() {
  return (
    <>
      <Slider />
      <div className="max-w-screen-xl w-full mx-auto py-8 lg:py-12 px-4">
        <Upcoming />
        <Popular />
        <Toprated />
      </div>
    </>
  );
}
