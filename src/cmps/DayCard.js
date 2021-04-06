import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { convertTempForDisplay, convertDate } from '../actions/WeatherAction';
import moment from 'moment';
import { Card, Spinner } from 'react-bootstrap';

const DayCard = (props) => {
    const { forecast, tempUnits, isDayTime, theme } = props;
    const dispatch = useDispatch();

    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        const getTemp = async () => {
            if (tempUnits === 'F') {
                setMaxTemp(forecast['Temperature']['Maximum']['Value']);
                setMinTemp(forecast['Temperature']['Minimum']['Value']);
            } else {
                const maxVal = await dispatch(convertTempForDisplay(tempUnits, forecast['Temperature']['Maximum']['Value']));
                setMaxTemp(maxVal);
                const minVal = await dispatch(convertTempForDisplay(tempUnits, forecast['Temperature']['Minimum']['Value']));
                setMinTemp(minVal)
            }
        }
        const getDate = async () => {
            const date = await dispatch(convertDate(forecast['Date']));
            setDate(date)
        }
        getTemp();
        getDate();

    }, [forecast, tempUnits, dispatch])
    if (!forecast) {
        return <Spinner animation="border" variant="dark" />
    } else {
        return (
            <Card bg={theme} className="day-card-cmp" style={{ width: '100%' }} text={theme === 'dark' ? 'white' : 'dark'}>
                <Card.Img className="card-img" variant="top" src={`/svgs/${forecast[`${isDayTime ? 'Day' : 'Night'}`]['Icon']}.svg`} />
                <Card.Body className="card-body">
                    {date ? (<Card.Title>{moment(date).format('ddd')}</Card.Title>) : ''}
                    <Card.Text>{maxTemp}/{minTemp}<span> {tempUnits}°</span></Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
export default DayCard;