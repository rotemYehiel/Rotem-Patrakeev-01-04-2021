import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Navbar, Nav, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb as darkLightbulb } from '@fortawesome/free-solid-svg-icons';
import { toggleTheme } from '../actions/AppAction';

const MainHeader = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const theme = useSelector(state => state.app.theme);

    const onToggleThemeClick = async () => {
        await dispatch(toggleTheme());
    }

    return (
        <Navbar bg={theme} variant={theme} expand="lg" className="main-header-cmp">
            <Navbar.Brand href="/">Weather App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className={theme === 'dark' ? 'dark-mode cmp' : 'light-mode cmp'}>
                <Nav className="ml-auto" activeKey={location.pathname} >
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Favorites">Favorites</Nav.Link>
                </Nav>
                <Button variant={theme} className="theme-btn" onClick={async () => onToggleThemeClick()}>
                    {theme === 'light' ? <FontAwesomeIcon icon={darkLightbulb} /> : <FontAwesomeIcon icon={faLightbulb} />}
                </Button >
            </Navbar.Collapse>
        </Navbar>
    )
}
export default MainHeader;