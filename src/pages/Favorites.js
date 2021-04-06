import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadFavorites } from '../actions/WeatherAction';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

import WeatherCard from '../cmps/WeatherCard';


const Favorites = (props) => {
    const theme = useSelector(state => state.app.theme);
    const favorites = useSelector(state => state.weather.favorites);
    const tempUnits = useSelector(state => state.weather.tempUnits);

    const dispatch = useDispatch();
    useEffect(() => {
        const getFavorites = async () => {
            await dispatch(loadFavorites());
        }
        getFavorites()

    }, [favorites.length, dispatch])
    if (!favorites.length) {
        return (
            <div className="Favorites-page">
                <Alert show={true} variant="info" className="alert">
                    <Alert.Heading>Favorite cities have not been selected yet</Alert.Heading>
                    <p>If you want to add cities
                        <Button className="go-home-btn" onClick={() => { props.history.push('/') }} variant="outline-success">Click Here</Button>
                    </p>
                </Alert>

            </div>)
    } else {
        return (
            <div className="Favorites-page">
                <Container className="container">
                    <Row className="cmp-header"><h1>Your Favorites</h1></Row>
                    <Row className="row-in-favorite" >
                        {favorites.map((city, index) => {
                            return (
                                <Col className="col-in-favorite" key={index}  >
                                    <Link to={`/${city.id}/${city.name}`} className="link-to-city">
                                        <WeatherCard city={city} tempUnits={tempUnits} theme={theme} />
                                    </Link>
                                </Col>)
                        })}
                    </Row>
                </Container>
            </div>
        )
    }

}

export default Favorites;

