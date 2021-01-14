import React, { useEffect, useState, Fragment } from 'react';
import {
    getMovieDetail,
    getCasts,
    getMovieVideos,
    getWatchList,
    deleteWatchList,
} from "../service/FetchMovie"
import ReactStars from "react-star-rating-component"
import FooterInfo from './MyComponents/FooterInfo';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactPlayer from "react-player"
import Ellipsis from './MyComponents/loading';
import AppNavbar from './AppNavbar';
import { useHistory } from "react-router";


function WatchListMovie(props) {
    const history = useHistory();
    const params = props.match.params
    const [detail, setDetail] = useState([]);
    const [cast, setCast] = useState([]);
    const [movieVideo, setMovieVideo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const removeToWatchList = () => {
        const id = params.id.split("-")
        deleteWatchList(id[1]).then((res) => {
            history.push("/watch-list")
        })
    }
    useEffect(() => {
        const id = params.id.split("-")
        const fetchAPI = () => {
            setIsLoading(true)
            getWatchList()
            const promise1 = new Promise((resolve, reject) => {
                return getMovieDetail(id[0]).then((res) => {
                    resolve(res);
                });
            });
            const promise2 = new Promise((resolve, reject) => {
                return getCasts(id[0]).then((res) => {
                    resolve(res);
                });
            });
            const promise3 = new Promise((resolve, reject) => {
                return getMovieVideos(id[0]).then((res) => {
                    resolve(res);
                });
            });
            Promise.all([promise1, promise2, promise3]).then((values) => {
                setDetail(values[0])
                setCast(values[1])
                setMovieVideo(values[2])
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
        return (
            <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}><p style={{ color: "#000", fontSize: 25, marginBottom: 0 }}>{detail.title}</p></ModalHeader>
                <ModalBody style={{ backgroundColor: "#000" }}>
                    <ReactPlayer className="container-fluid"
                        url={youtubeUrl + movieVideo.key}
                        width="100%"
                        playing
                    />
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
                                <button type="button" className="btn btn-outline-info" style={{ float: "right" }} onClick={removeToWatchList}><i className="fa fa-trash" aria-hidden="true" style={{ marginRight: 5 }} />Remove to Watchlist</button>
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
                                                        <button type="button" className="btn btn-outline-info" onClick={() => this.getMovieByGenre(val.id)}>
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
                        <FooterInfo />
                    </div >
                </Fragment >
            )
    );
}

export default WatchListMovie;