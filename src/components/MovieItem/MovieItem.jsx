import React from 'react';
import './MovieItem.css';

const MovieItem = ({ imdbID, Title, Year, Poster, isDisabled, onAddToFavorites }) => {
    const handleAdd = () => {
        onAddToFavorites({ imdbID, title: Title, year: Year, poster: Poster });
    };

    return (
        <article className="movie-item">
            <img className="movie-item__poster" src={Poster} alt={Title} />
            <div className="movie-item__info">
                <h3 className="movie-item__title">{Title} </h3>
                <h4 className="movie-item__year"> <span>Year: </span>{Year} </h4>
                <button
                    type="button"
                    className="movie-item__add-btn"
                    onClick={handleAdd}
                    disabled={isDisabled}
                >Favorite
                </button>
            </div>
        </article>
    );
};

export default MovieItem;
