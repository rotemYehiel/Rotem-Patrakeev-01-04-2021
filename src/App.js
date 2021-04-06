
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';

import { toggleTempUnits, loadTempUnits } from './actions/WeatherAction';
import { getUserLocation, loadTheme, closeModal } from './actions/AppAction';

import HomePage from './pages/HomePage';
import Favorites from './pages/Favorites';
import MainHeader from './cmps/MainHeader';
import MsgModal from './cmps/MsgModal';

library.add(fab)

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tempUnits = useSelector(state => state.weather.tempUnits);
  const theme = useSelector(state => state.app.theme);
  const isModalOpen = useSelector(state => state.app.isModalOpen);
  const msg = useSelector(state => state.app.msg);
  const userLocation = useSelector(state => state.app.userLocation);



  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        await dispatch(getUserLocation(userLocation))
      });
    }
    const getTheme = async () => {
      dispatch(loadTheme());
    }
    const getTempUnits = async () => {
      dispatch(loadTempUnits())
    }
    if (!tempUnits) getTempUnits();
    if (!theme) getTheme();
    if (!userLocation) getLocation();
  }, [history, userLocation, theme, tempUnits, dispatch])
  return (
    <div className={`App ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`} >
      {isModalOpen ?
        <MsgModal
          msg={msg}
          show={isModalOpen}
          onHide={() => dispatch(closeModal())}
          theme={theme} /> : ''
      }      <Button variant={theme} className="temp-units-btn" onClick={async () => dispatch(toggleTempUnits(tempUnits))}>
        {tempUnits === 'C' ? 'F' : 'C'}
      </Button >
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/Favorites" exact component={Favorites} />
          <Route path="/:id/:name" component={HomePage} />
        </Switch>
      </main>
    </div>

  );
}

export default App;
