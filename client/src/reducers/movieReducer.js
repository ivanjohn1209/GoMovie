import {
    GET_NOW_PLAYING_MOVIES,
    GET_GENRE, GET_MOVIES,
    GET_TRENDING_PERSON,
    GET_TOP_RATED_MOVIES,
    GET_MOVIE_DETAILS,
    GET_MOVIE_VIDEO,
    GET_CAST,
    GET_SIMILAR_MOVIES
} from "../actions/types";

const initialState = {
    nowPlayingMovie: [],
    genreList: [],
    movieList: [],
    trendingPerson: [],
    topRatedMovies: [],
    movieDetail: [],
    movieVideo: [],
    movieCast: [],
    similarMovies: []
}

function movieReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOW_PLAYING_MOVIES:
            return {
                ...state,
                nowPlayingMovie: action.payload,
            };
        case GET_GENRE:
            return {
                ...state,
                genreList: action.payload,
            };
        case GET_MOVIES:
            return {
                ...state,
                movieList: action.payload,
            };
        case GET_TRENDING_PERSON:
            return {
                ...state,
                trendingPerson: action.payload,
            };
        case GET_TOP_RATED_MOVIES:
            return {
                ...state,
                topRatedMovies: action.payload,
            };
        case GET_MOVIE_DETAILS:
            return {
                ...state,
                movieDetail: action.payload,
            };
        case GET_MOVIE_VIDEO:
            return {
                ...state,
                movieVideo: action.payload,
            };
        case GET_CAST:
            return {
                ...state,
                movieCast: action.payload,
            };
        case GET_SIMILAR_MOVIES:
            return {
                ...state,
                similarMovies: action.payload,
            };
        default:
            return state;
    }









}

export default movieReducer;