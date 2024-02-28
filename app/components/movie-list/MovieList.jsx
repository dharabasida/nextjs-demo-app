// MovieList.js
import React from 'react';
import MovieTile from '../movie-tile/MovieTile';
import './MovieList.css'

function MovieList({searchParams, movies}) {
    return (
        <div className="movie-list-container" data-testid="movie-list">
            <div className="movie-container">
                {movies.map((movie) => (
                    <MovieTile
                        searchParams={searchParams}
                        key={movie.id}
                        movieInfo={movie}
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieList;
