import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';
import Favoritos from './pages/Favoritos';
import Perfil from './pages/Perfil';
import ProdutoDetalhe from './pages/ProdutoDetalhe';
import Enderecos from './pages/Enderecos';
import ProdutosPorCategoria from './pages/ProdutosPorCategoria';
import Pedidos from './pages/Pedidos';

function App() {
  return (
    <Router>
      <Header />
      <div className="page-content" style={{ padding: '16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/produto/:id" element={<ProdutoDetalhe />} />  
          <Route path="/enderecos/:id" element={<Enderecos />} />  
          <Route path="/produtoporcategoria" element={<ProdutosPorCategoria />} />  
          <Route path="/pedidos" element={<Pedidos />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
