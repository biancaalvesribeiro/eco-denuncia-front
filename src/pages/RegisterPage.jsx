// src/pages/RegisterPage.jsx

function RegisterPage({
  nome,
  email,
  senha,
  confirmSenha,
  idade,
  sexo,
  erroCadastro,
  onChangeNome,
  onChangeEmail,
  onChangeSenha,
  onChangeConfirmSenha,
  onChangeIdade,
  onChangeSexo,
  onSubmit,
  onGoToLogin,
}) {
  return (
    // container principal da página
    <div className="page login-page">
      
      {/* cabeçalho com título e subtítulo */}
      <header className="header">
        <h1>EcoDenúncia</h1>
        <p className="subtitle">Criar conta</p>
      </header>

      <main className="content login-content">
        {/* formulário que envia os dados pra cadastrar */}
        <form className="login-card" onSubmit={onSubmit}>
          <h2>Criar conta</h2>
          
          {/* explicação do que o usuário está fazendo */}
          <p className="login-hint">
            Cadastre-se para registrar e acompanhar suas denúncias.
          </p>

          {/* campo de nome completo */}
          <label className="login-label">
            Nome completo
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => onChangeNome(e.target.value)} // atualiza o nome no state
              className="login-input"
              required
            />
          </label>

          {/* campo de e-mail */}
          <label className="login-label">
            E-mail
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)} // atualiza o email
              className="login-input"
              required
            />
          </label>

          {/* campo de idade (opcional) */}
          <label className="login-label">
            Idade
            <input
              type="number"
              placeholder="Ex: 25"
              value={idade}
              onChange={(e) => onChangeIdade(e.target.value)} // atualiza idade
              className="login-input"
              min="1"
              max="120"
            />
          </label>

          {/* seletor de sexo */}
          <label className="login-label">
            Sexo
            <select
              className="login-input"
              value={sexo}
              onChange={(e) => onChangeSexo(e.target.value)} // atualiza sexo
            >
              <option value="">Selecione...</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não informar">
                Prefiro não informar
              </option>
            </select>
          </label>

          {/* campo de senha */}
          <label className="login-label">
            Senha
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => onChangeSenha(e.target.value)} // atualiza senha
              className="login-input"
              required
              minLength={8} // senha precisa ter pelo menos 8 caracteres
            />
          </label>

          {/* campo pra confirmar senha */}
          <label className="login-label">
            Confirmar senha
            <input
              type="password"
              placeholder="********"
              value={confirmSenha}
              onChange={(e) => onChangeConfirmSenha(e.target.value)} // atualiza confirmação
              className="login-input"
              required
              minLength={8}
            />
          </label>

          {/* mensagem de erro caso o cadastro falhe */}
          {erroCadastro && <p className="login-error">{erroCadastro}</p>}

          {/* botão pra enviar o formulário */}
          <button type="submit" className="login-button">
            Cadastrar
          </button>

          {/* link pra voltar à tela de login */}
          <p className="login-footer">
            Já tem conta?{" "}
            <button
              type="button"
              className="link-button"
              onClick={onGoToLogin}
            >
              Entrar
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;
