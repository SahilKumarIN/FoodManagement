import React from 'react';
import AppContextProvider from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <AppContextProvider>
      <HomeScreen />
    </AppContextProvider>
  );
};

export default App;
