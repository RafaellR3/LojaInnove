import React from 'react';
import '../styles/Categorias.css';

const categorias = [
  { nome: 'Limpeza', imagem: '/images/limpeza.png' },
  { nome: 'Escritório', imagem: '../images/escritorio.png' },
  { nome: 'Informática', imagem: '../images/informatica.png' },
  { nome: 'Segurança', imagem: '../images/seguranca.png' },
];

const Categoria = () => {
  return (
    <section className="categorias">
      <h2>Categorias</h2>
      <div className="lista-categorias">
        {categorias.map((cat, index) => (
          <div key={index} className="categoria-item">
            <img src={cat.imagem} alt={cat.nome} />
            <span>{cat.nome}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categoria;
