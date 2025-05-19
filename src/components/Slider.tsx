"use client";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Slider = () => {
  const [movieData, setMovieData] = useState<
    { id: number; title: string; backdrop_path: string; vote_average: number }[]
  >([]);
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.TMDB_API_TOKEN;
  const { push } = useRouter();
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  const fetchData = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovieData(res.data.results.slice(0, 10)); // results contains the movie list
      // setLoading(false);
    } catch (error) {
      console.error(error);
      // setErrorMessage("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("MOVIE DATA:", movieData);
  }, [setMovieData, movieData]);
  return (
    <>
      <div className="mt-[59px] w-full ">
        <div ref={sliderRef} className="w-full keen-slider">
          {movieData.map((movie) => (
            <div
              key={movie.id}
              className="keen-slider__slide w-full overflow-hidden rounded-lg bg-secondary space-y-1   cursor-pointer "
              onClick={() => push(`/details/${movie.id}`)}>
              <Image
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                objectFit="contain"
                fill
              />

              {/* <div className="p-2">
                    <div className="flex items-center gap-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#fde047"
                        stroke="#fde047"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                      </svg>
                      <div className="font-medium">
                        <span className="text-foreground text-sm">
                          {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          /10
                        </span>
                      </div>
                    </div>
                    <h4 className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                      {movie.title}
                    </h4>
                  </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
