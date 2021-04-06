import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Card, Spinner } from 'react-bootstrap';
import { getTempForDisplay } from '../actions/WeatherAction';

const WeatherCard = (props) => {
    const { city, tempUnits, theme } = props;
    const location = useLocation();
    const dispatch = useDispatch();
    const [temp, setTemp] = useState(null);
    const locationPath = location.pathname;
    useEffect(() => {
        const getTemp = async () => {
            const tempForDisplay = await dispatch(getTempForDisplay(tempUnits, city.currWeather['Temperature']));
            setTemp(tempForDisplay);
        }
        getTemp();
    }, [city, tempUnits, locationPath, temp, dispatch])
    if (!city) {
        return <Spinner animation="border" variant="dark" />
    } else {
        return (
            <div className={`weather-card-cmp ${(location.pathname === '/') ? 'in-home-page' : 'in-favorites-page'}`}>
                <Card text={theme === 'dark' ? 'white' : 'dark'} bg={location.pathname === '/' ? false : theme} className='card' >
                    <Card.Img className="card-img" variant="top" src={`/svgs/${city.currWeather['WeatherIcon']}.svg`} />
                    <Card.Body className="card-body">
                        <Card.Title>{city.name}</Card.Title>
                        {temp ? (<Card.Text>{temp}<span>{tempUnits}°</span></Card.Text>) : ''}
                        {(locationPath === '/Favorites') ? (<Card.Text>{city.currWeather['WeatherText']}</Card.Text>) : ''}
                    </Card.Body>
                </Card>
            </div>
        )

    }
}

export default WeatherCard;

