// AppContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(false);
  const [mostrarMenuNav, setMostrarMenuNav] = useState(false);
  const [mostrarFooter, setMostrarFooter] = useState(false);

  const toggleMostrarLogin = () => {
    setMostrarLogin(!mostrarLogin);
    setMostrarHeader(false);
    setMostrarMenuNav(false);
    setMostrarFooter(false);
  };

  return (
    <AppContext.Provider
      value={{
        mostrarLogin,
        mostrarHeader,
        mostrarMenuNav,
        mostrarFooter,
        toggleMostrarLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider');
  }
  return context;
};
