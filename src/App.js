import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/login/login';  // Importando o componente de login // Importando o componente de cadastro
import BarraInferior from './components/barraInferior/barraInferior';
import Cadastro from './cadastro/app_cadastro'; // Import

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota para a página de login */}
          <Route path="/" element={<Login />} />
          {/* Rota para a página de cadastro */}
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        <BarraInferior />
      </div>
    </Router>
  );
}

export default App;
