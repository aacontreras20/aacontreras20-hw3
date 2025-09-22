import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import { AppProvider } from './context/AppContext';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <AppProvider>
      <div className="App">
        {!isOnboarded ? (
          <Onboarding onComplete={() => setIsOnboarded(true)} />
        ) : (
          <Dashboard />
        )}
      </div>
    </AppProvider>
  );
}

export default App;
