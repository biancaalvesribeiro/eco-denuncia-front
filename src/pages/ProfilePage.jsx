// src/pages/ProfilePage.jsx

function ProfilePage({
  nome,
  email,
  idade,
  sexo,
  totalDenuncias,
  ultimaDenuncia,
  ultimaData,
  dataCriacaoConta,
  onBack,
  onLogout
}) {
  return (
    <div className="app-page">

      <header className="header">
        <h1>Meu perfil</h1>
      </header>

      <main className="content">

        <div className="profile-card">
          <h2>Olá, {nome} 👋</h2>

          <p><strong>E-mail:</strong> {email}</p>

          {idade && <p><strong>Idade:</strong> {idade}</p>}
          {sexo && <p><strong>Sexo:</strong> {sexo}</p>}

          <p><strong>Conta criada em:</strong> {dataCriacaoConta}</p>

          <p><strong>Denúncias registradas:</strong> {totalDenuncias}</p>

          <p>
            <strong>Última denúncia:</strong>{" "}
            {ultimaDenuncia ? ultimaDenuncia : "Nenhuma denúncia ainda"}
          </p>

          <p>
            <strong>Última atualização:</strong>{" "}
            {ultimaData ? ultimaData : "—"}
          </p>
        </div>

        <div className="profile-actions">
          <button className="btn-secundario" onClick={onBack}>
            Voltar
          </button>

          <button className="btn-perigo" onClick={onLogout}>
             Sair
          </button>
        </div>

      </main>
    </div>
  );
}

export default ProfilePage;
