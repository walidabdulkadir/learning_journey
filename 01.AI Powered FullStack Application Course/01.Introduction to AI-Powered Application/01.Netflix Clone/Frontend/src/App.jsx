import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SlideShow from "./components/SlideShow";
import { BrowserRouter } from "react-router-dom";
import { movieInstances } from "./utility/movieInstances";
import requests from "./utility/requestUrl";

function App() {
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          trendingRes,
          netflixRes,
          topRatedRes,
          actionRes,
          comedyRes,
          horrorRes,
          romanceRes,
          docRes,
        ] = await Promise.all([
          movieInstances.get(requests.fetchTrending),
          movieInstances.get(requests.fetchNetflixOriginals),
          movieInstances.get(requests.fetchTopRatedMovies),
          movieInstances.get(requests.fetchActionMovies),
          movieInstances.get(requests.fetchComedyMovies),
          movieInstances.get(requests.fetchHorrorMovies),
          movieInstances.get(requests.fetchRomanceMovies),
          movieInstances.get(requests.fetchDocumentaries),
        ]);

        setMovies({
          trending: trendingRes.data.results,
          netflixOriginals: netflixRes.data.results,
          topRated: topRatedRes.data.results,
          action: actionRes.data.results,
          comedy: comedyRes.data.results,
          horror: horrorRes.data.results,
          romance: romanceRes.data.results,
          documentaries: docRes.data.results,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Banner />
        <SlideShow title="Trending" movies={movies.trending} />
        <SlideShow title="Action" movies={movies.action} />
        <SlideShow title="Top Rated" movies={movies.topRated} />
        <SlideShow title="Comedy" movies={movies.comedy} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
