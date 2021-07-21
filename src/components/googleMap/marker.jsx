import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './marker.module.css';

const Marker = () => {
  return <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.maker} />;
};

export default Marker;
