import { useState } from "react"; 
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Importando o useNavigate
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();  // Hook para navegação

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados de Login:", { username, password });
    // Aqui você poderia adicionar a lógica de autenticação
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>
            Não possui uma conta? 
            {/* Link para a página de cadastro */}
            <span 
              style={{ color: 'blue', cursor: 'pointer' }} 
              onClick={() => navigate('/cadastro')}
            >
              Cadastrar-se
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

