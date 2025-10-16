import '../styles/ProdutoItem.css';
import ProdutoItem from './ProdutoItem';

const ListaPorCategoria = ({ categoria, produtos }) => {
  const filtrados = produtos.filter(prod => prod.codigoCategoria === categoria.id);


  if (filtrados.length === 0) return null;

  return (
    <div > 
      <section id={categoria.id} style={{ marginBottom: '40px' }}>
        <h2>{categoria.nome}</h2>
        <div className="produto-item-lista"> 
          {filtrados.map(prod => (
            <ProdutoItem key={prod.id} produto={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ListaPorCategoria;
