import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../footer/footer';
import GoogleMap from '../googleMap/googleMap';
import Header from '../header/header';
import styles from './corona.module.css';
import CoronaList from './coronaList';

const Corona = ({ authService, corona }) => {
  const [coronaItem, setCoronaItem] = useState([]);
  const [defaultMap, setDefaultMap] = useState({});

  const selectMap = (props) => {
    setDefaultMap(props);
  };

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    corona //
      .getCoronaItems()
      .then((items) => {
        setCoronaItem(items.data);
        setDefaultMap({
          lat: Number(items.data[0].lat),
          lng: Number(items.data[0].lng),
          zoom: 10,
        });
      });
  }, [corona]);

  return (
    <section className={styles.corona}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <CoronaList
          coronaItem={coronaItem}
          defaultMap={defaultMap}
          onSelectMap={selectMap}
        />
        <GoogleMap
          coronaItem={coronaItem}
          defaultMap={defaultMap}
          onSelectMap={selectMap}
        />
      </div>
      <Footer />
    </section>
  );
};

export default Corona;
