import React from 'react';
import CoronaItem from './coronaItem';
import styles from './coronaList.module.css';

const CoronaList = ({ coronaItem, defaultMap, onSelectMap }) => {
  return (
    <section className={styles.corona}>
      <h1 className={styles.title}>코로나19 예방접종센터 조회서비스</h1>
      <ul className={styles.ul}>
        {coronaItem.map((item, index) => (
          <CoronaItem
            key={index}
            item={item}
            defaultMap={defaultMap}
            onSelectMap={onSelectMap}
          />
        ))}
      </ul>
    </section>
  );
};

export default CoronaList;
