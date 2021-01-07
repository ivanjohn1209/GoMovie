import React, { Component, Fragment } from 'react';

class FooterInfo extends Component {
    render() {
        return (
            <Fragment>
                <hr className="mt-5" style={{ border: "1px solid #5a606b" }} />
                <div className="row mt-3">
                    <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
                        <h3>ABOUT US</h3>
                        <p>At GoMovie, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV shows, movies and documentaries. Our members control what they want to watch, when they want it, with no ads, in one simple subscription. We’re streaming in more than 30 languages and 190 countries, because great stories can come from anywhere and be loved everywhere. We are the world’s biggest fans of entertainment, and we’re always looking to help you find your next favorite story.</p>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="/" style={{ color: "#FF9900" }}>
                                    <i className="fa fa-facebook-official" aria-hidden="true" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" style={{ color: "#FF9900" }}>
                                    <i className="fa fa-youtube-play" aria-hidden="true" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" style={{ color: "#FF9900" }}>
                                    <i className="fa fa-twitter-square" aria-hidden="true" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" style={{ color: "#FF9900" }}>
                                    <i className="fa fa-instagram" aria-hidden="true" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
                        <h3>KEEP IN TOUCH</h3>
                        <ul className="list-unstyled">
                            <li>
                                <p>
                                    <strong>
                                        <i className="fa fa-map-marker" /> Address: Davao Del Norte, Philippines
                                        </strong>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>
                                        <i className="fa fa-phone" /> Phone: +639617241239
                                        </strong>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>
                                        <i className="fa fa-envelope-o" /> Email: pagdayawonjohnivan@gmail.com
                                        </strong>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default FooterInfo;