import { get} from  '../services/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Enderecos = () => {
    const { id } = useParams(); 
    const [enderecos, setEnderecos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        setCarregando(true);
        setErro(null);
    
        get(`EnderecoUsuario/${id}/RecuperarPorUsuario`) 
          .then(data => {
            setEnderecos(data);
            setCarregando(false);
          })
          .catch(err => {
            setErro(err.message || 'Erro inesperado');
            setCarregando(false);
          });
      }, [id]);

      if (carregando) return <p> Carregando endereços...</p>;
      if (erro) return <p style={{ color: 'red' }}> {erro}</p>;
  
        if (!enderecos){
            return <p>Nenhum endereço cadastrado.</p>;
        }
    return (
      <div>
        <div style={{ padding: '16px' }}>
          {enderecos.map(endereco => (
            <div className="endereco-selecionado">
                <div key={endereco.id} >
                    <span className="nome">Rua: {endereco.rua}, Num.: {endereco.numero}</span>
                    <span className="nome">Cidade: {endereco.cidade}</span>
                    <span className="nome">Bairro: {endereco.bairro}</span>
                    <span className="nome">CEP: {endereco.cep}</span>
                    <span >
                        Padrão <input type="checkbox" checked={endereco.padrao} disabled /> 
                    </span>
                </div>
            </div>        
          ))}
        </div>
        <div></div>
        <div>
            <button className='confirmar' onClick={() => window.history.back()}>
                Voltar
            </button>
        </div>

      </div>
    );
  };
  
  export default Enderecos;
  