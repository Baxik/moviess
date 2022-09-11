const API_KEY = "a17cfc55-9bac-4e8e-b1cb-5d0c4ba85e01";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunoficcial.tech/api/v2.1/films/search-by-keyword?keyword=";


/*const API_KEY = "2c46288716a18fb7aadcc2a801f3fc6b";
const API_URL_POPULAR = "https://www.themoviedb.org/documentation/api"
const API_URL_SEARCH = ""*/

getMovies(API_URL_POPULAR);

async function getMovies(url){
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData =  await resp.json();
    showMovies(respData)
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    }else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}

function showMovies(data){
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = "";

    data.films.forEach(movie => {
        const movieEl = document.createElement("div")
        movieEl.classListadd("movie")
        movieEl.innerHTML = `
              <div class="movie__cover-inner">
        <img src="${movie.posterUrlPreview}"
         class="movie__cover"
         alt="${movie.nameRu}"
         />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            (genre) => `${genre.genre}`
        )}}</div>
        <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
      </div>
    </div>
        `;
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if(search.value){
        getMovies(apiSearchUrl);

        search.value = "";
    }

})