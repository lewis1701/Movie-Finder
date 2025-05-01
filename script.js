const baseUrl = "https://api.themoviedb.org/3";
const api_key = "86fe9b3bf7a3da7d196a0d89f1815b69";
const searchBtn = document.getElementById("search-button")
async function searchMovies() {
    const searchInput = document.getElementById("search-input")
    const query = searchInput.value;
    const endpoint = "/search/movie"
    const parameters = `?api_key=${api_key}&query=${query}`
    const urlToSearch = `${baseUrl}${endpoint}${parameters}`
    try {
        const response = await fetch(urlToSearch)
        const jsonResponse = await response.json()
        displayMovies(jsonResponse.results);
    }

    catch(error) {
        console.log(error)
    }
    
}


function displayMovies(movieArray) {
    const resultsContainer = document.getElementById("movie-results")
    resultsContainer.innerHTML = "";
    movieArray.forEach(movie => {
        const movieCard = document.createElement("div")
        movieCard.classList.add("movie-card")
        const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : './placeholder.jpg';
        movieCard.innerHTML = `
        <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-release">Release: ${movie.release_date || 'Unknown'}</p>
        <p class="movie-overview">${movie.overview || 'No description available.'}</p>
        `;
        resultsContainer.appendChild(movieCard);
    })
}

searchBtn.addEventListener("click", searchMovies)