import logo from "../assets/image/logo.png";
// import heroImg from "../assets/image/banner.jpeg";
import { Play, Info } from "lucide-react";
import { movieInstances } from "../utility/movieInstances";
import requests from "../utility/requestUrl";
import { useEffect, useState } from "react";
const BANNER_BASE = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [bannerImage, setBannerImage] = useState({});

  useEffect(() => {
    async function fetchBannerImage() {
      const request = await movieInstances.get(requests.fetchNetflixOriginals);
      setBannerImage(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ],
      );
    }
    fetchBannerImage();
  }, []);

  // console.log(bannerImage);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div
      className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] bg-cover bg-center bg-no-repeat object-contain text-white shrink-0"
      style={{
        backgroundImage: `url("${BANNER_BASE}${bannerImage.backdrop_path}")`,
      }}
    >
      <div className="px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 md:pt-35">
        <img src={logo} alt="logo" className="w-24 sm:w-32 md:w-40" />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium pb-3 sm:pb-5">
          {bannerImage?.original_name}
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold tracking-wide max-w-[90%] sm:max-w-[70%] md:max-w-[50%] line-clamp-3 sm:line-clamp-4 mb-4 sm:mb-6">
          {truncate(bannerImage?.overview, 120)}
        </p>
        <div className="flex gap-3 sm:gap-6 mb-4 sm:mb-7">
          <button className="outline-none rounded-md font-bold h-9 sm:h-12 tracking-wide px-3 sm:px-4 text-sm sm:text-base bg-white text-black flex items-center justify-center gap-2 sm:gap-3 hover:text-white hover:bg-black hover:transition-all duration-75">
            <Play size={18} className="sm:w-6 sm:h-6" />
            Play
          </button>
          <button className="outline-none rounded-md font-bold h-9 sm:h-12 tracking-wide px-3 sm:px-4 text-sm sm:text-base bg-white text-black flex items-center justify-center gap-2 sm:gap-3 hover:text-white hover:bg-black hover:transition-all duration-75">
            <Info size={18} className="sm:w-6 sm:h-6" />
            My Lists
          </button>
        </div>
        {/* fading */}
        <div className="absolute bottom-0 left-0 w-full h-20 sm:h-30 md:h-40 bg-linear-to-t from-black via-black/30 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default Banner;
