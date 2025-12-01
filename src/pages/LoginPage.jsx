// src/pages/LoginPage.jsx

function LoginPage({
  email,
  senha,
  erro,
  onChangeEmail,
  onChangeSenha,
  onSubmit,
  onGoToRegister
}) {
  return (
    <div className="login-page">

      <header className="header">
        <h1>EcoDenúncia</h1>
        <p className="subtitle">Login</p>
      </header>

      <main className="content">
        <form className="login-card" onSubmit={onSubmit}>
          <h2>Entrar</h2>

          <label className="login-label">
            E-mail
            <input
              className="login-input"
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              type="email"
            />
          </label>

          <label className="login-label">
            Senha
            <input
              className="login-input"
              value={senha}
              onChange={(e) => onChangeSenha(e.target.value)}
              placeholder="********"
              type="password"
            />
          </label>

          {erro && <p className="login-error">{erro}</p>}

          <button className="login-button">Entrar</button>

          <p className="login-footer">
            Não tem conta?
            <button className="link-button" type="button" onClick={onGoToRegister}>
              Criar conta
            </button>
          </p>
        </form>
      </main>

    </div>
  );
}

export default LoginPage;
