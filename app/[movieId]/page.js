import React from 'react';
import MovieListPage from "@/app/components/movie-list-page/MovieListPage";
import axios from 'axios';
import Link from 'next/link'
import './MovieDetails.css';
import Image from 'next/image'
import searchIcon from '@/public/image/Close-Button.svg'

const controller = new AbortController();

const MoviePage = async ({params, searchParams}) => {
    const currentSearchParams = new URLSearchParams(searchParams);

    const queryParams = currentSearchParams.toString();

    const movieId =params?.movieId

    const movieDetailInfo = await getMovie({movieId})
    const {imageUrl, name, releaseYear, rating, duration, description} = movieDetailInfo || {};
    return <>
        <div className="movie-details-container" data-testid="movie-details">
            <div className="movie-header">
                <p>Netflix</p>
                <Link href={queryParams ?`/?${queryParams}` : '/'}>
                    <Image src={searchIcon} className="close-button"/>
                </Link>
            </div>

            {/* {change with picture} */}
            <div className="movie-details-info">
                <img src={imageUrl} alt={name} width='322' height='486'/>
                <div className="movie-details">
                    <h3>{name}</h3>
                    <div>
                        {/* <p>{name}</p> */}
                        <p> {rating}</p>
                    </div>
                    {/* <p>{`${genres.join(', ')}`}</p> */}

                    <div>
                        <p>{releaseYear}</p>
                        <p>{duration}</p>
                    </div>

                    <div>
                        <p>{description}</p>
                    </div>
                </div>
            </div>

        </div>

        <MovieListPage urlPrefix={`/${movieId}`} searchParams={searchParams}/>

    </>
}

export default MoviePage

const getMovie = async ({movieId}) => {
    controller.abort();
    return axios.get(`http://localhost:4000/movies/${movieId}`)
        .then(function (response) {
            response = response?.data;
            if (response) {
                const imageUrl = response.poster_path;
                const name = response.title;
                const releaseDate = response.release_date;
                const rating = response.vote_average;
                const genres = response.genres;
                const runtime = response.runtime;
                const description = response.overview;
                const preparedObject = {
                    imageUrl: imageUrl ? imageUrl : 'https://picsum.photos/seed/picsum/200/300',
                    name: name,
                    releaseYear: new Date(releaseDate).getFullYear(),
                    releaseDate: releaseDate,
                    rating: rating,
                    genres: genres,
                    runtime: runtime,
                    description: description,
                    id: response?.id
                };
                return preparedObject;
            }
        })
        .catch(function (error) {
            console.log(error);
            return {}
        })
}
