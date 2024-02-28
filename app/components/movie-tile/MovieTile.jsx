import PropTypes from 'prop-types';
import React from 'react';
import './MovieTile.css';
import ContextMenu from './ContextMenu'
import Link from 'next/link'

const MovieTile = ({movieInfo, searchParams}) => {
    const currentSearchParams = new URLSearchParams(searchParams);

    const queryParams = currentSearchParams.toString();


    const {imageUrl, name, releaseYear, genres} = movieInfo;

    return (
        <div className="container" data-testid="movie-list-container">
            <Link href={queryParams ? `/${movieInfo.id}?${queryParams}` : `/${movieInfo.id}`}>
                <div className="container">
                    <div className="movie-info">
                        <div className="movie-image">
                            <img src={imageUrl} alt={name} width={323} height={455}/>
                        </div>
                        <div className="movie-details">
                            <div className="movie-titleLine">
                                <h3 className="movie-title" data-testid="movie-title">{name}</h3>
                                <p className="movie-releaseYear">{releaseYear}</p>
                            </div>
                            <p className="movie-genres" data-testid="movie-genre">{`${genres.join(', ')}`}</p>
                        </div>
                        <ContextMenu movieId={movieInfo.id} queryParams={queryParams}/>
                    </div>
                </div>
            </Link>
        </div>
    );
};

MovieTile.propTypes = {
    movieInfo: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onTileClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
};

export default MovieTile;
