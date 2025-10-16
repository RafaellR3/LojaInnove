import '../styles/ProdutoItem.css';
import { BASE_URL} from '../services/api';
import { Link } from 'react-router-dom';

const ProdutoItem = ({ produto }) => {
    return (
      <div >        
        <Link to={`/produto/${produto.id}`} className="produto-item-link">
          <div className="produto-imagem">
            <img src={`${BASE_URL}${produto.urlImagem}`} alt={produto.nome} />
          </div>
          <div className="produto-dados">
            <h4>{produto.nome}</h4>
            <p className="preco">R$ {produto.preco.toFixed(2)}</p>
            <p className="estoque">Estoque: {produto.estoque}</p>
          </div>
        </Link>
      </div>
    );
  };
  
  export default ProdutoItem;