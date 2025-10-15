import {BASE_URL} from '../services/api';
import '../styles/CategoriaMenu.css';
import { useNavigate } from 'react-router-dom';


const CategoriaMenu = ({categorias}) => {
  const navigate = useNavigate();

  return (
    <nav >
      <div>
        <span className="span">Categorias</span>
      </div>
      <div  className="categoria-menu">
      {categorias.map((cat, index)  => (              
        <div key={index}
             className="categoria-menu-item"
             onClick={() => navigate('/produtoporcategoria', { state: { cat: cat, categorias: categorias } })}
             style={{ cursor: 'pointer' }}>
           <img src={`${BASE_URL}${cat.urlImagem}`} alt={cat.nome}  className='icone'/>
        </div>
            ))}
      </div>
      
    </nav>
  );
};

export default CategoriaMenu;
