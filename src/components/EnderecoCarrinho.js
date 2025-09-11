import { get,CODIGO_USUARIO} from  '../services/api';
import React, { useEffect, useState } from 'react';
import '../styles/Endereco.css';
import { Link } from 'react-router-dom';

const EnderecoCarrinho = ({ onEnderecoSelecionado })=> {
    const [enderecos, setEnderecos] =useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);



    useEffect(() => {
        setCarregando(true);
        setErro(null);
    
        get(`EnderecoUsuario/${CODIGO_USUARIO}/RecuperarPorUsuario`) 
          .then(data => {
            setEnderecos(data);
            setCarregando(false);
          })
          .catch(err => {
            setErro(err.message || 'Erro inesperado');
            setCarregando(false);
          });
      }, []);
    
    if (!enderecos)
        return <p>Nenhum endereço informado.</p>;
    

    var enderecoSel = enderecos.find(p => p.padrao === true);
   
    console.log(enderecoSel);
    if (!enderecoSel){
        enderecoSel = enderecos[0];

    }
   
    if (!enderecoSel)
       return <p>Nenhum endereço informado.</p>;
   
    if (carregando) return <p> Carregando endereços...</p>;
    if (erro) return <p style={{ color: 'red' }}> {erro}</p>;
    onEnderecoSelecionado(enderecoSel);
  
    return (   
      <section className="mais-vendidos">
        <h3>Endereço de entrega</h3>
        <Link to={`/enderecos/${enderecoSel.codigoUsuario}`} className="produto-item-link">
        <div >
          <div key={enderecoSel.id} >
              <span className="nome">Rua: {enderecoSel.rua}, Num.: {enderecoSel.numero}</span>
              <span className="nome">Cidade: {enderecoSel.cidade}</span>
              <span className="nome">Bairro: {enderecoSel.bairro}</span>
              <span className="nome">CEP: {enderecoSel.cep}</span>
            </div>
        </div>        
      </Link>
      </section> 
    );
};

export default EnderecoCarrinho;