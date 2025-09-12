import React, { useEffect, useState } from 'react';
import { get } from '../services/api';
import CategoriaMenu from '../components/CategoriaMenu';
import ListaPorCategoria from '../components/ListaPorCategoria';
import { FaSpinner } from 'react-icons/fa';


const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    get('categoria')
      .then(data => {
        setCategorias(data);
        setCarregando(false);
      })
      .catch(err => {
        console.error(err);
        setCarregando(false);
      });
  }, []);

  useEffect(() => {
    get('produto')
      .then(data => {
        setProdutos(data);
        setCarregando(false);
      })
      .catch(err => {
        console.error(err);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p>Carregando produtos... <FaSpinner className="spinner" /></p>;

  return (
    <div>
      <CategoriaMenu categorias={categorias} />
      <div style={{ padding: '16px' }}>
        {categorias.map(categoria => (
          <ListaPorCategoria
            key={categoria}
            categoria={categoria}
            produtos={produtos}
          />
        ))}
      </div>
    </div>
  );
};

export default Produtos;
