import { 
  Navbar, 
  Nav, 
  NavDropdown, 
  Form, 
  FormControl, 
  Button } from 'react-bootstrap';
import React from 'react'



const Header = (props) => {
  return  (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="/">Unique Cover Letter Generator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/jobs/">Home</Nav.Link>
          <Nav.Link to="/job/form/">Cover Letter Form</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            {
              props.isAuthenticated ? 
                <NavDropdown.Item>Logout</NavDropdown.Item>
                :
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            }
            {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}



export default Header