import PropTypes from 'prop-types';
import React, { useState } from 'react';

const initialStore = {
    purchaseOrders: []
};

export const StoreContext = React.createContext({
  store: initialStore,
  actions: {
    setPurchaseOrders: () => {},
  },
});

const setPurchaseOrders = (store, setStore, purchaseOrders) => {
  setStore({ ...store, purchaseOrders });
};

export const Context = ({ children }) => {
  const [store, _setStore] = useState(initialStore);

  const setStore = _store => {
    const newStore = { ...store, ..._store };
    _setStore(newStore);
  };

  const actions = {
    setPurchaseOrders: setPurchaseOrders.bind(null, store, setStore),
  };

  return (
    <StoreContext.Provider value={{ store, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

Context.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};