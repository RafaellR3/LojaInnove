import React, { useState } from 'react';
import '../styles/Pedidos.css';
import PedidoDetalhe from '../components/PedidoDetalhe.js'
import { FaAngleDoubleDown, FaAngleDoubleRight } from "react-icons/fa";

const PedidosPorStatus = ({ status, pedidos }) => {
  const [exibirPedidos, setExibirPedidos] = useState(true);
  const [detalhesAbertos, setDetalhesAbertos] = useState({});

  // Função para alternar a visibilidade da lista de pedidos
  const toggleExibirPedidos = () => {
    setExibirPedidos(!exibirPedidos);
  };

  // Função para alternar a visibilidade dos detalhes de um pedido específico
  const toggleDetalhes = (pedidoId) => {
    setDetalhesAbertos(prevState => ({
      ...prevState,
      [pedidoId]: !prevState[pedidoId],  // Altera o estado de visibilidade para o pedido clicado
    }));
  };

  if (pedidos.length <= 0) return null;

  return (
    <div className="pedidos">
      {/* Título clicável para exibir/ocultar a lista de pedidos */}
      <h3 onClick={toggleExibirPedidos} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>
          {exibirPedidos ? <FaAngleDoubleDown /> : <FaAngleDoubleRight />}
        </span>
        {status}
      </h3>

      {/* Exibe a lista de pedidos apenas se 'exibirPedidos' for true */}
      {exibirPedidos && pedidos.length > 0 && (
        <div className="listapedidos">
          {pedidos.map((pedido) => (
            <div className="listapedidos-item" key={pedido.id} style={{ marginBottom: '10px' }}>
              <div>
                <span className="nome">Número: {pedido.numero} - Quant itens: {pedido.quant}</span>
                <span className="nome">Data: {new Date(pedido.data).toLocaleDateString('pt-BR')}</span>
                <span className="nome">Total: R$ {pedido.total}</span>
              </div>


              <button className='compartilhar' onClick={() => toggleDetalhes(pedido.id)} style={{ marginTop: '10px' }}>
                {detalhesAbertos[pedido.id] ? 'Ocultar Detalhes' : 'Exibir Detalhes'}
              </button>


              {detalhesAbertos[pedido.id] && <PedidoDetalhe pedido={pedido} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidosPorStatus;
