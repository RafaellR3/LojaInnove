import React, { useEffect, useState } from 'react';
import { get, BASE_URL} from '../services/api';
import '../styles/MaisVendidos.css';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const MaisVendidos = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    get('Produto/RecuperarProdutosMaisVendidos')
      .then(data => {
        setProdutos(data);
        setCarregando(false);
      })
      .catch(err => {
        setErro(err.message || 'Erro inesperado');
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p>Carregando mais vendidos... <FaSpinner className="spinner" /></p>;
  if (erro) return <p style={{ color: 'red' }}> {erro}</p>;

  return (
    <section className="mais-vendidos">
      <h2>Mais Vendidos</h2>
      <div className="lista-produtos-maisvendidos">
        {produtos.map(prod => (
          <Link to={`/produto/${prod.id}`} className="produto-item-link-maisvendido">
            <div key={prod.id} className="produto-item-maisvendidos">
              <img src={`${BASE_URL}${prod.urlImagem}`} alt={prod.nome} />
              <span className="nome-maisvendidos">{prod.nome}</span>
              <span className="preco-maisvendidos">R$ {prod.preco.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MaisVendidos;
