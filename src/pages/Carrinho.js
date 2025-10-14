import { useState, useEffect,useContext } from 'react';
import {get, post, del} from '../services/api';
import CarrinhoItem from '../components/CarrinhoItem';
import EnderecoCarrinho from '../components/EnderecoCarrinho';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../components/AuthContext";

const Carrinhos = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [valorTotal, setValorTotal] = useState(carrinho.valorTotal)
  const [enderecoSelecionado, setEndereco] = useState(null);
  const [erro, setErro] = useState(null);  
  const [carrinhoItens, setCarrinhoItens] = useState(carrinho.itens);
  const navigate = useNavigate();   
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    get(`carrinho/${usuario.response.id}/RecuperarPorUsuario`)
    .then(data => {
      setCarrinho (data);      
      setCarrinhoItens (data.itens);
      setValorTotal(data.valorTotal);
      setCarregando(false);
    })
    .catch(err => {
      console.error(err);
      setCarregando(false);
    });
    }, [usuario.response?.id]);

  const atualizarCarrinho = (valor) => {
    setValorTotal(valor);
  }

  const atualizaCarrinhoItens = (itens) =>{
    setCarrinhoItens(itens)
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
      CodigoUsuario: `${usuario.response.id}`,
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
    
        await del(`carrinho/LimparCarrinhoUsuario/${usuario.response.id}`);
    
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

if (!carrinhoItens || carrinhoItens.length === 0)
  return <p>Seu carrinho está vazio.</p>;

return (    
  <div style={{ padding: '16px' }}>
    <div>    
        {carrinhoItens.map(item => (
          <CarrinhoItem
            key={item}
            carrinhoItem={item}
            onAtualizarCarrinho={atualizarCarrinho}
            onAtualizaCarrinhoItens={atualizaCarrinhoItens}
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