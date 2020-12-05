import React from 'react'
import BootstrapNavbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Aperture } from 'react-feather'

const Navbar = (props: any) => {
    return (
        <BootstrapNavbar bg="dark" variant="dark">
            <BootstrapNavbar.Brand>
                P<Aperture style={{color: 'lightskyblue', height: '24%', width: '24%', marginBottom: '3%'}}/>RTAL
            </BootstrapNavbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#developers">Developers</Nav.Link>
            </Nav>
        </BootstrapNavbar>
    );
}

  
export default Navbar;