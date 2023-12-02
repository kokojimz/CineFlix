import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
import MovieDetailsModal from "./MovieDetailsModal"; 

const API_URL = "http://www.omdbapi.com?apikey=541d16ec";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
    
            setMovies(Array.isArray(data.Search) ? data.Search : []);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]);
        }
    };
    

    const fetchMovieDetails = async (id) => {
        try {
            const response = await fetch(`${API_URL}&i=${id}`);
            const data = await response.json();
    
            if (data && data.imdbID) { 
                setSelectedMovie(data);
            } else {
                throw new Error('Invalid movie data');
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };    

    const openModal = async (movie) => {
        await fetchMovieDetails(movie.imdbID);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        searchMovies(searchValue);
    }, [searchValue]);

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchValue);
        }
    };

    return (
        <div className="app">
            <h1>CineFlix</h1>
            <div className="search">
                <input 
                    placeholder="Search movies..." 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleEnter}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchValue)}
                />
            </div>
            {movies.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            onClick={() => openModal(movie)}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
            <MovieDetailsModal 
                movie={selectedMovie} 
                closeModal={closeModal} 
                isModalOpen={isModalOpen} 
            />
        </div>
    );
}

export default App;