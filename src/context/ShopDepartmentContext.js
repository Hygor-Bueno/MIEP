import React, { createContext, useReducer } from 'react';
import {initialState, ShopDepartmentReducer} from '../reducers/ShopDepartmentReducer';

export const ShopDepartmentContext = createContext();

export default ({ children }) => {
  const [state, dispatch] = useReducer(ShopDepartmentReducer, initialState);



  return (
    <ShopDepartmentContext.Provider value={{state, dispatch}}>
      {children}
    </ShopDepartmentContext.Provider>
  )
}