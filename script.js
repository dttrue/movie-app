const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=719dab79d5fd1dcca05a06cc5540da67&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=719dab79d5fd1dcca05a06cc5540da67&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
fetchMovies(API_URL);

async function fetchMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    displayMovies(data.results);  
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

// Function to display movies
function displayMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = ` 
      <div class="movie">
          <img src="${IMG_PATH + poster_path}" alt="Poster of ${title}">
          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
              <h3>Overview</h3>
              ${overview}
          </div>
      </div>`;

    main.appendChild(movieEl);
  });
}

// Get class by rating
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    fetchMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
