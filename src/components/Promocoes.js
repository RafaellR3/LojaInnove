import React, { useEffect, useState } from 'react';
import { get, BASE_URL } from '../services/api';
import '../styles/Promocoes.css';
import { Link } from 'react-router-dom';

const Promocoes = () => {
  const [promocoes, setPromocoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    get('promocao') // exemplo de endpoint
      .then(data => {
        setPromocoes(data);
        setCarregando(false);
      })
      .catch(err => {
        setErro(err.message);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p> Carregando promoções...</p>;
  if (erro) return <p style={{ color: 'red' }}> {erro}</p>;

  return (
    <section className="promocoes">
      <h2>Promoções</h2>
      <div className="lista-promocoes">
        {promocoes.map(prod => (
          <Link to={`/produto/${prod.produto.id}`} className="produto-item-link">
          <div key={prod.produto.id} className="produto-item">
            <img src={`${BASE_URL}${prod.produto.urlImagem}`} alt={prod.nome} />
            <span className="nome">{prod.produto.nome}</span>
            <span className="preco-original">R$ {prod.valorOriginal.toFixed(2)}</span>
            <span className="preco-promocional"> R$ {prod.valorPromocao.toFixed(2)}</span>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Promocoes;
