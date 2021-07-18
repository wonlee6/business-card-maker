import React from 'react';

const CoronaList = ({ item }) => {
  return (
    <li>
      <ul>
        <li>{item.address}</li>
        <li>{item.centerName}</li>
        <li>{item.centerType}</li>
        <li>{item.updatedAt}</li>
        <li>{item.facilityName}</li>
        <li>{item.lat}</li>
        <li>{item.lng}</li>
        <li>{item.org}</li>
        <li>{item.phoneNumber}</li>
        <li>{item.sido}</li>
        <li>{item.sido}</li>
        <li>{item.sigungu}</li>
      </ul>
    </li>
  );
};

export default CoronaList;
