import '../styles/ProdutoItem.css';
import { BASE_URL} from '../services/api';

const ProdutoItem = ({ produto }) => {
    return (
      <div className="produto-item-lista">
        <div className="produto-imagem">
        <img src={`${BASE_URL}${produto.urlImagem}`} alt={produto.nome} className='icon'/>
        </div>
        <div className="produto-dados">
          <h4>{produto.nome}</h4>
          <p className='descricao'>{produto.descricao}</p>
          <p className="preco">R$ {produto.preco.toFixed(2)}</p>
          <p className="estoque">Estoque: {produto.estoque}</p>
        </div>
      </div>
    );
  };
  
  export default ProdutoItem;