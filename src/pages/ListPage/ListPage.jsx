import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './ListPage.css';

const ListPage = () => {
    const { id } = useParams();
    const [listTitle, setListTitle] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const res = await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`);
                const data = await res.json();
                setListTitle(data.title);

                const movieDetails = await Promise.all(
                    data.movies.map(async (imdbs) => {
                        const res = await fetch(`https://www.omdbapi.com/?apikey=6e511c6a&i=${imdbs}`);
                        return await res.json();
                    })
                );
                setMovies(movieDetails);
            } catch (err) {
                console.error('Error: fetching was not successful.', err);
            }
        };

        fetchList();
    }, [id]);

    return (
        <>
        <Header />
        <div className="list-page">
            <ul className="list-page__list">
                <h1 className="list-page__title">{listTitle}</h1>
                {movies.map((movie) => (
                    <li key={movie.imdbID}>
                        <span>{movie.Title}</span>
                       <a
                            href={`https://www.imdb.com/title/${movie.imdbID}/`}
                            className="list-page__imdb-btn"
                            target="_blank"
                        >
                            IMDb
                        </a>
                    </li>
                ))}
                <Link to="/" className="list-page__goback-btn">
                Movies
            </Link>
            </ul>
        </div>
    </>
    );
};

export default ListPage;
