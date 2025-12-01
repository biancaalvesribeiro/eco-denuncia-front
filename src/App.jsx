// src/App.jsx

// Importações básicas
import { useState } from "react";
import "./App.css";
import { fakeComplaints } from "./data/fakeData";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ConfirmCodePage from "./pages/ConfirmCodePage.jsx";
import ComplaintsPage from "./pages/ComplaintsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {

  /* ---------------------- Estados principais ---------------------- */
  const [screen, setScreen] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* ---------------------- Login ---------------------- */
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");

  /* ---------------------- Cadastro ---------------------- */
  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erroCadastro, setErroCadastro] = useState("");

  // dados extras
  const [idadeCadastro, setIdadeCadastro] = useState("");
  const [sexoCadastro, setSexoCadastro] = useState("");

  /* ---------------------- Código de confirmação ---------------------- */
  const [generatedCode, setGeneratedCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [erroCodigo, setErroCodigo] = useState("");

  /* ---------------------- Denúncias ---------------------- */
  // começo com os dados fake
  const [complaints, setComplaints] = useState(fakeComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  /* ---------------------- Modal nova denúncia ---------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaEmpresa, setNovaEmpresa] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaMensagem, setNovaMensagem] = useState("");

  /* ---------------------- Logout ---------------------- */
  function handleLogout() {
    setIsLoggedIn(false);
    setScreen("login");

    setEmail("");
    setSenha("");
    setEmailCadastro("");
    setSenhaCadastro("");
    setConfirmSenha("");
    setIdadeCadastro("");
    setSexoCadastro("");

    setSelectedComplaint(null);
    setComplaints(fakeComplaints);

    setNovoTitulo("");
    setNovaEmpresa("");
    setNovaCategoria("");
    setNovaMensagem("");
  }

  /* ---------------------- Login handler ---------------------- */
  function handleLogin(e) {
    e.preventDefault();

    if (!email || !senha) {
      setErroLogin("Preencha e-mail e senha para entrar.");
      return;
    }

    setErroLogin("");
    setIsLoggedIn(true);
    setScreen("app");
  }

  /* ---------------------- Cadastro handler ---------------------- */
  function handleRegister(e) {
    e.preventDefault();

    if (!nomeCadastro || !emailCadastro || !senhaCadastro || !confirmSenha) {
      setErroCadastro("Preencha todos os campos para se cadastrar.");
      return;
    }

    const senhaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(senhaCadastro);
    if (!senhaValida) {
      setErroCadastro("A senha deve ter pelo menos 8 caracteres, com letras e números.");
      return;
    }

    if (senhaCadastro !== confirmSenha) {
      setErroCadastro("As senhas não conferem.");
      return;
    }

    setErroCadastro("");

    const newCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(newCode);

    setCodeInput("");
    setErroCodigo("");

    setScreen("confirm");
  }

  /* ---------------------- Confirmar código ---------------------- */
  function handleConfirmCode(e) {
    e.preventDefault();

    if (!codeInput) {
      setErroCodigo("Digite o código que foi enviado para o seu e-mail.");
      return;
    }

    if (codeInput !== generatedCode) {
      setErroCodigo("Código incorreto. Verifique o e-mail e tente novamente.");
      return;
    }

    setErroCodigo("");

    setIsLoggedIn(true);
    setScreen("app");

    setEmail(emailCadastro);
    setSenha("");
  }

  function handleResendCode() {
    const newCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(newCode);
    setCodeInput("");
    setErroCodigo("");
  }

  /* ---------------------- Criar nova denúncia ---------------------- */
  function handleSaveComplaint() {
    if (!novoTitulo || !novaEmpresa || !novaCategoria || !novaMensagem) {
      alert("Preencha todos os campos da nova denúncia.");
      return;
    }

    // email de quem está logado
    const emailUsuario = email;

    const nova = {
      id: complaints.length + 1,
      titulo: novoTitulo,
      empresa: novaEmpresa,
      categoria: novaCategoria,
      mensagem: novaMensagem,
      resumo: novaMensagem.substring(0, 80) + "...",
      status: "ABERTA",
      dataAbertura: new Date().toISOString(),
      autorEmail: emailUsuario,
      comentarios: [] // adicionando lista vazia de comentários
    };

    setComplaints([...complaints, nova]);
    setSelectedComplaint(nova);
    setIsModalOpen(false);

    setNovoTitulo("");
    setNovaEmpresa("");
    setNovaCategoria("");
    setNovaMensagem("");
  }

  /* -------------- Função nova: adicionar comentário -------------- */
  // aqui atualizo a denúncia certa, incluindo o novo comentário
  function handleAddComentario(denunciaId, comentarioNovo) {
    const novas = complaints.map((c) => {
      if (c.id === denunciaId) {
        return {
          ...c,
          comentarios: [...(c.comentarios || []), comentarioNovo]
        };
      }
      return c;
    });

    setComplaints(novas);

    // atualiza o detalhe selecionado também
    if (selectedComplaint?.id === denunciaId) {
      setSelectedComplaint(
        novas.find((n) => n.id === denunciaId)
      );
    }
  }

  /* ---------------------- Telas sem login ---------------------- */

  if (!isLoggedIn) {
    if (screen === "login") {
      return (
        <LoginPage
          email={email}
          senha={senha}
          erro={erroLogin}
          onChangeEmail={setEmail}
          onChangeSenha={setSenha}
          onSubmit={handleLogin}
          onGoToRegister={() => setScreen("register")}
        />
      );
    }

    if (screen === "register") {
      return (
        <RegisterPage
          nome={nomeCadastro}
          email={emailCadastro}
          senha={senhaCadastro}
          confirmSenha={confirmSenha}
          erroCadastro={erroCadastro}
          idade={idadeCadastro}
          sexo={sexoCadastro}
          onChangeNome={setNomeCadastro}
          onChangeEmail={setEmailCadastro}
          onChangeSenha={setSenhaCadastro}
          onChangeConfirmSenha={setConfirmSenha}
          onChangeIdade={setIdadeCadastro}
          onChangeSexo={setSexoCadastro}
          onSubmit={handleRegister}
          onGoToLogin={() => setScreen("login")}
        />
      );
    }

    if (screen === "confirm") {
      return (
        <ConfirmCodePage
          emailCadastro={emailCadastro}
          generatedCode={generatedCode}
          codeInput={codeInput}
          erroCodigo={erroCodigo}
          onChangeCodeInput={setCodeInput}
          onSubmit={handleConfirmCode}
          onResendCode={handleResendCode}
          onBackToRegister={() => setScreen("register")}
        />
      );
    }
  }

  /* ---------------------- Tela principal ---------------------- */

  if (isLoggedIn && screen === "app") {
    const currentUserEmail = email;

    return (
      <ComplaintsPage
        complaints={complaints}
        selectedComplaint={selectedComplaint}
        onSelectComplaint={setSelectedComplaint}
        isModalOpen={isModalOpen}
        openModal={() => setIsModalOpen(true)}
        closeModal={() => setIsModalOpen(false)}
        novoTitulo={novoTitulo}
        setNovoTitulo={setNovoTitulo}
        novaEmpresa={novaEmpresa}
        setNovaEmpresa={setNovaEmpresa}
        novaCategoria={novaCategoria}
        setNovaCategoria={setNovaCategoria}
        novaMensagem={novaMensagem}
        setNovaMensagem={setNovaMensagem}
        onSaveComplaint={handleSaveComplaint}
        onGoToProfile={() => setScreen("profile")}
        currentUserEmail={currentUserEmail}
        onAddComentario={handleAddComentario} // envio função nova
      />
    );
  }

  /* ---------------------- Tela de perfil ---------------------- */

if (isLoggedIn && screen === "profile") {
  const nome = nomeCadastro || "Usuário EcoDenúncia";
  const emailExibicao = email;

  // data fictícia da conta: usei o dia do cadastro ou hoje
  const dataCriacaoConta =
    new Date().toLocaleDateString("pt-BR");

  // total de denúncias do usuário
  const currentUserEmail = email;
  const denunciasUsuario = complaints.filter(
    (c) => c.autorEmail === currentUserEmail
  );

  const totalDenuncias = denunciasUsuario.length;

  // pega a última denúncia (se existir)
  const ultima = denunciasUsuario[denunciasUsuario.length - 1];

  const ultimaDenuncia = ultima ? ultima.titulo : null;
  const ultimaData = ultima
    ? new Date(ultima.dataAbertura).toLocaleDateString("pt-BR")
    : null;

  return (
    <ProfilePage
      nome={nome}
      email={emailExibicao}
      idade={idadeCadastro}
      sexo={sexoCadastro}
      totalDenuncias={totalDenuncias}
      ultimaDenuncia={ultimaDenuncia}
      ultimaData={ultimaData}
      dataCriacaoConta={dataCriacaoConta}
      onBack={() => setScreen("app")}
      onLogout={handleLogout}
    />
  );
}

  return null;
}

export default App;
