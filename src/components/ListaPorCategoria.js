import React from 'react';
import ProdutoItem from './ProdutoItem';

const ListaPorCategoria = ({ categoria, produtos }) => {
  const filtrados = produtos;

  if (filtrados.length === 0) return null;

  return (
    <section id={categoria} style={{ marginBottom: '40px' }}>
      <h2>{categoria}</h2>
      <div>
        {filtrados.map(prod => (
          <ProdutoItem key={prod.id} produto={prod} />
        ))}
      </div>
    </section>
  );
};

export default ListaPorCategoria;
