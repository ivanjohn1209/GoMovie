import React, { Component } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import LandingPage from "./compoents/LandingPage";
import Login from "./compoents/auth/Login";
import SignUp from "./compoents/auth/SignUp";
import { loadUser } from "./actions/authActions"
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import AppNavbar from "./compoents/AppNavbar";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./compoents/Home";
import MovieDetails from "./compoents/MovieDetails";
import WatchList from "./compoents/WatchList";
import Page404 from "./compoents/error/Page404";
class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={Home} isAuthenticated={this.props.isAuthenticated.isAuthenticated} />
        <PrivateRoute exact path="/movie/:id" isAuthenticated={this.props.isAuthenticated.isAuthenticated} component={MovieDetails} />
        <PrivateRoute exact path="/watch-list" isAuthenticated={this.props.isAuthenticated.isAuthenticated} component={WatchList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/home" component={LandingPage} />
        <Route path="/404" component={Page404} />
        <Route component={Page404} />
      </Switch>
    );
  }
}
App.propTypes = {
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.object.isRequired,

}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth,
})
export default connect(mapStateToProps, { loadUser })(App);