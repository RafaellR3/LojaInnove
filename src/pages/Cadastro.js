import { useState } from "react";
import "../styles/Cadastro.css";
import {post} from  '../services/api';

export default function CadastroUsuarioForm({ onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: 0,
    telefone: "",
    senha: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Email inválido";
    if (!form.cpf.trim()) e.cpf = "CPF é obrigatório";
    if (!form.telefone.trim()) e.telefone = "Telefone é obrigatório";
    if (form.senha.length < 6) e.senha = "Senha deve ter pelo menos 6 caracteres";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setLoading(true);

    if (onSubmit) await onSubmit(form);
    const response = await post('usuario/cadastrar', form);
    if (!response.error) {
        alert("Cadastro realizado com sucesso!");
        window.history.back();
    }
    setLoading(false);
 }
    
  return (
    <div className="cadastro-container">
        <div className="cadastro-box">            
            <h1 className="cadastro-title">Cadastro de usuário</h1>
            <form onSubmit={handleSubmit} className="cadastro-form">
                <div className="cadastro-field">
                <label className="cadastro-label">Nome</label>
                <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="cadastro-input"
                />
                {errors.nome && <p className="cadastro-error">{errors.nome}</p>}
                </div>

                <div className="cadastro-field">
                <label styclassNamele="label">Email</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@exemplo.com"
                    type="email"
                    className="cadastro-input"
                />
                {errors.email && <p className="cadastro-error">{errors.email}</p>}
                </div>

                <div className="cadastro-field">
                <label className="label">CPF</label>
                <input
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    className="cadastro-input"
                    type="number"
                />
                {errors.cpf && <p className="cadastro-error">{errors.cpf}</p>}
                </div>

                <div className="cadastro-field">
                <label className="cadastro-label">Telefone</label>
                <input
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(00) 90000-0000"
                    className="cadastro-input"
                />
                {errors.telefone && <p className="cadastro-error">{errors.telefone}</p>}
                </div>

                <div className="cadastro-field">
                <label className="cadastro-label">Senha</label>
                <input
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    type="password"
                    className="cadastro-input"
                />
                {errors.senha && <p className="cadastro-error">{errors.senha}</p>}
                </div>

                <button type="submit" className="cadastro-button" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>      
        </div>
    </div>
  );
}