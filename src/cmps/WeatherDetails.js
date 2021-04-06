import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrWeather, toggleIsFavorites } from '../actions/WeatherAction';

import WeatherCard from './WeatherCard';
import ForecastsList from './ForecastsList';

import { Spinner, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as favoriteIcon } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart);


const WeatherDetails = (props) => {
    const { currCity } = props;
    const theme = useSelector(state => state.app.theme);
    const weatherNow = useSelector(state => state.weather.currCity.weatherNow);
    const tempUnits = useSelector(state => state.weather.tempUnits);
    const dispatch = useDispatch();

    useEffect(() => {
        const getNowWeather = async () => {
            await dispatch(getCurrWeather(currCity.id));
        }
        if (!currCity.weatherNow) getNowWeather();
    }, [currCity.id, currCity.weatherNow, dispatch])

    const clickOnFavorite = async () => {
        await dispatch(toggleIsFavorites({ id: currCity.id, name: currCity.name, currWeather: weatherNow }));
    }

    if (!currCity) {
        return <Spinner animation="border" variant="dark" />
    } else {
        return (
            <Container className="weather-details-cmp" >
                <Row className="details-header"  >
                    {weatherNow ? <WeatherCard theme={theme} city={{ id: currCity.id, name: currCity.name, currWeather: weatherNow }} tempUnits={tempUnits} /> : ''}
                    <button className={`favorite-btn ${currCity.isFavorite ? 'is-favorite' : ''}`} onClick={() => clickOnFavorite()}>
                        {currCity.isFavorite ? <FontAwesomeIcon icon={favoriteIcon} /> :
                            <FontAwesomeIcon icon={faHeart} />}
                    </button>
                </Row>
                {weatherNow ? <Row className="details-weather-text">{weatherNow.WeatherText}</Row> : ''}
                <Row><ForecastsList cityId={currCity.id} /></Row>
            </Container>
        )
    }
}
export default WeatherDetails;
