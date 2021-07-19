import React from 'react';
import styles from './coronaList.module.css';

const CoronaList = ({ item }) => {
  return (
    <li className={styles.items}>
      <div className={styles.info}>
        <h3 className={styles.address}>주소: {item.address}</h3>
        <p className={styles.centerName}>{item.centerName}</p>
        {/* <p className={styles.centerType}>{item.centerType}</p> */}
        {/* <p className={styles.updatedAt}>{item.updatedAt}</p> */}
        {/* <p className={styles.facilityName}>{item.facilityName}</p> */}
        {/* <p className={styles.lat}>{item.lat}</p> */}
        {/* <p className={styles.lng}>{item.lng}</p> */}
        <p className={styles.org}>운영기관: {item.org}</p>
        <p className={styles.phoneNumber}>
          전화번호: {item.phoneNumber || '정보가 없습니다.'}
        </p>
        {/* <p className={styles.sido}>{item.sido}</p>
        <p className={styles.sigungu}>{item.sigungu}</p> */}
      </div>
    </li>
  );
};

export default CoronaList;
