import { useState, useContext } from 'react';
import { Link, useLocation,useNavigate  } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaShoppingCart, FaHeart, FaUser, FaIndent, FaBars,FaHistory  } from 'react-icons/fa';
import { FiLogIn, FiLogOut  } from 'react-icons/fi';
import './Header.css';
import { AuthContext} from "./AuthContext";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();  
  const { usuario } = useContext(AuthContext);  
  const { logout } = useContext(AuthContext);  
  const navigate = useNavigate();

const handleLogout = () => {
    const confirmar = window.confirm("Tem certeza que deseja sair?");
    if (confirmar) {
      logout();
      navigate("/login");
    }
  };

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const closeMenu = () => setMenuAberto(false);

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" onClick={closeMenu} className="logo-link">
          <img src="images/logobranca.png" alt="Loja Innove" className="logo" />
        </Link>   
      </div>
      <div className="container">     
        <Link to="/" className="menu-toggle" aria-label="Go to favorites">
           <FaHome   />
        </Link>        
        <Link to="/produtos" className="menu-toggle" aria-label="Go to produtos">
           <FaBoxOpen   />
        </Link>
        <Link to="/favoritos" className="menu-toggle" aria-label="Go to favorites">
           <FaHeart   />
        </Link>
        <Link to="/carrinho" className="menu-toggle" aria-label="Go to cart">
           <FaShoppingCart  />
        </Link>

        {usuario ? (
          <button onClick={handleLogout} className="menu-toggle" aria-label="Sair">
            <FiLogOut />
          </button>
        ) : (
          <Link to="/login" className="menu-toggle" aria-label="Entrar">
            <FiLogIn />
          </Link>
        )}
    
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <FaBars />
        </button>
        <nav className={`nav ${menuAberto ? 'ativo' : ''}`}>
          <Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : ''}>
            <FaHome className="icon" /> Home
          </Link>
          <Link to="/produtos" onClick={closeMenu} className={location.pathname === '/produtos' ? 'active' : ''}>
            <FaBoxOpen className="icon" /> Produtos
          </Link>
          <Link to="/carrinho" onClick={closeMenu} className={location.pathname === '/carrinho' ? 'active' : ''}>
            <FaShoppingCart className="icon" /> Carrinho
          </Link>
          <Link to="/favoritos" onClick={closeMenu} className={location.pathname === '/favoritos' ? 'active' : ''}>
            <FaHeart className="icon" /> Favoritos
          </Link>
          <Link to="/pedidos" onClick={closeMenu} className={location.pathname === '/pedido' ? 'active' : ''}>
           <FaIndent   className="icon" /> Pedidos
          </Link>
          <Link to="/perfil" onClick={closeMenu} className={location.pathname === '/perfil' ? 'active' : ''}>
            <FaUser className="icon" /> Perfil
          </Link>
          <Link to="/rastrear" onClick={closeMenu} className={location.pathname === '/rastrear' ? 'active' : ''}>
            <FaHistory    className="icon" /> Rastrear
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
