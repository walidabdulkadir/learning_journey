import logo from "../assets/image/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User2Icon, ChevronDown, Menu, X } from "lucide-react";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-1000 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="bg-transparent flex items-center justify-between px-4 sm:px-6 lg:px-10 py-2 max-w-[1920px] mx-auto">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-16 sm:w-20 h-auto shrink-0 opacity-85 hover:opacity-100"
          />

          {/* Mobile menu button */}
          <button
            className="text-white cursor-pointer lg:hidden p-2"
            onClick={() => setIsMobileMenu(!isMobileMenu)}
          >
            {isMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 tracking-wide">
            <Link className="text-white font-light text-sm">Tv Shows</Link>
            <Link className="text-white font-light text-sm">Home</Link>
            <Link className="text-white font-light text-sm">My List</Link>
            <Link className="text-white font-light text-sm whitespace-nowrap">
              Browse by Language
            </Link>
            <Link className="text-white font-light text-sm whitespace-nowrap">
              New & Popular
            </Link>
            <Link className="text-white font-light text-sm">Movies</Link>
          </nav>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center shrink-0">
          <div className="relative flex items-center gap-2 sm:gap-4">
            <button
              className="text-white cursor-pointer p-2 sm:p-3"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>

            {isSearchOpen && (
              <input
                type="text"
                placeholder="movie title..."
                className="absolute right-full mr-2 w-32 sm:w-48 bg-gray-400 p-1 transition-all rounded-md border-2 border-solid text-gray-600 text-sm focus:outline-0 focus:bg-black focus:text-white placeholder:text-white"
              />
            )}
          </div>

          <button className="text-white relative cursor-pointer p-2 sm:p-3">
            <Bell size={20} />
            <span className="absolute top-1 right-0 sm:top-1.5 sm:right-0.5 w-5 h-5 text-xs flex items-center justify-center rounded-full border-none text-white font-medium bg-red-700">
              10
            </span>
          </button>

          <div>
            <button
              onClick={() => setIsProfile(!isProfile)}
              className="flex items-center justify-center cursor-pointer p-2 sm:p-3 rounded-md text-white"
            >
              <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 bg-[#564d4d] rounded-md font-medium">
                <User2Icon size={18} />
              </div>
              <ChevronDown size={18} />
            </button>

            {isProfile && (
              <div className="flex flex-col absolute top-14 right-4 sm:right-10 p-2 tracking-wide min-w-40 bg-black border-solid border-2 border-gray-400 rounded-md z-50">
                <Link className="text-white p-2 cursor-pointer text-sm">
                  Account
                </Link>
                <Link className="text-white p-2 cursor-pointer text-sm">
                  Help Center
                </Link>
                <button className="text-white p-2 cursor-pointer border-t-2 w-full mt-3 text-sm">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {isMobileMenu && (
        <nav className="lg:hidden flex flex-col bg-black/95 backdrop-blur-md px-6 py-4 gap-3 border-t border-gray-800">
          <Link
            className="text-white font-light text-sm py-1"
            onClick={() => setIsMobileMenu(false)}
          >
            Tv Shows
          </Link>
          <Link
            className="text-white font-light text-sm py-1"
            onClick={() => setIsMobileMenu(false)}
          >
            Home
          </Link>
          <Link
            className="text-white font-light text-sm py-1"
            onClick={() => setIsMobileMenu(false)}
          >
            My List
          </Link>
          <Link
            className="text-white font-light text-sm py-1"
            onClick={() => setIsMobileMenu(false)}
          >
            Browse by Language
          </Link>
          <Link
            className="text-white font-light text-sm py-1"
            onClick={() => setIsMobileMenu(false)}
          >
            New & Popular
          </Link>
          <Link
            className="text-white font-light text-sm py-1"
            onClick={() => setIsMobileMenu(false)}
          >
            Movies
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
