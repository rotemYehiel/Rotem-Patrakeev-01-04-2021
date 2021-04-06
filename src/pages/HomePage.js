import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap'

import { getCityAutoComplete, checkIsCityFavorite, setCity } from '../actions/WeatherAction';
import { openModal } from '../actions/AppAction';

import SearchInput from '../cmps/SearchInput';
import CitiesOptionsList from '../cmps/CitiesOptionsList';
import WeatherDetails from '../cmps/WeatherDetails';

const HomePage = (props) => {
    const currCity = useSelector(state => state.weather.currCity);
    const dispatch = useDispatch();
    const [inputVal, setInputVal] = useState('');
    const [options, setOptions] = useState([]);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    useEffect(() => {
        const setCurrCity = async (city = {}) => {
            await dispatch(setCity(city));
        }
        const checkIsFavorite = async () => {
            await dispatch(checkIsCityFavorite(currCity.id));
        }
        if (!currCity) {
            setCurrCity();
        }
        if (currCity && currCity.isFavorite === null) checkIsFavorite();

        if (props.match.params.id !== undefined && !currCity) {
            setCurrCity(props.match.params)
        }

    }, [currCity, props.match.params, dispatch])

    const onSearch = async (ev) => {
        setInputVal(ev.target.value);
        const isEnglish = await detecLanguage(ev.target.value);
        if (!isEnglish) {
            setInputVal(ev.target.value.substr(0, ev.target.value.length - 1));
            return;
        };
        const OptionsOfCities = await dispatch(getCityAutoComplete(ev.target.value));
        if (OptionsOfCities.length < 1) {
            dispatch(openModal(`Can't find ${ev.target.value}. Try something else...`));
            return;
        }
        setOptions(OptionsOfCities);
        setIsOptionsOpen(true)
    }
    const detecLanguage = (inputVal) => {
        if (/^[a-zA-Z]+$/.test(inputVal) || inputVal === '') {
            return true;
        } else {
            dispatch(openModal(`Sorry... I only know English. Try something else...`));
            return false;
        }
    }
    const onClickOption = (option) => {
        setIsOptionsOpen(false);
        if (option['Key'] === currCity.id) return;
        setInputVal(option['LocalizedName']);
        setNewCity({ id: option['Key'], name: option['LocalizedName'] })
        if (props.match.params.id !== undefined) props.history.push('/')
    }
    const setNewCity = async (city) => {
        await dispatch(setCity(city));
    }

    if (!currCity) {
        return <Spinner animation="border" variant="dark" />
    } else {
        return (
            <div className="home-page">
                <section className="input-sec">
                    <SearchInput inputVal={inputVal} onSearch={onSearch} />
                    {(isOptionsOpen && inputVal) ? (<CitiesOptionsList options={options} onClickOption={onClickOption} />) : ''}
                </section>
                { currCity ? <WeatherDetails currCity={currCity} /> : ''}
            </div >
        )

    }
}

export default HomePage;
