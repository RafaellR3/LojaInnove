import React from 'react';
import '../styles/ProdutoItem.css';
import { BASE_URL} from '../services/api';
import { Link } from 'react-router-dom';

const ProdutoItem = ({ produto }) => {
    return (
      <div className="produto-item-lista"> 
      <Link to={`/produto/${produto.id}`} className="produto-item-link">
        <div className="produto-imagem">
        <img src={`${BASE_URL}${produto.urlImagem}`} alt={produto.nome} className='icon'/>
        </div>
        <div className="produto-dados">
          <h4>{produto.nome}</h4>
          <p className='descricao'>{produto.descricao}</p>
          <p className="preco">R$ {produto.preco.toFixed(2)}</p>
          <p className="estoque">Estoque: {produto.estoque}</p>
        </div>
      </Link>
      </div>
    );
  };
  
  export default ProdutoItem;