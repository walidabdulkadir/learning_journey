import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";
import { IoIosArrowDropdownCircle } from "react-icons/io";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function Card({ movies }) {
  return (
    <div
      style={{ flexShrink: 0 }}
      className="relative group w-full h-28 sm:h-32 md:h-36 bg-neutral-900 rounded-md transition-all duration-300 ease-in-out hover:z-50 hover:scale-110 md:hover:scale-125 hover:shadow-2xl hover:shadow-black cursor-pointer"
    >
      {/* Image from TMDB API */}
      <img
        src={`${IMAGE_BASE}${movies?.poster_path}`}
        alt={movies?.title || movies?.name}
        className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-t-md group-hover:rounded-b-none transition-all duration-300"
      />

     
      <div className="hidden group-hover:block absolute top-full left-0 w-full bg-neutral-900 p-3 sm:p-4 rounded-b-md shadow-lg transition-all duration-300 space-y-2 sm:space-y-3">
        
        <div className="inline-block bg-red-600 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-sm uppercase tracking-wider">
          Recently added
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <FaCirclePlay
              size={24}
              className="text-white hover:opacity-80 cursor-pointer sm:w-8 sm:h-8"
            />
            <BsPlusCircle
              size={24}
              className="text-white hover:opacity-80 cursor-pointer sm:w-8 sm:h-8"
            />
            <GoCheckCircle
              size={24}
              className="text-white hover:opacity-80 cursor-pointer sm:w-8 sm:h-8"
            /> 
          </div>
          <IoIosArrowDropdownCircle
            size={24}
            className="text-white hover:opacity-80 cursor-pointer sm:w-8 sm:h-8"
          />
        </div>

        {/* Static: matureRating, category, quality from Data.js */}
        <div className="flex gap-2 sm:gap-4 text-[10px] sm:text-xs font-semibold text-neutral-300">
          <span className="px-1 py-0.5">
            U/A 13+
          </span>
          <span>Movie</span>
          <span className="px-1 rounded">HD</span>
        </div>

        <div className="flex gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-neutral-400">
          <span>Sci-Fi</span>
          <span>•</span>
          <span>Thriller</span>
          <span>•</span>
          <span>Action</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

