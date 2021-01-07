import axios from 'axios';
import {
    GET_NOW_PLAYING_MOVIES,
    GET_GENRE,
    GET_MOVIES,
    GET_TRENDING_PERSON,
    GET_TOP_RATED_MOVIES,
    GET_MOVIE_DETAILS,
    GET_MOVIE_VIDEO,
    GET_CAST,
    GET_SIMILAR_MOVIES
} from "./types"
const apiKey = `04c35731a5ee918f014970082a0088b1`;
const url = `https://api.themoviedb.org/3`;
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;
const posterUrl = "https://image.tmdb.org/t/p/original";

export const getNowPlayingMovies = () => dispatch => {
    axios
        .get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        .then(res => {
            const modifiedData = res.data['results'].map((val) => ({
                id: val['id'],
                backPoster: posterUrl + val['backdrop_path'],
                popularity: val['popularity'],
                title: val['title'],
                poster: posterUrl + val['poster_path'],
                overview: val['overview'],
                rating: val['vote_average']
            }))

            dispatch({
                type: GET_NOW_PLAYING_MOVIES,
                payload: modifiedData
            })
        })
        .catch(err => { throw err; });
};

export const getGenre = () => dispatch => {
    axios
        .get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        .then(res =>
            dispatch({
                type: GET_GENRE,
                payload: res.data
            }))
        .catch(err => { throw err; });
};

export const getMovieByGenre = (genre_id) => dispatch => {
    axios
        .get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genre_id
            }
        })
        .then(res => {
            const modifiedData = res.data['results'].map((val) => ({
                id: val['id'],
                backPoster: posterUrl + val['backdrop_path'],
                popularity: val['popularity'],
                title: val['title'],
                poster: posterUrl + val['poster_path'],
                overview: val['overview'],
                rating: val['vote_average']
            }))
            dispatch({
                type: GET_MOVIES,
                payload: modifiedData
            })
        })
        .catch(err => { throw err; });
};

export const getPersons = () => dispatch => {
    axios
        .get(personUrl, {
            params: {
                api_key: apiKey,
            }
        })
        .then(res => {
            const modifiedData = res.data['results'].map((val) => ({
                id: val['id'],
                popularity: val['popularity'],
                name: val['name'],
                profileImg: `https://image.tmdb.org/t/p/w200${val['profile_path']}`,
                known: val['known_for_department'],
            }))
            dispatch({
                type: GET_TRENDING_PERSON,
                payload: modifiedData
            })
        })
        .catch(err => { throw err; });
};

export const getTopratedMovie = () => dispatch => {
    axios
        .get(topratedUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        .then(res => {
            const movieList = res.data['results'].map((val) => ({
                id: val['id'],
                backPoster: posterUrl + val['backdrop_path'],
                popularity: val['popularity'],
                title: val['title'],
                poster: posterUrl + val['poster_path'],
                overview: val['overview'],
                rating: val['vote_average']
            }))
            dispatch({
                type: GET_TOP_RATED_MOVIES,
                payload: movieList
            })
        })
        .catch(err => { throw err; });
};

export const getMovieDetail = (id) => dispatch => {
    axios
        .get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
            }
        })
        .then(res =>
            dispatch({
                type: GET_MOVIE_DETAILS,
                payload: res.data
            }))
        .catch(err => { throw err; });
};

export const getMovieVideos = (id) => dispatch => {
    axios
        .get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey,
            }
        })
        .then(res =>
            dispatch({
                type: GET_MOVIE_VIDEO,
                payload: res.data.results[0]
            }))
        .catch(err => { throw err; });
};

export const getCasts = (id) => dispatch => {
    axios
        .get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
            }
        })
        .then(res => {
            const castList = res.data.cast.map((val) => ({
                id: val.cast_id,
                character: val.character,
                name: val.name,
                profileImg: `https://image.tmdb.org/t/p/w200${val['profile_path']}`,
                known: val.known_for_department
            }))
            dispatch({
                type: GET_CAST,
                payload: castList
            })
        }

        )
        .catch(err => { throw err; });
};

export const getSimilarMovie = (id) => dispatch => {
    axios
        .get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        .then(res => {
            const movieList = res.data['results'].map((val) => ({
                id: val['id'],
                backPoster: posterUrl + val['backdrop_path'],
                popularity: val['popularity'],
                title: val['title'],
                poster: posterUrl + val['poster_path'],
                overview: val['overview'],
                rating: val['vote_average']
            }))
            dispatch({
                type: GET_SIMILAR_MOVIES,
                payload: movieList
            })
        })
        .catch(err => { throw err; });
};