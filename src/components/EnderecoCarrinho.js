import { get} from  '../services/api';
import { useEffect, useState, useContext } from 'react';
import '../styles/Endereco.css';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { AuthContext } from "./AuthContext";

const EnderecoCarrinho = ({ onEnderecoSelecionado })=> {
    const [enderecos, setEnderecos] =useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);    
    const { usuario } = useContext(AuthContext);



    useEffect(() => {
        setCarregando(true);
        setErro(null);
        get(`EnderecoUsuario/${usuario.response.id}/RecuperarPorUsuario`) 
          .then(data => {
            setEnderecos(data);
            setCarregando(false);
          })
          .catch(err => {
            setErro(err.message || 'Erro inesperado');
            setCarregando(false);
          });
      }, [usuario.response?.id]);
    
    if (!enderecos)
        return <p>Nenhum endereço informado.</p>;
    

    var enderecoSel = enderecos.find(p => p.padrao === true);
   
    console.log(enderecoSel);
    if (!enderecoSel){
        enderecoSel = enderecos[0];

    }
   
    if (!enderecoSel)
       return (
      <div> 
        <p>Nenhum endereço informado.</p>
        <button className='botao-add'><Link to={`/enderecos/${usuario.id}`} className='endereco-link'>Adicionar Endereço</Link></button>
      </div>
       );
   
    if (carregando) return <p>Carregando endereço... <FaSpinner className="spinner" /></p>;
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