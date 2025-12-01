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
  // aqui controlo qual tela aparece
  const [screen, setScreen] = useState("login");

  // controla se o usuário está logado ou não
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

  // dados extras que coloquei no cadastro
  const [idadeCadastro, setIdadeCadastro] = useState("");
  const [sexoCadastro, setSexoCadastro] = useState("");

  /* ---------------------- Código de confirmação ---------------------- */
  const [generatedCode, setGeneratedCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [erroCodigo, setErroCodigo] = useState("");

  /* ---------------------- Denúncias ---------------------- */
  // começando com dados fake só pra funcionar o front
  const [complaints, setComplaints] = useState(fakeComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  /* ---------------------- Modal de denúncia nova ---------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaEmpresa, setNovaEmpresa] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaMensagem, setNovaMensagem] = useState("");

  /* ---------------------- Logout ---------------------- */
  function handleLogout() {
    // quando faz logout, volto tudo ao padrão
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

    // validação básica
    if (!nomeCadastro || !emailCadastro || !senhaCadastro || !confirmSenha) {
      setErroCadastro("Preencha todos os campos para se cadastrar.");
      return;
    }

    // validação simples de senha
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

    // aqui gero um código aleatório pra tela de confirmação
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

    // login automático após confirmar o código
    setIsLoggedIn(true);
    setScreen("app");

    // passa o e-mail do cadastro para o login
    setEmail(emailCadastro);
    setSenha("");
  }

  // botão de reenviar código
  function handleResendCode() {
    const newCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(newCode);
    setCodeInput("");
    setErroCodigo("");
  }

  /* ---------------------- Criar nova denúncia ---------------------- */
  function handleSaveComplaint() {
    // aqui verifico se preencheu tudo mesmo
    if (!novoTitulo || !novaEmpresa || !novaCategoria || !novaMensagem) {
      alert("Preencha todos os campos da nova denúncia.");
      return;
    }

    // *** CORREÇÃO IMPORTANTE ***
    // no deploy o emailCadasto às vezes vem vazio,
    // então uso sempre o email da pessoa logada
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
      autorEmail: emailUsuario, // aqui fica certinho o dono da denúncia
    };

    // adiciono a nova denúncia ao array
    setComplaints([...complaints, nova]);
    setSelectedComplaint(nova);
    setIsModalOpen(false);

    // limpa campos do modal
    setNovoTitulo("");
    setNovaEmpresa("");
    setNovaCategoria("");
    setNovaMensagem("");
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

  /* ---------------------- Tela principal (app) ---------------------- */

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
      />
    );
  }

  /* ---------------------- Tela de perfil ---------------------- */

  if (isLoggedIn && screen === "profile") {
    const nome = nomeCadastro || "Usuário EcoDenúncia";
    const emailExibicao = email;
    const currentUserEmail = email;

    const totalDenuncias = complaints.filter(
      (c) => c.autorEmail === currentUserEmail
    ).length;

    return (
      <ProfilePage
        nome={nome}
        email={emailExibicao}
        idade={idadeCadastro}
        sexo={sexoCadastro}
        totalDenuncias={totalDenuncias}
        onBack={() => setScreen("app")}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

export default App;

  return null;
}

export default App;
