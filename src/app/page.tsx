"use client";
// import React, { useEffect, useState } from "react";
// import Movies from "@/components/Movies";
import Slider from "@/components/Slider";
import Upcoming from "@/components/Upcoming";
import Popular from "@/components/Popular";
import Toprated from "@/components/Toprated";
export default function Home() {
  return (
    <>
      <Slider />
      <div className=" max-w-screen-xl w-full  mx-auto py-8 lg:py-13 space-y-8 lg:space-y-13">
        <Upcoming />
        <Popular />
        <Toprated />
      </div>
    </>
  );
}
