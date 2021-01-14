import React, { Fragment, useState, useEffect } from 'react';
import AppNavbar from './AppNavbar';
import {
    getWatchList,
} from "../service/FetchMovie"
import { Link } from 'react-router-dom';
import ReactStars from "react-star-rating-component"
function WatchList() {
    const [movieList, setMovieList] = useState([]);
    useEffect(() => {
        const fetchAPI = () => {
            // setIsLoading(true)
            const promise1 = new Promise((resolve, reject) => {
                return getWatchList().then((res) => {
                    resolve(res);
                });
            });
            Promise.all([promise1,]).then((values) => {
                setMovieList(values[0])
            })
        }
        fetchAPI()
    }, []);

    return (
        <Fragment>
            <AppNavbar />
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                        <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                            MY WATCHLIST
                            </p>
                    </div>
                </div>
                <div className="row mt-3">
                    {
                        movieList.map((val, index) => {
                            return (
                                <div className="col-md-3 col-sm-6" key={index}>
                                    <div className="card">
                                        <Link to={`/watch-list/${val.id}-${val._id}`}>
                                            <img className="img-fluid" src={`https://image.tmdb.org/t/p/original${val.poster}`} alt={"go-movie" + val.title} />
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
            </div>
        </Fragment >
    );
}
export default WatchList;
