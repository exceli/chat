import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import axios from 'axios';

function NavBar() {
    // const [profileImage, setProfileImage] = useState(null);
    //
    // useEffect(() => {
    //     axios.get('/api/social/profile/')
    //         .then(response => {
    //             setProfileImage(response.data.profile_image_url);
    //         })
    //         .catch(error => {
    //             console.error('Не удалось получить URL-адрес фото пользователя:', error);
    //         });
    // }, []);

    return (
        <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src="/logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {/*{profileImage && <img src={profileImage} alt="Profile Image"/>}*/}
            </Container>
        </Navbar>
    );
}

export default NavBar;
