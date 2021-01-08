import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from "react-redux"
import Logout from './auth/Logout';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <Navbar color="dark" dark expand="sm" >
          <NavbarBrand href="/">GoMovie</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href='/'>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/watch-list'>
                  WatchList
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <i className="fa fa-user" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <i className="fa fa-user" aria-hidden="true" />
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                </DropdownItem>
                  <DropdownItem divider />
                  <Logout />
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
})
export default withRouter(connect(mapStateToProps, {})(AppNavbar));

// <div> 1). 3DLznRAU8qaUJo3wczFuBPFsqaMe7hYSuC</div>
// <div> 2). 3LmuP4YyXz5SPvapAb7jWhd9LZqpZ3DqTx</div>
// <div> 3). 3HiL9YpdQh5sqHJCdgn9X5XHTtZscpAXQ2</div>
// <div> 4). 3P3C4CyYjmTc5Gdc26jKCpQPSPpJjzZyV3</div>
// <div>5). 3NtP1yvqwvvHoKBzyEarVbz8fiBJHSBrAE</div>