"use client";
import React from "react";
import { useParams } from "next/navigation";
const Page = () => {
  const params = useParams();

  console.log(params.id);
  return (
    <>
      <div className="mt-[59px]">text</div>
    </>
  );
};

export default Page;
