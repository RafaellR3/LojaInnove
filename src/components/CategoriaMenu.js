import {BASE_URL} from '../services/api';
import '../styles/CategoriaMenu.css';


const CategoriaMenu = ({categorias}) => {
  return (
    <nav className="categoria-menu">
      {categorias.map(cat => (
        <a key={cat.nome} href={`#${cat.nome}`} className="categoria-link">
          <img src={`${BASE_URL}${cat.urlImagem}`} alt={cat.nome}  className='icone'/>
        </a>
      ))}
    </nav>
  );
};

export default CategoriaMenu;
