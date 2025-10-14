import {get} from '../services/api';
import { useEffect, useState, useContext } from 'react';
import PedidosPorStatus from '../components/PedidosPorStatus.js';
import { FaSpinner} from 'react-icons/fa';
import { FiRefreshCw } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { AuthContext } from "../components/AuthContext";

const Pedidos =() => {
    const [pedidos, setPedidos] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        get(`pedido/${usuario.response.id}/PedidosPorUsuario`)
        .then( data => {
            setPedidos(data)
            setCarregando(false)
            .catch(err => console.error('Erro ao buscar pedidos.', err));
        })
        .catch(erro => {
            console.error(erro)
            setCarregando(false)
        })
    
  }, [usuario.response?.id]);

  const atualizar = () =>{
        setCarregando(true);
        get(`pedido/${usuario.response.id}/PedidosPorUsuario`)
        .then( data => {
            setPedidos(data)
            setCarregando(false)
            .catch(err => console.error('Erro ao buscar pedidos.', err));
        })
        .catch(erro => {
            console.error(erro)
            setCarregando(false)
        })

        if (carregando) return <p>Carregando pedidos... <FaSpinner className="spinner" /></p>;
        if (!pedidos) return <p>Nenhum pedido encontrado</p>;
  };
  if (carregando) return <p>Carregando pedidos... <FaSpinner className="spinner" /></p>;
    if (!pedidos) return <p>Nenhum pedido encontrado</p>;

    const pedidosCriados = pedidos.filter(p => p.status === 0);
    const pedidosConfirmados = pedidos.filter(p => p.status === 1)
    const pedidosEnviados= pedidos.filter(p => p.status === 2)
    const pedidosEntregues = pedidos.filter(p => p.status === 3)
    const pedidosCancelados = pedidos.filter(p => p.status === 4)
    const pedidosRecusados = pedidos.filter(p => p.status === 5)

    return(
        <div className="App">
            <div>               
                <h2>Pedidos    
                    <Link onClick={atualizar} >
                          <FiRefreshCw /> 
                    </Link>
                </h2>
                <PedidosPorStatus status={'Criados'} pedidos={pedidosCriados} />
                <PedidosPorStatus status={'Confirmados'} pedidos={pedidosConfirmados} />
                <PedidosPorStatus status={'Enviados'} pedidos={pedidosEnviados} />
                <PedidosPorStatus status={'Entregues'} pedidos={pedidosEntregues} />
                <PedidosPorStatus status={'Cancelados'} pedidos={pedidosCancelados} />
                <PedidosPorStatus status={'Recusados'} pedidos={pedidosRecusados} />
            </div>

        </div>
    )
}

export default Pedidos;