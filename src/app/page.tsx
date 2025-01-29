"use client";
import Image from "next/image";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import Header from "@/components/Header";
export default function Home() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${TMDB_API_TOKEN}`
  //   }
  // };
  const options = {
    method: 'GET',
    url: `${TMDB_BASE_URL}/movie/popular?language=en-US&pafe=1`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWFiYzllYjNmZTQxNzI1NDViZDc0MzI2ZmQwMDJmOCIsIm5iZiI6MTczODAzNzc1NC42MzY5OTk4LCJzdWIiOiI2Nzk4NTlmYTM3MmNiMjBjZjgyMzg0NGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WBQLl0E0QJ4_D0cK0QpkcTuzIiyGY7jX3c7QUPBpU-s'
    }
  };
  axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error("error here: ",err));
  // const getMovieData = () => {
    
  // //   try {
  // //     const response = await axios.get(
  // //       `${TMDB_BASE_URL}/movie/`,
  // //     )
  // //   }
  // //  catch(err){
  // //   console.log("Error:",err)
  // };
  // useEffect(()=>{
  //   try{fetch(`${TMDB_BASE_URL}`, options)
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err));} catch(error){
  //     console.log("Error happened bro:", error)
  //   }
    
  // },[]);
  return (
    <Header/>
  );
}
