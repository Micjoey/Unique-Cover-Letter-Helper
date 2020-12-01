import { 
  Navbar, 
  Nav, 
  NavDropdown, 
  Form, 
  FormControl, 
  Button } from 'react-bootstrap';
import React, { useCallback, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/Auth'
import ErrorBoundary from '../../../store/ErrorBoundary';


const Header = () => {
  let history = useHistory()
  const props = useSelector(state => (
    {
      ...state, 
      isAuthenticated: localStorage.getItem('access_token') !== null,
      loading: state.loading,
      error: state.error
    }))
  
  const dispatch = useDispatch()

  const logout = () => {
    try {
      dispatch(actions.logout())
      history.push('/login')
    } catch (e) {
      alert('unable to logout')
    }
  }


  return  (
    <Navbar bg="light" expand="lg" sticky="top" className="text-center">
      <Navbar.Brand href="/">Unique Cover Letter Generator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/">Home</Nav.Link> */}
          <Nav.Link href="/all-jobs/">All Jobs</Nav.Link>
          <Nav.Link href="/job/form">Cover Letter Form</Nav.Link>
          {/* <Nav.Link onClick={() => logout()}>Logout</Nav.Link> */}
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="/admin/">Account</NavDropdown.Item>
            <NavDropdown.Divider />
            <ErrorBoundary>
            {
              props.isAuthenticated ? 
                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                :
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            }
            </ErrorBoundary>
            <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
            {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
          </NavDropdown>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  )
}



export default Header