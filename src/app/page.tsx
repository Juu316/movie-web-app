"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Movies from "@/components/Movies";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <>
      <Slider />
      <div className="min-h-screen max-w-screen-xl ml-auto mr-auto py-8 lg:py-13 space-y-8 lg:space-y-13">
        <Movies />
      </div>
    </>
  );
}
