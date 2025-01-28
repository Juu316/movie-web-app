import Image from "next/image";
import axios from 'axios';
import {useEffect, useState} from "react";
import Header from "@/components/Header";
export default function Home() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  //const 
  // const getMovieData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${TMDB_BASE_URL}/movie/`,
  //     )
  //   }
  // } catch(err){
  //   console.log("Error:",err)
  // }
  
  return (
    <Header/>
  );
}
