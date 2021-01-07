import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, isAuthenticated: authenticated, ...rest }) {
    console.log(authenticated)
    return (
        <Route {...rest} render={props => {
            return !localStorage.getItem('token') ?
                // not logged in so redirect to login page with the return url
                <Redirect to={{ pathname: '/home', state: { from: props.location } }} /> : <Component {...props} />
        }} />
    );
}

export default PrivateRoute;