import React, { useState, useEffect } from 'react';
import {get, post, del, CODIGO_USUARIO} from '../services/api';
import CarrinhoItem from '../components/CarrinhoItem';
import EnderecoCarrinho from '../components/EnderecoCarrinho';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Carrinhos = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [valorTotal, setValorTotal] = useState(carrinho.valorTotal)
  const [enderecoSelecionado, setEndereco] = useState(null);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

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


  const handleConfirmar =async () => {
    if (!enderecoSelecionado) {
      alert("Por favor, selecione um endereço.");
      return;
    }

    if (!window.confirm("Tem certeza que deseja cofirmar o pedido?")){
      return;
    }

    const pedido = {
      CodigoUsuario: `${CODIGO_USUARIO}`,
      Rua: enderecoSelecionado.rua,
      Cidade: enderecoSelecionado.cidade,
      Bairro: enderecoSelecionado.bairro,
      Complemento: enderecoSelecionado.complemento,
      Numero: enderecoSelecionado.numero,
      Itens: carrinho.itens.map(item => ({
        CodigoProduto: item.codigoProduto,
        Quantidade: item.quant,
        PrecoUn: item.precoUn
      })),
      Total: carrinho.valorTotal
    }

    try {
        const response = await post(`pedido`, pedido);
        console.log(`Pedido cadastrado com sucesso: ${response.codigoErp}`);
        alert(`Pedido cadastrado com sucesso. Número do pedido: ${response.codigoErp}`);
    
        await del(`carrinho/LimparCarrinhoUsuario/${CODIGO_USUARIO}`);
    
        navigate('/rastrear');
      } catch (err) {
        setErro(err.message || 'Erro ao inserir pedido ou limpar carrinho.');
      }
  }
    
 const handleEnderecoSelecionado = (endereco) => {
  setEndereco(endereco);;
};

if (erro) return <p style={{ color: 'red' }}> {erro}</p>;

if (carregando) return <p>Carregando carrinho... <FaSpinner className="spinner" /></p>;

if (!carrinho.itens){
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
        <EnderecoCarrinho  onEnderecoSelecionado={handleEnderecoSelecionado}/>
        <button className='botao-enderecos' onClick={handleConfirmar}> Confirmar Pedido </button> 
     </div>    
  </div>
  );
};
export default Carrinhos;