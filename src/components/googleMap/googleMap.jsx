import React, { memo } from 'react';
import styles from './googleMap.module.css';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';

const GoogleMap = memo(({ defaultMap }) => {
  const { lat, lng } = defaultMap;
  return (
    <section className={styles.googleMap}>
      <h1 className={styles.title}>지도</h1>
      <div className={styles.container}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyD5M-XjaBrcCsmwOikc2NkCHI-TnmyIt1g',
          }}
          defaultCenter={{ lat: 37.567817, lng: 127.004501 }}
          defaultZoom={16}
          center={defaultMap}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </section>
  );
});

export default GoogleMap;
