const baseUrl = "https://api.themoviedb.org/3";
const api_key = "86fe9b3bf7a3da7d196a0d89f1815b69";
const searchBtn = document.getElementById("search-button");
const selectYear = document.getElementById("year");
const selectGenre = document.getElementById("genre");
const nextPage = document.getElementById("nextPageBtn")
let pageNumber = 1;

async function searchMovies() {
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value.trim();
    const movieYear = selectYear.value;
    const selectedGenreName = selectGenre.value;

    let genreId = '';
    let endpoint = "/search/movie";
    let parameters = `?api_key=${api_key}&page=${pageNumber}`;

    // Map genre name to TMDb genre ID
    switch (selectedGenreName) {
        case 'Action': genreId = 28; break;
        case 'Adventure': genreId = 12; break;
        case 'Animation': genreId = 16; break;
        case 'Comedy': genreId = 35; break;
        case 'Crime': genreId = 80; break;
        case 'Documentary': genreId = 99; break;
        case 'Drama': genreId = 18; break;
        case 'Family': genreId = 10751; break;
        case 'Fantasy': genreId = 14; break;
        case 'History': genreId = 36; break;
        case 'Horror': genreId = 27; break;
        case 'Music': genreId = 10402; break;
        case 'Mystery': genreId = 9648; break;
        case 'Romance': genreId = 10749; break;
        case 'Science Fiction': genreId = 878; break;
        case 'TV Movie': genreId = 10770; break;
        case 'Thriller': genreId = 53; break;
        case 'War': genreId = 10752; break;
        case 'Western': genreId = 37; break;
        default: genreId = '';
    }

    // Use /discover/movie if genre filter is applied
    if (genreId) {
        endpoint = "/discover/movie";
        if (movieYear) parameters += `&primary_release_year=${movieYear}`;
        parameters += `&with_genres=${genreId}`;
    } else {
        // Use /search/movie if no genre filtering
        endpoint = "/search/movie";
        if (query) parameters += `&query=${encodeURIComponent(query)}`;
        if (movieYear) parameters += `&year=${movieYear}`;
    }

    const urlToSearch = `${baseUrl}${endpoint}${parameters}`;
    console.log("Attempting to fetch:", urlToSearch);
    try {
        const response = await fetch(urlToSearch);
        const jsonResponse = await response.json();
        displayMovies(jsonResponse.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movieArray) {
    const resultsContainer = document.getElementById("movie-results");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (!movieArray || movieArray.length === 0) {
        resultsContainer.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movieArray.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

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
    });
}

// Event listener for search button
searchBtn.addEventListener("click", searchMovies);


// Populate year dropdown
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1980; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    selectYear.appendChild(option);
}

// Event listener for year dropdown
selectYear.addEventListener("change", () => {
    if (selectYear.value) {
        searchMovies();
    }
});
// Event listener for genre dropdown
selectGenre.addEventListener("change", () => {
    if (selectGenre.value) {
        searchMovies();
    }
});

nextPage.addEventListener("click", () => {
    pageNumber+=1
    searchMovies()
})