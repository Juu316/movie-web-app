"use client";
import React from "react";
import { useParams } from "next/navigation";
// import { useEffect } from "react";
const Page = () => {
  const params = useParams();

  console.log(params.id);
  return <div>div {params.id}</div>;
};

export default Page;
