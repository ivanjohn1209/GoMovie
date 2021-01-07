// import React, { Component, Fragment } from 'react';
// import { connect } from "react-redux";
// import { getNowPlayingMovies, getGenre, getMovieByGenre, getPersons, getTopratedMovie } from "../actions/movieActions";
// import PropTypes from "prop-types";
// import AppNavbar from './AppNavbar';
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
// import Slider from "react-slick";

// // Import css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Link } from 'react-router-dom';
// import ReactStars from "react-star-rating-component"
// import FooterInfo from './MyComponents/FooterInfo';
// const config = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
// };

// class Home extends Component {
//     tokenConfig = () => {
//         // Get token from localStorage
//         const token = localStorage.getItem('token');
//         // Header
//         const config = {
//             headers: {
//                 "Content-type": "application/json",
//             }
//         }
//         if (token) {
//             config.headers['x-auth-token'] = token;
//         }
//         return config;
//     }
//     fetchMovies = () => {
//         const promise1 = new Promise((resolve, reject) => {
//             this.props.getTopratedMovie()
//         });
//         const promise3 = new Promise((resolve, reject) => {
//             this.props.getMovieByGenre()
//         });
//         const promise4 = new Promise((resolve, reject) => {
//             this.props.getPersons()
//         });
//         const promise5 = new Promise((resolve, reject) => {
//             this.props.getNowPlayingMovies()
//         });
//         const promise2 = new Promise((resolve, reject) => {
//             this.props.getGenre()
//         });
//         Promise.all([promise1, promise2, promise3, promise4, promise5])
//     }
//     getMovieByGenre = (genre_id) => {
//         this.props.getMovieByGenre(genre_id)
//     }
//     componentDidMount() {
//         this.fetchMovies()
//         const body = JSON.stringify({ id: "5fe8af5babffc409d0d31fb4" })

//         fetch('/api/movies', {
//             method: 'GET',
//             headers: {
//                 "Content-type": "application/json",
//                 "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZ…TU5fQ.oipvwTa_upWs5JSKkM0vEHBtz8hopqdJKFTAU1XuH3k"
//             },
//             body: body,
//         })
//             .then(response => response.json())
//             .then(data => console.log(data))
//             .catch(err => console.log(err));
//     }
//     render() {
//         const now_playing = this.props.nowPlayingMovie.nowPlayingMovie
//         const genreList = this.props.genreList.genreList
//         const movieList = this.props.movieList.movieList
//         const persons = this.props.trendingPerson.trendingPerson
//         const topRatedMovies = this.props.topRatedMovies.topRatedMovies
//         console.log(this.props.user)
//         return (
//             <Fragment>
//                 <AppNavbar />
//                 <div className="container">
//                     <div className="row mt-2">
//                         <div className="col">
//                             <Slider {...config}>
//                                 {
//                                     now_playing.slice(0, 5).map((val, index) => {
//                                         return (
//                                             <div style={{ width: "100%", height: 500 }} key={index}>
//                                                 <div>
//                                                     <img style={{ height: "600px", width: "100%" }} src={val.backPoster} alt={val.title} />
//                                                 </div>
//                                                 <div style={{ textAlign: "center", marginTop: -350 }} >
//                                                     <i className="fa fa-play-circle" style={{ fontSize: 95, color: "rgb(229, 9, 20)" }} />
//                                                 </div>
//                                                 <div style={{ textAlign: "center", fontSize: 35, marginTop: 90, padding: 35 }} >
//                                                     {val.title}
//                                                 </div>
//                                             </div>
//                                         )
//                                     })
//                                 }
//                             </Slider>
//                         </div>
//                     </div>
//                     <div className="row mt-3">
//                         <div className="col">
//                             <ul className="list-inline">
//                                 {
//                                     genreList.length === 0 ? '' :
//                                         genreList.genres.map((val, index) => {
//                                             return (
//                                                 <li className="list-inline-item" key={index}>
//                                                     <button type="button" className="btn btn-outline-info" onClick={() => this.getMovieByGenre(val.id)}>
//                                                         {val.name}
//                                                     </button>
//                                                 </li>
//                                             )
//                                         })}
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="row mt-3">
//                         <div className="col">
//                             <div className="float-right">
//                                 <i className="fa fa-arrow-circle-right" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row mt-3">
//                         {
//                             movieList.length === 0 ? '' :
//                                 movieList.slice(0, 4).map((val, index) => {
//                                     return (
//                                         <div className="col-md-3 col-sm-6" key={index}>
//                                             <div className="card">
//                                                 <Link to={`/movie/${val.id}`}>
//                                                     <img className="img-fluid" src={val.poster} alt={val.title} />
//                                                 </Link>
//                                             </div>
//                                             <div className="mt-3">
//                                                 <p style={{ fontWeight: "bold" }}>{val.title}</p>
//                                                 <p>Rated: {val.rating}</p>
//                                                 <ReactStars starCount={val.rating} value={val.rating} activeColor={"#fc10f"} inactiveColor={'#ddd'} />
//                                             </div>
//                                         </div>
//                                     )
//                                 })
//                         }
//                     </div>
//                     <div className="row mt-3">
//                         <div className="col">
//                             <p className="font-weight-bold" style={{ color: "#5a606b" }}>
//                                 TRENDING PERSONS ON THIS WEEK
//                             </p>
//                         </div>
//                     </div>
//                     <div className="row mt-3">
//                         <div className="col">
//                             <div className="float-right">
//                                 <i className="fa fa-arrow-circle-right" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row mt-3">
//                         {
//                             persons.slice(0, 4).map((val, index) => {
//                                 return (
//                                     <div className="col-md-3 col-sm-6 text-center" key={index}>
//                                         <img className="img-fluid rounded-circle mx-auto d-block" src={val.profileImg} alt={val.name} />
//                                         <p className="font-weight-bold">{val.name}</p>
//                                         <p className="font-weight-light " style={{ color: "#5a606b" }}>Trending for {val.known}</p>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//                     <div className="row mt-3">
//                         <div className="col">
//                             <p className="font-weight-bold" style={{ color: "#5a606b" }}>
//                                 TOP RATED MOVIES
//                             </p>
//                         </div>
//                     </div>
//                     <div className="row mt-3">
//                         <div className="col">
//                             <div className="float-right">
//                                 <i className="fa fa-arrow-circle-right" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row mt-3">
//                         {
//                             topRatedMovies.length === 0 ? '' :
//                                 topRatedMovies.slice(0, 4).map((val, index) => {
//                                     return (
//                                         <div className="col-md-3 col-sm-6" key={index}>
//                                             <div className="card">
//                                                 <Link to={`/movie/${val.id}`}>
//                                                     <img className="img-fluid" src={val.poster} alt={val.title} />
//                                                 </Link>
//                                             </div>
//                                             <div className="mt-3">
//                                                 <p style={{ fontWeight: "bold" }}>{val.title}</p>
//                                                 <p>Rated: {val.rating}</p>
//                                                 <ReactStars starCount={val.rating} value={val.rating} activeColor={"#fc10f"} inactiveColor={'#ddd'} />
//                                             </div>
//                                         </div>
//                                     )
//                                 })
//                         }
//                     </div>
//                     <FooterInfo />
//                 </div>
//             </Fragment>

//         );
//     }
// }
// Home.propTypes = {
//     getNowPlayingMovies: PropTypes.func.isRequired,
//     getGenre: PropTypes.func.isRequired,
//     getMovieByGenre: PropTypes.func.isRequired,
//     getPersons: PropTypes.func.isRequired,
//     getTopratedMovie: PropTypes.func.isRequired,
//     nowPlayingMovie: PropTypes.object.isRequired,
//     genreList: PropTypes.object.isRequired,
//     movieList: PropTypes.object.isRequired,
//     trendingPerson: PropTypes.object.isRequired,
//     topRatedMovies: PropTypes.object.isRequired,


// }
// const mapStateToProps = (state) => ({
//     nowPlayingMovie: state.movie,
//     genreList: state.movie,
//     movieList: state.movie,
//     trendingPerson: state.movie,
//     topRatedMovies: state.movie,
// })
// export default connect(mapStateToProps, { getNowPlayingMovies, getGenre, getMovieByGenre, getPersons, getTopratedMovie })(Home);
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
const config = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
};
function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [movieList, setmMovieList] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const getMovieBySelectedGenre = (id) => {
        getMovieByGenre(id).then((res) => {
            setmMovieList(res)
        });
    }
    useEffect(() => {
        const fetchAPI = () => {
            // setIsLoading(true)
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
            })
        }

        fetchAPI()
    }, [])
    return (
        <Fragment>
            <AppNavbar />
            <div className="container">
                <div className="row mt-2">
                    <div className="col">
                        <Slider {...config}>
                            {
                                nowPlaying.slice(0, 5).map((val, index) => {
                                    return (
                                        <div style={{ width: "100%", height: 500 }} key={index}>
                                            <div>
                                                <img style={{ height: "600px", width: "100%" }} src={val.backPoster} alt={val.title} />
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
                                    })}
                        </ul>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="float-right">
                            <i className="fa fa-arrow-circle-right" />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    {
                        movieList.slice(0, 4).map((val, index) => {
                            console.log(val)
                            return (
                                <div className="col-md-3 col-sm-6" key={index}>
                                    <div className="card">
                                        <Link to={`/movie/${val.id}`}>
                                            <img className="img-fluid" src={val.poster} alt={val.title} />
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
                <div className="row mt-3">
                    <div className="col">
                        <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                            TRENDING PERSONS ON THIS WEEK
                                    </p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="float-right">
                            <i className="fa fa-arrow-circle-right" />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    {
                        persons.slice(0, 4).map((val, index) => {
                            return (
                                <div className="col-md-3 col-sm-6 text-center" key={index}>
                                    <img className="img-fluid rounded-circle mx-auto d-block" src={val.profileImg} alt={val.name} />
                                    <p className="font-weight-bold">{val.name}</p>
                                    <p className="font-weight-light " style={{ color: "#5a606b" }}>Trending for {val.known}</p>
                                </div>
                            )
                        })
                    }
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
                        <div className="float-right">
                            <i className="fa fa-arrow-circle-right" />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    {
                        topRatedMovies.slice(0, 4).map((val, index) => {
                            return (
                                <div className="col-md-3 col-sm-6" key={index}>
                                    <div className="card">
                                        <Link to={`/movie/${val.id}`}>
                                            <img className="img-fluid" src={val.poster} alt={val.title} />
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
            </div>
        </Fragment>
    );
}

export default Home;