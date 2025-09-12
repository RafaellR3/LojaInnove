import "../styles/OrderTimeline.css";
import {get} from '../services/api';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { FaSpinner} from 'react-icons/fa';


const AcompanharPedido =()=>{
    const {pedidoid} = useParams(); 
    const [pedido, setPedido] =useState();
    const [carregando, setCarregando] = useState(true); 
    const [currentStepIndex, setCurrentStatus] = useState(0);

    useEffect(() => {
        get(`pedido/${pedidoid}/PesquisarPorId`)
        .then( data => {
            setPedido(data)
            setCarregando(false)
            setCurrentStatus(data.status)
            .catch(err => console.error('Erro ao buscar pedido.', err));
        })
        .catch(erro => {
            console.error(erro)
            setCarregando(false)
        })

    }, [pedidoid]);
    console.log(pedido)
    const steps = [0, 1, 2, 3];
    if (carregando) return <p>Carregando pedido... <FaSpinner className="spinner" /></p>;
    if (!pedido) return <p>Pedido não localizado</p>;
    return (
        <div><h3>Pedido - {pedido.codigoErp}</h3>
        <div className="timeline-container">
            
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
    
            return (
              <div key={step} className="timeline-step">
                <div className={`circle ${isCompleted ? "completed" : ""}`}>
                  {isCompleted ? "✔️" : index + 1}
                </div>
                <div className={`label ${isCompleted ? "completed" : ""}`}>
                  {step}
                </div>
                {index < steps.length - 1 && (
                  <div className={`line ${index < currentStepIndex ? "completed" : ""}`} />
                )}
              </div>
            );
          })}
        </div>
        </div>
      );
    };
export default AcompanharPedido;