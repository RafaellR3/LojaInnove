import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import '../styles/ProdutoDetalhe.css'; 
import { get, post, BASE_URL } from '../services/api';
import { FaSpinner, FaWhatsapp, FaFacebook, FaInstagram  } from 'react-icons/fa';
import { AuthContext } from "../components/AuthContext";
import ListaProdutos from '../components/ListaProdutos';

const ProdutoDetalhe = () => {
  const { id } = useParams();  // Captura o id da URL
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [produtosRelacionados, setProdutosRelacionados] = useState([]); 
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    get(`produto/${id}/pesquisarporid`)
      .then(data => {
        if (!data || !data.id) {
          throw new Error('Produto inválido');
        }
        setProduto(data);
        setCarregando(false);

        get('produto')
          .then(relacionados => setProdutosRelacionados(relacionados))
          .catch(err => console.error('Erro ao buscar produtos relacionados:', err));
      })
      .catch(err => {
        console.error(err);
        setCarregando(false);
      });
  }, [id]);  

  const relacionadosFiltrados = produtosRelacionados.filter((prod => prod.codigoCategoria === produto.codigoCategoria));

  const aumentar = () => {
    if (produto && quantidade < produto.estoque) {
      setQuantidade(prev => prev + 1);
    }
  };

  const diminuir = () => {
    if (quantidade > 1) {
      setQuantidade(prev => prev - 1);
    }
  };

const adicionarAoCarrinho = () => {
    const produtoCarrinho = {
      CodigoProduto: produto.id,
      Quant: quantidade,
      PrecoUn: produto.preco,
      ValorTotal: quantidade * produto.preco,
      CodigoUsuario: `${usuario.response.id}`,
    };

    post('Carrinho/AdicionarItem', produtoCarrinho)
    .then(data => {
      console.log("Produto adicionado ao carrinho:", data);
      alert(`${quantidade}x ${produto.nome} foi adicionado ao carrinho!`);

      navigate('/produtos');
    })
    .catch(err => {
      console.error("Erro ao adicionar ao carrinho:", err);
      alert("Ocorreu um erro ao adicionar o produto ao carrinho.");
    });
  };


  if (carregando) return <p>Carregando detalhes<FaSpinner className="spinner" /></p>;

  console.log("Produto retornado:", produto);

  if (!carregando && (!produto || !produto.id)) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="produto-detalhe">
      <div className="produto-imagem-detalhe">
        <img src={`${BASE_URL}${produto.urlImagem}`} alt={produto.nome} />
      </div>
      <div className="produto-info">
        <h2>{produto.nome}</h2>
        <p>{produto.descricao}</p>
        <p><strong>Preço:</strong> R${produto.preco?.toFixed(2)}</p>
        <p><strong>Estoque:</strong> {produto.estoque}</p>
  
        <div className="produto-controles">
          <div className="controle-quantidade">
            <button onClick={diminuir}>-</button>
            <span>{quantidade}</span>
            <button onClick={aumentar}>+</button>
            <button onClick={adicionarAoCarrinho}>Incluir no carrinho</button>
          </div>
  
          <div className="totalizador">
            <strong>Total: R$ {(quantidade * produto.preco).toFixed(2)}</strong>
          </div>
        </div>       
  
        {/* Botões de compartilhamento */}
        <h3>Compartilhar</h3>
        <div className="compartilhar">

          <button><FaWhatsapp className="icon-compartilhar"></FaWhatsapp></button>
          <button><FaFacebook className="icon-compartilhar"> </FaFacebook></button>
          <button><FaInstagram className="icon-compartilhar"></FaInstagram ></button>
        </div>
      </div>
  
      {/* Produtos relacionados abaixo */}
      <div className="produtos-relacionados">
        <h3>Produtos Relacionados</h3>
        <div className="produto-item-lista">
          {relacionadosFiltrados.length > 0 ? (
           <ListaProdutos produtos={relacionadosFiltrados} />
          ) : (
            <p>Sem produtos relacionados no momento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhe;
