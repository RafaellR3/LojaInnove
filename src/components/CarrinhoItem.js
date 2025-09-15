import React, {useState}  from 'react';
import '../styles/CarrinhoItem.css';
import { put, del, BASE_URL} from '../services/api';

const CarrinhoItem = ({ carrinhoItem, onAtualizarCarrinho, onAtualizaCarrinhoItens }) => {
const [quantidade, setQuantidade] = useState(carrinhoItem.quant);

    const aumentar = () => {
        setQuantidade(prev => prev + 1);
        const dados =
        {
          codigoCarrinhoItem: carrinhoItem.id,
          quant: quantidade
        }
        put('Carrinho/AlterarQuantidadeItem', dados)        
        .then( data=> {onAtualizarCarrinho(data.valorTotal);})
        .catch(err => {
          alert(`Ocorreu um erro ao alterar a quantidade do item. ${err}`);
          setQuantidade(prev => prev - 1);
        });
    };
    
    const diminuir = () => { 
        if (quantidade > 1) {
            setQuantidade(prev => prev - 1);
            const dados = {
                codigoCarrinhoItem: carrinhoItem.id,
                quant: quantidade
            }
            put('Carrinho/AlterarQuantidadeItem', dados)
            .then( data=> {onAtualizarCarrinho(data.valorTotal);})
            .catch(err => {
                alert(`Ocorreu um erro ao alterar a quantidade do item. ${err}`);
                setQuantidade(prev => prev + 1);
            });
        }
    };      
    
    const removerDoCarrinho = () => {
      if (!window.confirm("Tem certeza que deseja remover o item do carrinho?")){
            return;
        }
      del(`Carrinho/RemoverItem/${carrinhoItem.id}`)
      .then(data => {onAtualizaCarrinhoItens(data.itens); onAtualizarCarrinho(data.valorTotal)})
      .catch(err => {
        console.error("Erro ao remover do carrinho:", err);
        alert("Ocorreu um erro ao remover o produto do carrinho.");
      });
    }; 

    return (
        <div className="produto-carrinho">
            <div className="produto-imagem-carrinho">
                <img src={`${BASE_URL}${carrinhoItem.produto.urlImagem}`} alt={carrinhoItem.produto.nome} />
            </div>
            <div className="produto-info-carrinho">    
                <div key={carrinhoItem.id} className="produto-item-carrinho">
                    <h3>{carrinhoItem.produto.nome}</h3>
                    <p><strong>Preço:</strong> R$ {carrinhoItem.precoUn?.toFixed(2)}</p>
                    <div className="totalizador-carrinho">
                        <strong>Total: R$ {(quantidade * carrinhoItem.precoUn).toFixed(2)}</strong>
                        </div>
                    </div>
                    <div className="produto-controles">
                    <div className="controle-quantidade">
                        <button onClick={diminuir}>-</button>
                        <span>{quantidade}</span>
                        <button onClick={aumentar}>+</button>
                        <button onClick={removerDoCarrinho}>Remover</button>
                    </div>


                </div>
            </div>   
        </div>
    );
  };
  
  export default CarrinhoItem;