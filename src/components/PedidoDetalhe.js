import '../styles/Pedidos.css';

const PedidoDetalhe = ({pedido}) =>{
    
    

    return(
        <div className="itenspedido" style={{ marginTop: '5px', padding: '10px', border: '1px solid #ddd' }}>  
        {pedido.itens.map(item => (
          <div  className="listaitens" key={item.id} style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
              <div>
                  <span className="listaitemspan">{item.produto.nome} - Quant: {item.quantidade} </span>
              </div>                            
          </div>
        ))}
        <button> Comprar novamente</button>
        </div>
    );

};
export default PedidoDetalhe;