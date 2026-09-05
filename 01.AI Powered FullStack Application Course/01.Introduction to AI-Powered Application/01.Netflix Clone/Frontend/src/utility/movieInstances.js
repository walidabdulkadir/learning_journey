import axios from "axios";

const movieInstances = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export { movieInstances };

// https://api.themoviedb.org/3/discover/movie?api_key=06070c94895643e7d995dd3e010e4a3a&with_genres=99
