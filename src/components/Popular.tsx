import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight} from "lucide-react";
const token = process.env.TMDB_API_TOKEN;
const Popular = () => {
    const [popularMovieData, setPopularMovieData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");




  return (
    <div>
      
    </div>
  )
}

export default Popular
