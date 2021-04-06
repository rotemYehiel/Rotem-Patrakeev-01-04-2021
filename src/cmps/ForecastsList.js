import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

import { getCityForecasts } from '../actions/WeatherAction';
import DayCard from './DayCard';

const ForecastsList = (props) => {
    const { cityId } = props;
    const theme = useSelector(state => state.app.theme);
    const forecastsList = useSelector(state => state.weather.currCity.forecastsList);
    const tempUnits = useSelector(state => state.weather.tempUnits);
    const isDayTime = useSelector(state => state.weather.isDayTime);

    const dispatch = useDispatch();
    useEffect(() => {
        const getForecasts = async () => {
            await dispatch(getCityForecasts(cityId))
        }
        getForecasts()
    }, [cityId, dispatch])
    if (forecastsList.length > 0) {
        return (
            <div className="forecasts-list">
                <Container className="container" >
                    <Row className="row-in-list" >
                        {forecastsList.map((forecast, index) => {
                            return (
                                <Col className="col-in-list" key={index}>
                                    <DayCard theme={theme} forecast={forecast} tempUnits={tempUnits} isDayTime={isDayTime} />
                                </Col>)
                        })}
                    </Row>
                </Container>
            </div>
        )
    } else {
        return (<Spinner animation="border" variant="dark" />)
    }
}
export default ForecastsList;

