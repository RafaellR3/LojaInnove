import "../styles/OrderTimeline.css";
import { get} from '../services/api';
import { useEffect, useState,useContext } from 'react';
import { FaSpinner} from 'react-icons/fa';
import { AuthContext } from "../components/AuthContext";


const Rastrear =()=>{
    const [pedidos, setPedidos] =useState();
    const [carregando, setCarregando] = useState(true); 
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        get(`pedido/${usuario.response.id}/PedidosEmAbertoPorUsuario`)
        .then( data => {
            setPedidos(data)
            setCarregando(false) 
            .catch(err => console.error('Erro ao buscar pedido.', err));
        })
        .catch(err => {
            console.error(err)
            setCarregando(false)
        })
    }, [usuario.response?.id]);

    const steps = [
      { value: 0, label: "Criado" },
      { value: 1, label: "Confirmado" },
      { value: 2, label: "Enviado" },
      { value: 3, label: "Entregue" }
    ];

    if (carregando) return <p>Carregando pedidos... <FaSpinner className="spinner" /></p>;
    if (!pedidos) return <p>Nenhum pedido em aberto localizado</p>;
    
    const pedidosOrdenados = [...pedidos].sort((a, b) => new Date(b.data) - new Date(a.data));
return (
    <div className="page-rastrear">
      {pedidosOrdenados.map((pedido) => (
        <div className="acompanhar-pedido" key={pedido.id || pedido.codigoErp}>
          <h5>
            Pedido {pedido.numero} - {new Date(pedido.data).toLocaleDateString('pt-BR')}
          </h5>
          <div className="timeline-container">
            {steps.map((step, index) => {
              const isCompleted = step.value <= pedido.status;
              return (
                <div key={step.value} className="timeline-step">
                  <div className={`circle ${isCompleted ? "completed" : ""}`}>
                    {step.label}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`line ${step.value < pedido.status ? "completed" : ""}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rastrear;