import React from 'react';
import '../styles/CategoriaMenu.css';

const categorias = [
  { nome: 'Limpeza', icone: '🧼' },
  { nome: 'Escritório', icone: '🖋️' },
  { nome: 'Papelaria', icone: '📚' },
  { nome: 'Segurança', icone: '🛡️' }
];

const CategoriaMenu = () => {
  return (
    <nav className="categoria-menu">
      {categorias.map(cat => (
        <a key={cat.nome} href={`#${cat.nome}`} className="categoria-link">
          <div className="icone">{cat.icone}</div>
          <span>{cat.nome}</span>
        </a>
      ))}
    </nav>
  );
};

export default CategoriaMenu;
