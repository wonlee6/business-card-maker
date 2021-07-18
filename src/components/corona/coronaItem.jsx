import React from 'react';
import CoronaList from './coronaList';

const CoronaItem = ({ coronaItem }) => {
  console.log(coronaItem);

  return (
    <ul>
      {coronaItem.map((item, index) => (
        <CoronaList key={index} item={item} />
      ))}
    </ul>
  );
};

export default CoronaItem;
