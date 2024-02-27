// Retrieve movies from the API and display them on the front page
async function getMovies() {
    try {
        const response = await fetch('/api/movies/');
        const movies = await response.json();

        const moviesContainer = document.getElementById('movies');
        if (!moviesContainer) {
            console.error('Movies container not found');
            return;
        }
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

// Handle form submission for creating a new movie
async function createMovie(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const genre = formData.get('genre');
    const description = formData.get('description');
    const director = formData.get('director');
    const yearOfRelease = formData.get('yearOfRelease');
    const cast = formData.get('cast').split(','); // Split cast input into an array

    try {
        // Retrieve authentication token from local storage
        const authToken = localStorage.getItem('authToken');

        // Log authToken to the console
        console.log('Authentication Token:', authToken);

        const response = await fetch('/api/movies/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ title, genre, description, director, yearOfRelease, cast })
        });

        if (response.ok) {
            const data = await response.json();

            alert("Movie created successfully!");
            window.location.href = "/index.html"; 

        } else {
            console.error('Failed to create movie: ', response.statusText);
        }
    } catch (error) {
        console.error('Error creating movie: ', error);
    }
}

// Handle form submission for logging in
async function loginUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response Data:', data);
            const authToken = data.data.authToken;
            
            // Save the authentication token to local storage
            localStorage.setItem('authToken', authToken);


            // Redirect the user to the index page
            window.location.href = '/index.html';
        } else {
            const errorMessage = await response.text();
            document.getElementById('error').textContent = errorMessage;
        }
    } catch (error) {
        console.error('Error logging in: ', error);
    }
}

// Call getMovies when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    if (currentPage === '/index.html' || currentPage === '/') {
        // Load movies only on index.html
        getMovies();
    } else if (currentPage === '/login.html') {
        // Attach event listener to the login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', loginUser);
        } else {
            console.error('Login form not found');
        }
    } else if (currentPage === '/create_movie.html') {
        // Attach event listener to the create movie form
        const createMovieForm = document.getElementById('createMovieForm');
        if (createMovieForm) {
            createMovieForm.addEventListener('submit', createMovie);
        } else {
            console.error('Create movie form not found');
        }
    }
});