import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from "reactstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types";
import { login, logout } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: '',
            email: '',
            password: '',
            msg: null

        }
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,

    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props
        if (error !== prevProps.error) {
            // check for register  error
            if (error.id === "LOGIN_FAIL") {
                this.setState({
                    msg: error.msg.msg
                })
            } else {
                this.setState({
                    msg: null
                })
            }

        }
        console.log(" //  if authenticated close modal")
        console.log(isAuthenticated)

        //  if authenticated close modal
        if (isAuthenticated) {
            this.props.history.push("/");
        }
    }
    clearErrors = () => {
        // Clear error
        this.props.clearErrors()
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    onSubmit = (e) => {
        if (e) {
            e.preventDefault()
        }
        const { email, password } = this.state;

        const User = {
            email,
            password
        }
        // attemt to register
        this.props.login(User)
    }
    render() {
        return (
            <div className="our-story-container">
                <div className="our-story-card hero-card hero_fuji vlv" data-uia-our-story="hero_fuji" data-uia="our-story-card">
                    <div className="our-story-card-background">
                        <div className="concord-img-wrapper" data-uia="concord-img-wrapper">
                            <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/313d8f80-3110-4e84-a246-22059403155e/b46d3871-6787-458c-ad33-42b835f5de91/PH-en-20201214-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/313d8f80-3110-4e84-a246-22059403155e/b46d3871-6787-458c-ad33-42b835f5de91/PH-en-20201214-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/313d8f80-3110-4e84-a246-22059403155e/b46d3871-6787-458c-ad33-42b835f5de91/PH-en-20201214-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/313d8f80-3110-4e84-a246-22059403155e/b46d3871-6787-458c-ad33-42b835f5de91/PH-en-20201214-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                            <div className="concord-img-gradient"></div>
                        </div>
                    </div>
                    <div className="login-form">
                        <h1 style={{ paddingBottom: 30 }}>Sign In</h1>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={(e) => this.onSubmit(e)}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={(e) => this.onChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={(e) => this.onChange(e)} />
                            </FormGroup>
                            <Button style={{ width: "100%", backgroundColor: "#e50914", border: 0, marginBottom: 30 }} >Login</Button>

                            <h6>Create account here:<a href="/signup" className="authLinks transparentButton" data-uia="header-login-link">Sign Up</a></h6>
                            {/* <Button style={{ width: "100%" }}>Sign up</Button> */}

                        </Form>
                    </div>
                    <div className="center-pixel" style={{ position: "absolute" }}>
                    </div>
                </div>
                <div className="our-story-card animation-card watchOnTv" data-uia-our-story="watchOnTv" data-uia="our-story-card">
                    <div className="animation-card-container">
                        <div className="our-story-card-text">
                            <h1 id="" className="our-story-card-title" data-uia="animation-card-title">Enjoy on your TV.</h1>
                            <h2 id="" className="our-story-card-subtitle" data-uia="our-story-card-subtitle">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
                        </div>
                        <div className="our-story-card-img-container">
                            <div className="our-story-card-animation-container">
                                <img alt="" className="our-story-card-img" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" data-uia="our-story-card-img" />
                                <div className="our-story-card-animation">
                                    <video className="our-story-card-video" autoPlay="" playsInline="" muted="" loop="">
                                        <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
                                    </video>
                                    <div className="our-story-card-animation-text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="center-pixel" style={{ position: "absolute" }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapStateToProps, { login, clearErrors, logout })(Login);