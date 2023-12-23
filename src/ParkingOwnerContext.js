import React, { createContext, useState } from 'react';

export const ParkingOwnerContext = createContext();

export const ParkingOwnerProvider = (props) => {
  const [parkingList, setParkingList] = useState([]);
  const [currentParking, setCurrentParking] = useState(null);
  return (
    <ParkingOwnerContext.Provider
      value={[parkingList, setParkingList, currentParking, setCurrentParking]}
    >
      {props.children}
    </ParkingOwnerContext.Provider>
  );
};
