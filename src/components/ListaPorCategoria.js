import React from 'react';
import ProdutoItem from './ProdutoItem';

const ListaPorCategoria = ({ categoria, produtos }) => {
  const filtrados = produtos.filter(prod => prod.codigoCategoria === categoria.id);


  if (filtrados.length === 0) return null;

  return (
    <section id={categoria.id} style={{ marginBottom: '40px' }}>
      <h2>{categoria.nome}</h2>
      <div>
        {filtrados.map(prod => (
          <ProdutoItem key={prod.id} produto={prod} />
        ))}
      </div>
    </section>
  );
};

export default ListaPorCategoria;
