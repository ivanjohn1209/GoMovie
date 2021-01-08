import React from 'react';

function Page404() {
    document.title = "GoMovie | 404 Error";
    return (
        <div className="wrapper">
            <h2>Oops! Page not found.</h2>
            <div>
                <img src="https://image.flaticon.com/icons/png/512/675/675369.png" alt="404" />
            </div>
            <h4>We can't fint the page you're looking for.</h4>
            <button type="button" className="main-btn" onClick={() => !localStorage.getItem('token') ? this.props.history.push("/home") : this.props.history.push("/")}>GO BACK HOME</button>
        </div >

    );
}
export default Page404;