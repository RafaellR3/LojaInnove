
const PedidoDetalhe = ({itens}) =>{
    
    if (!itens) return <p>Nenhum item encontrado</p>;

    return(
        <div className="itenspedido">  
        {itens.map(item => (
          <div  className="listaitens" key={item.id} style={{ marginBottom: '10px' }}>
              <div>
                  <span className="nome">Item: {item.produto.nome} - Quant: {item.quant} </span>
              </div>                            
          </div>
        ))}
        </div>
    );

};
export default PedidoDetalhe;