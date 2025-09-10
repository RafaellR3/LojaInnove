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


if (carregando) return <p>Carregando carrinho...</p>;

if (!carrinho){
  return <p>Carrinho vazio.</p>;
}

return (    
  <div style={{ padding: '16px' }}>
        {carrinho.itens.map(item => (
          <CarrinhoItem
            key={item}
            carrinhoItem={item}
            onAtualizarCarrinho={atualizarCarrinho}
          />
        ))}
        <h3>Total: R$ {valorTotal}</h3>
        <EnderecoCarrinho />
        <button className='confirmar'> Confirmar Pedido </button>
      </div>
  );
};
export default Carrinhos;