import React, { createContext, useReducer } from 'react';
import {initialState, GridReducer} from '../reducers/GridReducer';

export const GridContext = createContext();

export default ({ children }) => {
  const [state, dispatch] = useReducer(GridReducer, initialState);



  return (
    <GridContext.Provider value={{state, dispatch}}>
      {children}
    </GridContext.Provider>
  )
}