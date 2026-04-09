import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavbarComp() {
  return (
      <Navbar bg="danger" data-bs-theme="dark">
          <Navbar.Brand as={Link} to="/">
          <img
            alt="Logo"
            src="https://cdn-icons-png.flaticon.com/512/3172/3172568.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          CineRosCity
        </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/new-movie">New Movie</Nav.Link>
          </Nav>
      </Navbar>
  );
}

export default NavbarComp;
