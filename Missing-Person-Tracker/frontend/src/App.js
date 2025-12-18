import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import PeoplePortal from './components/PeoplePortal';
import PolicePortal from './components/PolicePortal';
import './App.css';

const GovHeader = () => (
  <header className="gov-banner shadow-sm">
    <div className="container">
      <h2 className="mb-0 fw-bold">⚖️ MISSING-PORTAL BY GOVERNMENT</h2>
      <small className="text-uppercase tracking-widest opacity-75">Official Citizen Safety & Justice Department</small>
    </div>
  </header>
);

const GovFooter = () => (
  <footer className="gov-footer">
    <div className="container text-center">
      <div className="footer-brand mb-2">State Missing Persons Bureau</div>
      <div className="footer-contact">
        <p className="mb-1">Technical Support: <strong>thanush.8903890288</strong></p>
        <p className="mb-0">Official Email: <strong>tvkvijay@cm.tn</strong></p>
      </div>
    </div>
  </footer>
);

function App() {
  const [user, setUser] = useState(null);
  const [isReg, setIsReg] = useState(false);

  return (
    <div className="app-container d-flex flex-column">
      <GovHeader />
      <main className="flex-grow-1 py-4">
        {!user ? (
          isReg ? <Register onSwitch={() => setIsReg(false)} /> : <Login onLogin={setUser} onSwitch={() => setIsReg(true)} />
        ) : (
          user.role === 'police' ? <PolicePortal user={user} onLogout={() => setUser(null)} /> : <PeoplePortal user={user} onLogout={() => setUser(null)} />
        )}
      </main>
      <GovFooter />
    </div>
  );
}

export default App;