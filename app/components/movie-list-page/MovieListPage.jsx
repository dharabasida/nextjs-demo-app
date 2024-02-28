import React, {useCallback} from 'react';
import GenreSelect from '@/app/components/genre-select/GenreSelect';
import SortControl from '@/app/components/sort-control/SortControl';
import ModalDialog from '@/app/components/modal-dialog/ModalDialog';
import MovieList from '../movie-list/MovieList';
import axios from 'axios';

const controller = new AbortController();

const MovieListPage = async ({searchParams,urlPrefix='/'}) => {

    const selectedGenre = searchParams?.genre || 'ALL'
    const sortCriterion = searchParams?.sort || 'release_date'
    const searchQuery = searchParams?.search || '';


    // const [visible, setvisible] = useState(false);
    // const [modalComponent, setModalComponent] = useState({title: '', children: null});
    // const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') ? searchParams.get('genre') : 'ALL');
    // const [movieList, setMovieList] = useState([]);
    const movieList = await getMovies({sortCriterion, searchQuery, selectedGenre})


    return (
        <div>
            {/*{*/}
            {/*    visible && <ModalDialog title={modalComponent.title} onClose={() => setvisible(false)}>*/}
            {/*        {modalComponent.children}*/}
            {/*    </ModalDialog>*/}
            {/*}*/}
            <GenreSelect urlPrefix={urlPrefix}/>
            <SortControl urlPrefix={urlPrefix}/>
            {movieList?.length > 0 &&
                <MovieList
                    movies={movieList}
                    searchParams={searchParams}
                    // deleteMovieHandler={deleteMovieHandler}
                    // handleSelectedMovie={handleSelectedMovie}
                />}

            {movieList?.length == 0 && <div className="no-data">No Data Found</div>}


        </div>
    )


}

const getMovies = async ({sortCriterion, searchQuery, selectedGenre}) => {
    controller.abort();
    const params = {
        sortBy: sortCriterion,
        sortOrder: 'asc',
        search: searchQuery,
        searchBy: 'title',
        filter: selectedGenre == 'ALL' ? '' : selectedGenre,
        offset: 0,
        limit: 12
    };
    return axios.get('http://localhost:4000/movies', {params})
        .then(function (response) {
            if (null != response) {
                const mapMovieList = response?.data?.data?.map(movie => {
                    const imageUrl = movie.poster_path;
                    const name = movie.title;
                    const releaseDate = movie.release_date;
                    const rating = movie.vote_average;
                    const genres = movie.genres;
                    const runtime = movie.runtime;
                    const description = movie.overview;
                    const preparedObject = {
                        imageUrl: imageUrl ? imageUrl : 'https://picsum.photos/seed/picsum/200/300',
                        name: name,
                        releaseYear: new Date(releaseDate).getFullYear(),
                        releaseDate: releaseDate,
                        rating: rating,
                        genres: genres,
                        runtime: runtime,
                        description: description,
                        id: movie?.id
                    };
                    return preparedObject;
                });
                return mapMovieList;
            }
        })
        .catch(function (error) {
            console.log(error);
            return []
        })
}

export default MovieListPage;