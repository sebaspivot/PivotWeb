import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CanchasLogin from './pages/canchasLogin';
import AdminDashboard from './pages/AdminDashboard';
import CreateGame from './pages/CreateGame';
import FieldRegister from './pages/FieldRegister';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/canchas" element={<CanchasLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/crear-partido" element={<CreateGame />} />
        <Route path="/historial-partidos" element={<FieldRegister />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
