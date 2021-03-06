import React, { useEffect, useState, Fragment } from 'react';
import {
    getMovieDetail,
    getCasts,
    getSimilarMovie,
    getMovieVideos,
    getWatchList,
} from "../service/FetchMovie"
import ReactStars from "react-star-rating-component"
import FooterInfo from './MyComponents/FooterInfo';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactPlayer from "react-player"
import Ellipsis from './MyComponents/loading';
import axios from 'axios';
import AppNavbar from './AppNavbar';


function Moviedetail(props) {
    const params = props.match.params
    const [detail, setDetail] = useState([]);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [movieVideo, setMovieVideo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const tokenConfig = () => {
        const token = localStorage.getItem('token');
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
    const addToWatchList = () => {
        const movieData = {
            id: "5fe8af5babffc409d0d31fb4",
            movieId: params.id,
            backPoster: detail.backdrop_path,
            popularity: detail.popularity,
            title: detail.title,
            poster: detail.poster_path,
            overview: detail.overview,
            rating: detail.vote_average,

        }
        const body = JSON.stringify(movieData)
        axios
            .post('/api/movies', body, tokenConfig())
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        const fetchAPI = () => {
            setIsLoading(true)
            getWatchList()
            const promise1 = new Promise((resolve, reject) => {
                return getMovieDetail(params.id).then((res) => {
                    resolve(res);
                });
            });
            const promise2 = new Promise((resolve, reject) => {
                return getCasts(params.id).then((res) => {
                    resolve(res);
                });
            });
            const promise3 = new Promise((resolve, reject) => {
                return getSimilarMovie(params.id).then((res) => {
                    resolve(res);
                });
            });
            const promise4 = new Promise((resolve, reject) => {
                return getMovieVideos(params.id).then((res) => {
                    resolve(res);
                });
            });
            Promise.all([promise1, promise2, promise3, promise4]).then((values) => {
                setDetail(values[0])
                setCast(values[1])
                setSimilarMovies(values[2])
                setMovieVideo(values[3])
                setIsLoading(false)
            })
        }

        fetchAPI()
    }, [params.id]);
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const moviePlayerModal = () => {
        const youtubeUrl = "https://www.youtube.com/watch?v="
        console.log(movieVideo)
        return (
            movieVideo ? <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}><p style={{ color: "#000", fontSize: 25, marginBottom: 0 }}>{detail.title}</p></ModalHeader>
                <ModalBody style={{ backgroundColor: "#000" }}>
                    <ReactPlayer className="container-fluid"
                        url={youtubeUrl + movieVideo.key}
                        width="100%"
                        playing
                    />
                </ModalBody>
            </Modal > : <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}><p style={{ color: "#000", fontSize: 25, marginBottom: 0 }}>{detail.title}</p></ModalHeader>
                    <ModalBody style={{ backgroundColor: "#000" }}>
                        <h1 style={{ textAlign: "center" }}>Not Available</h1>
                    </ModalBody>
                </Modal >

        )
    }
    document.title = `GoMovie${detail.title ? " - " + detail.title : ''}`;
    return (
        isLoading ?
            <div className="loading" >
                <Ellipsis color="#fff" />
            </div>
            :
            (
                <Fragment>
                    <AppNavbar />
                    <div className="container">
                        <div className="row mt-2">
                            <div className="col text-center" style={{ width: "100%" }}>
                                <img className="img-fluid" src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`} alt={"go-movie" + detail.title} />
                                <div style={{ textAlign: "center", marginTop: -350 }} >
                                    <i className="fa fa-play-circle" style={{ fontSize: 95, color: "rgb(229, 9, 20)", cursor: "pointer" }} onClick={toggle} />
                                </div>
                                <div style={{ textAlign: "center", fontSize: 35, marginTop: 90, padding: 35 }} >
                                    {detail.title}
                                </div>
                            </div >
                            {moviePlayerModal(detail)}
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="btn btn-outline-danger" style={{ float: "right" }} onClick={addToWatchList}><i className="fa fa-plus" aria-hidden="true" style={{ marginRight: 5 }} />Add to Watchlist</button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <ul className="list-inline">
                                    {
                                        detail.length === 0 ? '' :
                                            detail.genres.map((val, index) => {
                                                return (
                                                    <li className="list-inline-item" key={index}>
                                                        <button type="button" className="btn btn-outline-info" >
                                                            {val.name}
                                                        </button>
                                                    </li>
                                                )
                                            })}
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <ReactStars starCount={detail.vote_average} value={detail.vote_average} activeColor={"red"} inactiveColor={'#ddd'} name={detail.title} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <p style={{ color: "#fff" }}>{detail.overview}</p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CAST</p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {
                                cast.length === 0 ? '' :
                                    cast.slice(0, 4).map((val, index) => {
                                        return (
                                            <div className="col-md-3 col-sm-6 text-center" key={index}>
                                                <img className="img-fluid rounded-circle mx-auto d-block" src={val.profileImg} alt={"go-movie" + val.name} />
                                                <p className="font-weight-bold">{val.name}</p>
                                                <p className="font-weight-light " style={{ color: "#5a606b" }}>Trending for {val.known}</p>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <p style={{ color: "#5a606b", fontWeight: "bolder" }}>SIMILAR MOVIES</p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {
                                similarMovies.length === 0 ? '' :
                                    similarMovies.slice(0, 4).map((val, index) => {
                                        return (
                                            <div className="col-md-3 col-sm-6" key={index}>
                                                <div className="card">
                                                    <Link to={`/movie/${val.id}`}>
                                                        <img className="img-fluid" src={val.poster} alt={"go-movie" + val.title} />
                                                    </Link>
                                                </div>
                                                <div className="mt-3">
                                                    <p style={{ fontWeight: "bold" }}>{val.title}</p>
                                                    <p>Rated: {val.rating}</p>
                                                    <ReactStars starCount={val.rating} value={val.rating} activeColor={"#fc10f"} inactiveColor={'#ddd'} name={val.title} />
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        <FooterInfo />
                    </div >
                </Fragment >
            )
    );
}

export default Moviedetail;