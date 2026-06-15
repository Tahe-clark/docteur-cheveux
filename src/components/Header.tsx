import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

interface HeaderProps {
  persona: 'abdramane' | 'fahima';
}

const Header: React.FC<HeaderProps> = ({ persona }) => {
  const isDark = persona === 'fahima';

  return (
    <Navbar 
      expand="lg" 
      variant={isDark ? 'dark' : 'light'} 
      className={isDark ? 'bg-dark border-bottom border-secondary' : 'bg-light border-bottom'}
    >
      <Container>
        <Navbar.Brand href="#" className="fw-bold fs-3">Docteur Cheveux</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold">
            <Nav.Link href="#">{isDark ? 'SERVICES' : 'SERVICES'}</Nav.Link>
            <Nav.Link href="#">{isDark ? 'PRODUCTS' : 'Produits'}</Nav.Link>
            <Nav.Link href="#">{isDark ? 'CONTACT' : 'Contacts'}</Nav.Link>
            <Button variant={isDark ? 'outline-light' : 'outline-dark'} size="sm" className="ms-3">
              {isDark ? 'EN' : 'FR'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;