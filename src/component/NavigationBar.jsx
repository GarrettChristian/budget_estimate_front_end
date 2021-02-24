import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import AuthenticationService from '../service/AuthenticationService'
import {withRouter} from 'react-router-dom';

class NavigationBar extends Component{

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn : AuthenticationService.isUserLoggedIn()
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    componentDidUpdate(prevProps) {
        console.log("did update")
        if (this.props.location.pathname !== prevProps.location.pathname) {
            console.log("update!", this.state.isLoggedIn)
            var isUserLoggedIn = AuthenticationService.isUserLoggedIn()
            // var event
            // event.name = this.state.isLoggedIn;
            // event.value = AuthenticationService.isUserLoggedIn();
            // this.handleChange(event)
            // var loggedInUser = AuthenticationService.isUserLoggedIn()
            this.setState({isLoggedIn: isUserLoggedIn})
            // this.setState(this.state.loggedInUserName, loggedInUser)
        }
    }

    // useEffect(() => {
    //     history.listen(dismissAllFlags)
    // });

    // getName() {
    //     AuthenticationService.getLoggedInUsersNameFirstLast()
    //         .then(
    //             response => {
    //                 this.setState({ name: response.data })
    //             }
    //         )
    // }

    render() {
        // const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return(
            <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Budget Tracker</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/projects">Projects</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                
                    {this.state.isLoggedIn ? // logged in
                        <Navbar.Collapse className="justify-content-end">
                        <Row>
                            <Nav className="mr-auto">
                            <Navbar.Text>
                                Signed in as: {AuthenticationService.getLoggedInUserName()}
                            </Navbar.Text>
                        
                            <Nav.Link href="/logout" onClick={AuthenticationService.logout}>
                                Logout</Nav.Link>
                            </Nav>
                        </Row>
                        </Navbar.Collapse>
                    : // not logged in
                        <Navbar.Collapse className="justify-content-end">
                        <Row>
                            <Nav className="mr-auto">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/new/user">Create Account</Nav.Link>
                            </Nav>
                        </Row>
                        </Navbar.Collapse>
                    }
                
            </Navbar>
            </>
        )
    }
}

export default withRouter(NavigationBar)