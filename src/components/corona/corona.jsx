import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../footer/footer';
import GoogleMap from '../googleMap/googleMap';
import Header from '../header/header';
import styles from './corona.module.css';
import CoronaItem from './coronaItem';

const Corona = ({ authService, corona }) => {
  const [coronaItem, setCoronaItem] = useState([]);

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    corona //
      .getCoronaItems()
      .then((items) => setCoronaItem(items.data));
  }, [corona]);

  return (
    <section className={styles.corona}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <CoronaItem coronaItem={coronaItem} />
        <GoogleMap coronaItem={coronaItem} />
      </div>
      <Footer />
    </section>
  );
};

export default Corona;
