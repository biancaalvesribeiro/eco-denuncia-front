// src/pages/ProfilePage.jsx

// Tela de perfil do usuário
// Aqui só mostro os dados principais do usuário e algumas informações extras.
// (Sem lista das últimas denúncias, conforme combinado)

function ProfilePage({
  nome,
  email,
  idade,
  sexo,
  totalDenuncias,
  ultimaDenuncia,     // título da última denúncia
  ultimaData,         // data da última denúncia
  dataCriacaoConta,   // data em que o usuário criou a conta (fictício no front)
  onBack,
  onLogout
}) {
  return (
    <div className="app-page">

      {/* Título da página */}
      <header className="header">
        <h1>Meu perfil</h1>
      </header>

      <main className="content">

        {/* Card com os dados do usuário */}
        <div className="profile-card">
          <h2>Olá, {nome} 👋</h2>

          <p><strong>E-mail:</strong> {email}</p>

          {/* Esses dois só aparecem se existirem */}
          {idade && <p><strong>Idade:</strong> {idade}</p>}
          {sexo && <p><strong>Sexo:</strong> {sexo}</p>}

          <p><strong>Conta criada em:</strong> {dataCriacaoConta}</p>

          <p><strong>Denúncias registradas:</strong> {totalDenuncias}</p>

          {/* Informações extras da última denúncia */}
          {ultimaDenuncia && (
            <div className="profile-extra">
              <p><strong>Última denúncia:</strong> {ultimaDenuncia}</p>
              <p><strong>Data da última denúncia:</strong> {ultimaData}</p>
            </div>
          )}
        </div>

        {/* Botões da tela */}
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
