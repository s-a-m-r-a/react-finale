import React from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

const Movies = ({ movies, favorites, onAddToFavorites, disableList}) => {
    return (
        <ul className="movies">
            {movies.map((movie) => (
                <li className="movies__item" key={movie.imdbID}>
                    <MovieItem
                    {...movie}
                    isFavorite={!!favorites.find(f => f.imdbID === movie.imdbID)}
                    isDisabled={
                        !!favorites.find(f => f.imdbID === movie.imdbID) || disableList
                    }
                    onAddToFavorites={onAddToFavorites}
/>
                </li>
            ))}
        </ul>
    );
};

export default Movies;