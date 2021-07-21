import React, { memo } from 'react';
import styles from './coronaItem.module.css';

const CoronaItem = memo(({ item, onSelectMap }) => {
  const onClick = () => {
    onSelectMap({
      lat: Number(item.lat),
      lng: Number(item.lng),
      zoom: 13,
    });
  };
  return (
    <li className={styles.items} onClick={onClick}>
      <div className={styles.info}>
        <h3 className={styles.address}>주소: {item.address}</h3>
        <p className={styles.centerName}>{item.centerName}</p>
        <p className={styles.org}>운영기관: {item.org}</p>
        <p className={styles.phoneNumber}>
          전화번호: {item.phoneNumber || '정보가 없습니다.'}
        </p>
      </div>
    </li>
  );
});

export default CoronaItem;
