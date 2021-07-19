import React from 'react';
import CoronaList from './coronaList';
import styles from './coronaItem.module.css';

const CoronaItem = ({ coronaItem }) => {
  console.log(coronaItem);

  return (
    <section className={styles.corona}>
      <h1 className={styles.title}>코로나19 예방접종센터 조회서비스</h1>
      <ul className={styles.ul}>
        {coronaItem.map((item, index) => (
          <CoronaList key={index} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default CoronaItem;
