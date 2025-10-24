import '../styles/ProdutoItem.css';
import ProdutoItem from './ProdutoItem';

const ListaProdutos = ({ produtos }) => {

  return (
    <div > 
      <div className="produto-item-lista"> 
        {produtos.map(prod => (
          <ProdutoItem key={prod.id} produto={prod} />
        ))}
      </div>
    </div>
  );
};

export default ListaProdutos;
