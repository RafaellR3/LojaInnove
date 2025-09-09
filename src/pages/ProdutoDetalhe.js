import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProdutoDetalhe.css'; 
import { get, BASE_URL} from '../services/api';

const ProdutoDetalhe = () => {
  const { id } = useParams();  // Captura o id da URL
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Supondo que você tenha uma função para buscar o produto por id
    get(`produto/${id}/pesquisarporid`)
      .then(data => {
        if (!data || !data.id) {
          throw new Error('Produto inválido');
        }
        setProduto(data);
        setCarregando(false);
      })
      .catch(err => {
        console.error(err);
        setCarregando(false);
      });
  }, [id]);  // Recarrega os dados quando o id mudar

  if (carregando) return <p>Carregando...</p>;
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
        <p><strong>Estoque:</strong> {produto.estoque} </p>

        {/* Adicionar funcionalidades adicionais, como controle de quantidade, etc */}
      </div>
    </div>
  );
};

export default ProdutoDetalhe;
