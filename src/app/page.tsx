"use client";
import Image from "next/image";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import Header from "@/components/Header";
export default function Home() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const TMDB_IMAGE_SERVICE_URL=process.env.TMDB_IMAGE_SERVICE_URL ;
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${TMDB_API_TOKEN}`
  //   }
  // };
  
  function getPopularMovie(){
    const options = {
      method: 'GET',
      url: `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_TOKEN}`
      }
    };
  
    axios
    .request(options)
    .then(res => console.log(res.data))
    .catch(err => console.error("error here: ",err));
  }
  useEffect(getPopularMovie(),[]);
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
