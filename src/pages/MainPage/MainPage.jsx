import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

function MainPage() {
    const [movies, setMovies] = useState([]);
    const [favs, setFavs] = useState([]);
    const [query, setQuery] = useState('');
    const [listDisable, setListDisable] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [favListName, setFavListName] = useState('');
    const [savedListId, setSavedListId] = useState('');

    useEffect(() => {
        fetchMovie('avengers');
    }, []);

    const fetchMovie = async (searchMovie) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=6e511c6a&s=${searchMovie}`);
            const data = await response.json();
            if (data.Response === 'True') {
                setMovies(data.Search.slice(0, 10));
                setErrMessage('');
            } else {
                setMovies([]);
                setErrMessage('Movie not found.');
            }
        } catch (err) {
            console.error('Error: movie list unavailable.', err);
              setMovies([]);
        }
    };

    const handleSearch = () => {
        if (query.trim() !== '') {
            fetchMovie(query.trim());
        }
    };

    const addToFavs = (movie) => {
        if (!favs.find((fav) => 
            fav.imdbID === movie.imdbID)) {
            setFavs([...favs, movie]);
        }
    };

    const deleteFromFavs = (id) => {
        setFavs(favs.filter((movie) =>
             movie.imdbID !== id));
    };

    const saveList = async () => {
        try {

            const res = await fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: favListName,
                    movies: favs.map(m => m.imdbID)
                })
            });

            const data = await res.json();
            setSavedListId(data.id);
            setListDisable(true);
        } catch (err) {
            console.error('Error: fetch was unsuccessful.', err);
        }
    };

    return (
        <div className="main-page">
            <Header />
            <div className="main-page__search-box">
                <SearchBox 
                    query={query}
                    setQuery={setQuery}
                    search={handleSearch}
                />
            </div>

        {errMessage && <div className="err-message">{errMessage}</div>}

        <main className="main-page__content">
            <section className="main-page__main-section">
                {!errMessage && (
                    <Movies
                    movies={movies}
                    favorites={favs}
                    onAddToFavorites={addToFavs}
                    disableList={listDisable}  
                    />
                )}
            </section>
        
        <aside className="main-page__favorites">
            <Favorites
            favorites={favs}
            onRemove={deleteFromFavs}
            disableList={listDisable}
            onLockList={saveList}
            favoriteListName={favListName}
            setFavoriteListName={setFavListName}
            savedListId={savedListId}
            />
            </aside>
        </main>
    </div>
    );
}

export default MainPage;