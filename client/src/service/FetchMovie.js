import axios from 'axios';
export {
    // all movie related query
    getNowPlayingMovies,
    getGenre,
    getMovieByGenre,
    getPersons,
    getTopratedMovie,
    //movie details related query
    getMovieDetail,
    getCasts,
    getSimilarMovie,
    getMovieVideos,
    getWatchList,
    deleteWatchList
};

const apiKey = `04c35731a5ee918f014970082a0088b1`;
const url = `https://api.themoviedb.org/3`;
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;
const posterUrl = "https://image.tmdb.org/t/p/original";
const tokenConfig = () => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    // Header
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}

///// ALL MOVIES DETAILS //////

function getNowPlayingMovies() {
    return axios
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
            return modifiedData;
        })
        .catch(err => { throw err; });
}


function getGenre() {
    return axios
        .get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        .then(res => {
            return res.data;
        })
        .catch(err => { throw err; });
}

function getMovieByGenre(genreId) {
    return axios
        .get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genreId
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
            return movieList;
        })
        .catch(err => { throw err; });
}

function getPersons() {
    return axios
        .get(personUrl, {
            params: {
                api_key: apiKey,
            }
        })
        .then(res => {
            const trendingPersons = res.data['results'].map((val) => ({
                id: val['id'],
                popularity: val['popularity'],
                name: val['name'],
                profileImg: `https://image.tmdb.org/t/p/w200${val['profile_path']}`,
                known: val['known_for_department'],
            }))
            return trendingPersons;
        })
        .catch(err => { throw err; });
}

function getTopratedMovie() {
    return axios
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
            }));
            console.log(movieList)
            return movieList;
        })
        .catch(err => { throw err; });
}


///// MOVIE DETAILS //////
function getMovieDetail(id) {
    return axios
        .get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
            }
        })
        .then(res => {
            return res.data;
        })
        .catch(err => { throw err; });
}

function getCasts(id) {
    return axios
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
            return castList;
        }

        )
        .catch(err => { throw err; });
};

function getSimilarMovie(id) {
    return axios
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
            return movieList;
        })
        .catch(err => { throw err; });
};
function getMovieVideos(id) {
    return axios
        .get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey,
            }
        })
        .then(res => {
            return res.data.results[0];
        })
        .catch(err => { throw err; });
};

function getWatchList() {
    const id = "5fe8af5babffc409d0d31fb4";
    return axios
        .get(`/api/movies/${id}`, tokenConfig())
        .then(res => {
            return res.data;
        })
        .catch(err => { throw err; });

};
function deleteWatchList() {
    const id = "5fe8af5babffc409d0d31fb4";
    axios
        .delete(`/api/movies/${id}`, tokenConfig())
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));

};
