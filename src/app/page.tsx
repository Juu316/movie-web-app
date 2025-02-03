"use client";
import Image from "next/image";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
export default function Home() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const TMDB_IMAGE_SERVICE_URL=process.env.TMDB_IMAGE_SERVICE_URL ;
  const TMDB_API_KEY = process.env.TMDB_API_KEY ;
  
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
  const url = `${TMDB_BASE_URL}/movie/550?api_key=${TMDB_API_KEY}`;

  fetch(url)
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    console.log(data.results); // Display the list of popular movies
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
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
    <>
    <Header/>
    <Slider/>
    <Footer/>
    </>
  );
}
