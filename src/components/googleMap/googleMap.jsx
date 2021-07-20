import React from 'react';
import styles from './googleMap.module.css';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ coronaItem }) => {
  return (
    <section className={styles.googleMap}>
      <h1 className={styles.title}>지도</h1>
      <div className={styles.container}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyD5M-XjaBrcCsmwOikc2NkCHI-TnmyIt1g',
          }}
          defaultCenter={{ lat: 37.5, lng: 127 }}
          defaultZoom={15}
        >
          {/* <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' /> */}
        </GoogleMapReact>
      </div>
    </section>
  );
};

export default GoogleMap;
