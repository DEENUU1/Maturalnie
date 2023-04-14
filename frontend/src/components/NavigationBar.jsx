import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavigationBar() {
  return (
    <>  
    
        <Navbar key="false" variant="dark" bg="dark" expand="false" >
          <Container fluid>
            <Navbar.Brand  href="/">MATuralnie</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="end">

              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>MATuralnie</Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" >
                  <Nav.Link href="https://www.linkedin.com/in/kacper-wlodarczyk/">LinkedIn</Nav.Link>
                  <Nav.Link href="https://github.com/DEENUU1/">Github</Nav.Link>
                </Nav>
              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  
    </>
  );
}

export default NavigationBar;