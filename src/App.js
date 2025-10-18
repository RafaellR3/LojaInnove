import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './styles/App.css'; 
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';
import Favoritos from './pages/Favoritos';
import Perfil from './pages/Perfil';
import ProdutoDetalhe from './pages/ProdutoDetalhe';
import Enderecos from './pages/Enderecos';
import ProdutosPorCategoria from './pages/ProdutosPorCategoria';
import Pedidos from './pages/Pedidos';
import Rastreamento from './pages/Rastreamento';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import ProdutosPesquisa from './pages/ProdutosPesquisa';
import CadastroUsuarioForm from './pages/Cadastro';

function App() {
  return (
    <Router>
      <Header />
      <div className="page-content" style={{ padding: '16px' }}>
        <Routes>        
          <Route path="/login" element={<Login />} />
          <Route path="/carrinho" element={ <PrivateRoute> <Carrinho  /> </PrivateRoute>  }/>
          <Route path="/favoritos" element={<PrivateRoute> <Favoritos /></PrivateRoute> } />
          <Route path="/perfil" element={<PrivateRoute> <Perfil /></PrivateRoute> } />
          <Route path="/enderecos/:id" element={<PrivateRoute> <Enderecos /></PrivateRoute> } />  
          <Route path="/pedidos" element={<PrivateRoute> <Pedidos /></PrivateRoute> } />  
          <Route path="/rastrear" element={<PrivateRoute> <Rastreamento /></PrivateRoute> } /> 
              
         
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/:id" element={<ProdutoDetalhe />} />  
          <Route path="/produtoporcategoria" element={<ProdutosPorCategoria />} />  
          <Route path="/produtospequisa" element={<ProdutosPesquisa />} />
          <Route path='/CadastroUsuarioForm' element={ <CadastroUsuarioForm />} /> 
          <Route path="*" element={<h4>Página Não Encontrada</h4>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
