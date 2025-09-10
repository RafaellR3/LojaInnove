import React, { useState, useEffect } from 'react';
import {get, CODIGO_USUARIO} from '../services/api';
import CarrinhoItem from '../components/CarrinhoItem';
import EnderecoCarrinho from '../components/EnderecoCarrinho';

const Carrinhos = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [valorTotal, setValorTotal] = useState(carrinho.valorTotal);

  useEffect(() => {
    get(`carrinho/${CODIGO_USUARIO}/RecuperarPorUsuario`)
    .then(data => {
      setCarrinho (data);
      setValorTotal(data.valorTotal);
      setCarregando(false);
    })
    .catch(err => {
      console.error(err);
      setCarregando(false);
    });
    }, []);

  const atualizarCarrinho = (valor) => {
    setValorTotal(valor);
  }


  const handleConfirmar = () => {
    if (!enderecoSelecionado) {
      alert("Por favor, selecione um endereço.");
      return;
    }
    const pedido = {
      CodigoUsuario: `${CODIGO_USUARIO}`,
      Rua: enderecoSelecionado.Rua,
      Cidade: enderecoSelecionado.Cidade,
      Bairro: enderecoSelecionado.Bairro,
      Complemento: enderecoSelecionado.Complemento,
      Numero: enderecoSelecionado.Numero,
      Itens: carrinho.itens.map(item => ({
        CodigoProduto: item.id,
        Quantidade: item.Quantidade,
        PrecoUn: item.PrecoUn
      })),
      Total: carrinho.valorTotal
    }

    // Enviar PUT para atualizar o endereço
    post(`pedido`, pedido)
      .then(response => {
        window.history.back();
      })
      .catch(err => {
        setErro(err.message || 'Erro ao inserir pedido.');
      });
      
  };

if (carregando) return <p>Carregando carrinho...</p>;

if (!carrinho){
  return <p>Carrinho vazio.</p>;
}

return (    
  <div style={{ padding: '16px' }}>
    <div>    
        {carrinho.itens.map(item => (
          <CarrinhoItem
            key={item}
            carrinhoItem={item}
            onAtualizarCarrinho={atualizarCarrinho}
          />
        ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Total:</h3>
        <h3>R$ {valorTotal}</h3>
    </div>
     <div>
        <EnderecoCarrinho />
        <button className='botao-enderecos' onClick={handleConfirmar}> Confirmar Pedido </button> 
     </div>    
  </div>
  );
};
export default Carrinhos;