import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './index.css';

function NavBar() {
  return (
    <>
      {['sm'].map((expand) => (
        <Navbar
          key={expand}
          variant="dark"
          expand={expand}
          className="mb-3 my-navbar"
        >
          <Container fluid>
            <Navbar.Brand href="#" className="brand">
              HoGo.
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto justify-content-end flex-grow-1 pe-3 offcanvas-body">
                <Nav.Link href="#my-projects" style={{ paddingRight: '2rem' }}>
                  Gate Entry
                </Nav.Link>

                <Link to="/directories" style={{ paddingRight: '2rem' }}>
                  Directory
                </Link>
                <Link to="/chats" style={{ paddingRight: '2rem' }}>
                  Forum
                </Link>
                <Link to="/pay-maintenance"> Pay Maintenance</Link>
                {/* <Nav.Link href="#contact-me">Pay Maintenance</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;
