import React from 'react';
import './SearchBox.css';

function SearchBox({ query, setQuery, search }) {
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleButtonClick = () => {
        search();
    };

    return (
        <div className="search-box">
            <input
                type="text"
                name="searchbar"
                className="search-box__input"
                placeholder="Search.."
                value={query}
                onChange={handleInputChange}
            />
            <button className="search-box__btn" onClick={handleButtonClick}>
                Search
            </button>
        </div>
    );
}

export default SearchBox;