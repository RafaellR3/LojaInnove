import { get, put } from '../services/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const Enderecos = () => {
  const { id } = useParams(); 
  const [enderecos, setEnderecos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    get(`EnderecoUsuario/${id}/RecuperarPorUsuario`) 
      .then(data => {
        setEnderecos(data);
        setCarregando(false);
        // Definir o endereço padrão como selecionado inicialmente
        const enderecoPadrao = data.find(endereco => endereco.padrao === true);
        if (enderecoPadrao) {
          setEnderecoSelecionado(enderecoPadrao.id);
        }
      })
      .catch(err => {
        setErro(err.message || 'Erro inesperado');
        setCarregando(false);
      });
  }, [id]);

  const handleSelecao = (enderecoId) => {
    setEnderecoSelecionado(enderecoId);
  };

  const handleConfirmar = () => {
    if (!enderecoSelecionado) {
      alert("Por favor, selecione um endereço.");
      return;
    }

    // Encontrar o endereço selecionado
    const endereco = enderecos.find(e => e.id === enderecoSelecionado);

    // Enviar PUT para atualizar o endereço
    put(`EnderecoUsuario/${id}/${endereco.id}/DefinirComoPadrao`)
      .then(response => {
        window.history.back();
      })
      .catch(err => {
        setErro(err.message || 'Erro ao atualizar o endereço.');
      });
      
  };

  if (carregando) return <p>Carregando endereços... <FaSpinner className="spinner" /></p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  if (!enderecos.length) {
    return <p>Nenhum endereço cadastrado.</p>;
  }

  return (
    <div >
        <h2>Endereços</h2>
      <div  style={{ padding: '16px' } } >
        {enderecos.map(endereco => (
          <div   className="endereco-selecionado" key={endereco.id} style={{ marginBottom: '10px' }}>
            <div>
              <span className="nome">Rua: {endereco.rua}, Num.: {endereco.numero}</span>
            </div>
            <div>
              <span className="nome">Cidade: {endereco.cidade}</span>
            </div>
            <div>
              <span className="nome">Bairro: {endereco.bairro}</span>
            </div>
            <div>
              <span className="nome">CEP: {endereco.cep}</span>
            </div>
            <div  style={{ display: 'flex', alignItems: 'center' }}>              
              <input 
                type="radio" 
                name="enderecoSelecionado" 
                checked={endereco.id === enderecoSelecionado} 
                onChange={() => handleSelecao(endereco.id)} 
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className='botao-enderecos' onClick={handleConfirmar}>
          Confirmar
        </button>
        <button className='botao-enderecos' onClick={() => window.history.back()}>
          Voltar
        </button>
      </div>
    </div>
  );
};
export default Enderecos;
