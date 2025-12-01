// src/pages/ConfirmCodePage.jsx

function ConfirmCodePage({
  emailCadastro,
  codeInput,
  erroCodigo,
  onChangeCodeInput,
  onSubmit,
  onResendCode,
  onBackToRegister
}) {
  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-card">

          <h2>Confirmar código</h2>
          <p className="login-hint">
            Enviamos um código para <strong>{emailCadastro}</strong>.
          </p>

          <form onSubmit={onSubmit}>
            <label className="login-label">
              Código
              <input
                className="login-input"
                value={codeInput}
                onChange={(e) => onChangeCodeInput(e.target.value)}
                placeholder="Digite o código"
              />
            </label>

            {erroCodigo && <p className="login-error">{erroCodigo}</p>}

            <button className="login-button">Confirmar</button>
          </form>

          <div className="login-links-bottom">
            <button className="link-button" onClick={onResendCode}>
              Reenviar código
            </button>

            <button className="link-button" onClick={onBackToRegister}>
              ← Voltar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ConfirmCodePage;
