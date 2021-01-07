import React, { Fragment, useEffect, useState } from 'react';
import { getNowPlayingMovies, getGenre, getMovieByGenre, getPersons, getTopratedMovie } from "../service/FetchMovie";
import AppNavbar from './AppNavbar';
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import ReactStars from "react-star-rating-component"
import FooterInfo from './MyComponents/FooterInfo';
import Ellipsis from './MyComponents/loading';
const config = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
};
const movieConfig = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};
function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [movieList, setmMovieList] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isShow, setIsShow] = useState(4);
    const [isNotShow, setIsNotShow] = useState(0);

    const getMovieBySelectedGenre = (id) => {
        getMovieByGenre(id).then((res) => {
            setmMovieList(res)
        });
    }
    useEffect(() => {
        const fetchAPI = () => {
            setIsLoading(true)
            const promise1 = new Promise((resolve, reject) => {
                return getNowPlayingMovies().then((res) => {
                    resolve(res);
                });
            });
            const promise2 = new Promise((resolve, reject) => {
                return getGenre().then((res) => {
                    resolve(res);
                });
            });
            const promise3 = new Promise((resolve, reject) => {
                return getMovieByGenre().then((res) => {
                    resolve(res);
                });
            });
            const promise4 = new Promise((resolve, reject) => {
                return getPersons().then((res) => {
                    resolve(res);
                });
            });
            const promise5 = new Promise((resolve, reject) => {
                return getTopratedMovie().then((res) => {
                    resolve(res);
                });
            });
            Promise.all([promise1, promise2, promise3, promise4, promise5]).then((values) => {
                setNowPlaying(values[0])
                setGenreList(values[1])
                setmMovieList(values[2])
                setPersons(values[3])
                setTopRatedMovies(values[4])
                setIsLoading(false)

            })
        }

        fetchAPI()
    }, [])
    document.title = `Movies | GoMovie`;

    return (
        <Fragment>
            <AppNavbar />
            {
                isLoading ?
                    <div className="loading" >
                        <Ellipsis color="#fff" />
                    </div>
                    : <div className="container">
                        <div className="row mt-2">
                            <div className="col">
                                <Slider {...config}>
                                    {
                                        nowPlaying.slice(0, 5).map((val, index) => {
                                            return (
                                                <div style={{ width: "100%", height: 500 }} key={index}>
                                                    <div>
                                                        <img style={{ height: "600px", width: "100%" }} src={val.backPoster} alt={"go-movie" + val.title} />
                                                    </div>
                                                    <div style={{ textAlign: "center", marginTop: -350 }} >
                                                        <i className="fa fa-play-circle" style={{ fontSize: 95, color: "rgb(229, 9, 20)" }} />
                                                    </div>
                                                    <div style={{ textAlign: "center", fontSize: 35, marginTop: 90, padding: 35 }} >
                                                        {val.title}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <ul className="list-inline">
                                    {
                                        genreList.length === 0 ? '' :
                                            genreList.genres.map((val, index) => {
                                                return (
                                                    <li className="list-inline-item" key={index}>
                                                        <button type="button" className="btn btn-outline-info" onClick={() => getMovieBySelectedGenre(val.id)}>
                                                            {val.name}
                                                        </button>
                                                    </li>
                                                )
                                            })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <Slider {...movieConfig}>
                                    {
                                        movieList.map((val, index) => {
                                            return (
                                                <div key={index} >
                                                    <div className="card" style={{ margin: 5 }}>
                                                        <Link to={`/movie/${val.id}`}>
                                                            <img className="img-fluid" src={val.poster} alt={"go-movie" + val.title} />
                                                        </Link>
                                                    </div>
                                                    <div className="mt-3" style={{ margin: 5 }}>
                                                        <p style={{ fontWeight: "bold" }}>{val.title}</p>
                                                        <p>Rated: {val.rating}</p>
                                                        <ReactStars starCount={val.rating} value={val.rating} activeColor={"#fc10f"} inactiveColor={'#ddd'} name={val.title} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>

                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                                    TRENDING PERSONS ON THIS WEEK
                                     </p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <Slider {...movieConfig}>
                                    {
                                        persons.map((val, index) => {
                                            return (
                                                <div className="text-center" key={index}>
                                                    <img className="img-fluid rounded-circle mx-auto d-block" src={val.profileImg} alt={"go-movie" + val.name} />
                                                    <p className="font-weight-bold">{val.name}</p>
                                                    <p className="font-weight-light " style={{ color: "#5a606b" }}>Trending for {val.known}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                                    TOP RATED MOVIES
                                </p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <Slider {...movieConfig}>
                                    {
                                        topRatedMovies.map((val, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="card" style={{ margin: 5 }}>
                                                        <Link to={`/movie/${val.id}`}>
                                                            <img className="img-fluid" src={val.poster} alt={"go-movie" + val.title} />
                                                        </Link>
                                                    </div>
                                                    <div className="mt-3" style={{ margin: 5 }}>
                                                        <p style={{ fontWeight: "bold" }}>{val.title}</p>
                                                        <p>Rated: {val.rating}</p>
                                                        <ReactStars starCount={val.rating} value={val.rating} activeColor={"#fc10f"} inactiveColor={'#ddd'} name={val.title} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                        <FooterInfo />
                    </div>
            }

        </Fragment>
    );
}

export default Home;