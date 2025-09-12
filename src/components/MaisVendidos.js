import React, { useEffect, useState } from 'react';
import { get, BASE_URL} from '../services/api';
import '../styles/MaisVendidos.css';
import { Link } from 'react-router-dom';

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

  if (carregando) return <p> Carregando produtos...</p>;
  if (erro) return <p style={{ color: 'red' }}> {erro}</p>;

  return (
    <section className="mais-vendidos">
      <h2>Mais Vendidos</h2>
      <div className="lista-produtos">
        {produtos.map(prod => (
          <Link to={`/produto/${prod.id}`} className="produto-item-link">
            <div key={prod.id} className="produto-item">
              <img src={`${BASE_URL}${prod.urlImagem}`} alt={prod.nome} />
              <span className="nome">{prod.nome}</span>
              <span className="preco">R$ {prod.preco.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MaisVendidos;
