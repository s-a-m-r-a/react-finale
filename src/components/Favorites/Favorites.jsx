import React from 'react';
import './Favorites.css';
import { Link } from 'react-router-dom';

function Favorites({ 
  favorites, 
  onRemove, 
  disableList, 
  onLockList, 
  favoriteListName, 
  setFavoriteListName, 
  savedListId 
}) {
  const isAddDisabled = !favoriteListName.trim() || favorites.length === 0;
  const isGotoDisabled = !disableList;
  return (
    <div className="favorites">
      <ul className="favorites__list">
        {favorites.map((movie) => (
          <li key={movie.imdbID}>
            {movie.title}
            {!disableList && (
              <button onClick={() => onRemove(movie.imdbID)}>x</button>
            )}
          </li>
        ))}
      </ul>
      
      <input
        type="text"
        name="list"
        className="favorites__name"
        value={favoriteListName}
        onChange={(e) => setFavoriteListName(e.target.value)}
        disabled={disableList}
        required
      />
<div className="favorites__buttons">
        <button
          className="favorites__save"
          onClick={onLockList}
          disabled={isAddDisabled || disableList}
        >
          Add Favorite List
        </button>

        <Link to={`/list/${savedListId}`} className="favorites__link">
          <button
            className="favorites__goto"
            disabled={isGotoDisabled}
          >
            Favorites List
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Favorites;