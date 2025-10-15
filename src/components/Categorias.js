import { useEffect, useState } from 'react';
import { get, BASE_URL } from '../services/api';
import '../styles/Categorias.css';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const Categoria = () => {  

  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCarregando(true);
    get('categoria') // exemplo de endpoint
      .then(data => {
        setCategorias(data);
        setCarregando(false);
      })
      .catch(err => {
        setErro(err.message);
        setCarregando(false);
      });
  }, []);
  if (carregando) return <p>Carregando categorias... <FaSpinner className="spinner" /></p>;
  if (erro) return <p style={{ color: 'red' }}> {erro}</p>;


  return (
    <section className="categorias">
      <h2>Categorias</h2>
      <div className="lista-categorias">
        {categorias.map((cat, index) => (
           <div
              key={index}
              className="categoria-item"
              onClick={() => navigate('/produtoporcategoria', { state: { cat: cat, categorias: categorias } })}
              style={{ cursor: 'pointer' }} // muda o cursor para indicar clique
            >
            <img src={`${BASE_URL}/${cat.urlImagem}`} alt={cat.nome} />
            <span>{cat.nome}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categoria;
