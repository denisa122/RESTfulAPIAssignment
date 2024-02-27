// Retrieve movies from the API and display them on the front page
async function getMovies() {
    try {
        const response = await fetch('/api/movies/');
        const movies = await response.json();

        const moviesContainer = document.getElementById('movies');
        // Clear previous content
        moviesContainer.innerHTML = ''; 

        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
            <h2>${movie.title}</h2>
            <p>Genre: ${movie.genre}</p>
            <p>Description: ${movie.description}</p>
            <p>Director: ${movie.director}</p>
            <p>Year of release: ${movie.yearOfRelease}</p>
            `;

            moviesContainer.appendChild(movieElement);
        });
    } catch (error) {
        console.error('Error fetching movies: ', error);
    }
}

// Call getMovies when the page loads
document.addEventListener('DOMContentLoaded', getMovies);