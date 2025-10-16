import { useEffect, useState } from 'react';
import { get, BASE_URL } from '../services/api';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CategoriaMenu from '../components/CategoriaMenu';
import { FaSpinner } from 'react-icons/fa';
import '../styles/ProdutoItem.css';


const Produtos = () => {
  const location = useLocation();
  const { cat, categorias } = location.state || {};

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {    
    setCarregando(true);
    get(`produto/${cat.id}/PesquisarPorCategoria`)
      .then(data => {
        setProdutos(data);
        setCarregando(false);
      })
      .catch(err => {
        console.error(err);
        setCarregando(false);
      });
  }, [cat.id]);

  if (carregando) return(
    <div className="produto-lista"> 
      <CategoriaMenu categorias={categorias} />
      <h3>{cat.nome}</h3>
      <p>Carregando produtos... <FaSpinner className="spinner" /></p>;
    </div>
  ) 

  return (
    <div className="produto-lista"> 
      <CategoriaMenu categorias={categorias} />
      <h3>{cat.nome}</h3>
      <div className="produto-item-lista">
        {produtos.map(produto => (
          <Link to={`/produto/${produto.id}`} className="produto-item-link">
            <div className="produto-imagem">
            <img src={`${BASE_URL}${produto.urlImagem}`} alt={produto.nome}/>
            </div>
            <div className="produto-dados">
              <h4>{produto.nome}</h4>
              <p className="preco">R$ {produto.preco.toFixed(2)}</p>
              <p className="estoque">Estoque: {produto.estoque}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Produtos;
