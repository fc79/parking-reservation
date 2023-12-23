import React, { createContext, useState } from 'react';

export const CarOwnerContext = createContext();

export const CarOwnerProvider = (props) => {
  const [carList, setCarList] = useState([]);
  const [currentCar, setCurrentCar] = useState(null);
  return (
    <CarOwnerContext.Provider
      value={[carList, setCarList, currentCar, setCurrentCar]}
    >
      {props.children}
    </CarOwnerContext.Provider>
  );
};
