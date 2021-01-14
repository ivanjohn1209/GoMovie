import React, { Component, Fragment } from 'react';
import { connect } from "react-redux"
import { DropdownItem } from 'reactstrap';
import { logout } from "../../actions/authActions"
import PropTypes from "prop-types"
class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render() {
        return (
            <Fragment>
                <DropdownItem>
                    <a onClick={this.props.logout} href='/home' style={{ color: "#212529", textDecoration: "none" }}>
                        <i className="fa fa-sign-out" aria-hidden="true" /> Logout
                </a>
                </DropdownItem>
            </Fragment>
        );
    }
}
export default connect(null, { logout })(Logout);