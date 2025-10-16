import { useState, useContext } from 'react';
import { Link, useLocation,useNavigate  } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaShoppingCart, FaHeart, FaUser, FaIndent, FaBars  } from 'react-icons/fa';
import { FiLogIn, FiLogOut  } from 'react-icons/fi';
import '../styles/Header.css';
import { AuthContext} from "./AuthContext";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();  
  const { usuario } = useContext(AuthContext);  
  const { logout } = useContext(AuthContext);  
  const navigate = useNavigate();  
  const [busca, setBusca] = useState("");

const handleLogout = () => {
    const confirmar = window.confirm("Tem certeza que deseja sair?");
    if (confirmar) {
      logout();
      navigate("/login");
    }
  };

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const closeMenu = () => setMenuAberto(false);

  const handleSearch = () => {
    console.log("Pesquisar:", busca);
    // aqui você pode disparar a busca na lista de produtos, por exemplo
  };
  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" onClick={closeMenu} className="logo-link">
          <img src="images/innove-suprimentos.png" alt="Loja Innove" className="logo" />
        </Link>     
        <Link to="/" className="menu-toggle" aria-label="Go to favorites">
           <FaHome   />
        </Link>        
        <Link to="/produtos" className="menu-toggle" aria-label="Go to produtos">
           <FaBoxOpen   />
        </Link>
      
        <Link to="/carrinho" className="menu-toggle" aria-label="Go to cart">
           <FaShoppingCart  />
        </Link>

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
        {/*     <Link to="/rastrear" onClick={closeMenu} className={location.pathname === '/rastrear' ? 'active' : ''}>
            <FaHistory    className="icon" /> Rastrear
          </Link> */}
          {usuario ? (
            <Link onClick={handleLogout} className="icon">
              <FiLogOut  className="icon"/> Sair
            </Link>
          ) : (
            <Link to="/login" className="icon" >
              <FiLogIn /> Login
            </Link>
          )}
    
        </nav>
        
      </div>
       <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Procurar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <span className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </form>
    </header>
  );
};

export default Header;
