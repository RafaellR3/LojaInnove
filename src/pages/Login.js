import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { post} from  '../services/api';
import "../styles/Login.css"; 

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  
// pega a rota de onde o usuário veio (caso tenha sido redirecionado pelo PrivateRoute)
  const from = location.state?.from?.pathname || "/";

  const handleLogin =async () => {
    if (email && senha) {      
      const dto= { email, senha };
      const response = await post('usuario/logar', dto);
      if (response.error) {
        return;
      }
      login({ response });
      navigate(from, { replace: true });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Entrar</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button onClick={handleLogin}>Entrar</button>
        
        <Link to="/login"  className="login-link" >Realizar cadastro</Link>
      </div>
    </div>
  );
};

export default Login;
