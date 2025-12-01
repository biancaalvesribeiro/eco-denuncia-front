// src/pages/ComplaintsPage.jsx

import { useState } from "react";
import ComplaintCard from "../components/ComplaintCard.jsx";
import ComplaintDetail from "../components/ComplaintDetail.jsx";
import NewComplaintModal from "../components/NewComplaintModal.jsx";

function ComplaintsPage({
  complaints,
  selectedComplaint,
  onSelectComplaint,
  isModalOpen,
  openModal,
  closeModal,
  novoTitulo,
  setNovoTitulo,
  novaEmpresa,
  setNovaEmpresa,
  novaCategoria,
  setNovaCategoria,
  novoTexto,
  setNovoTexto,
  onSaveComplaint,
  onGoToProfile,
  currentUserEmail
}) {

  const [filterMode, setFilterMode] = useState("todas");
  const [statusFilter, setStatusFilter] = useState("todos");

  // filtra minhas denúncias
  const listaBase =
    filterMode === "minhas"
      ? complaints.filter((c) => c.autorEmail === currentUserEmail)
      : complaints;

  // filtra por status
  const listaFinal =
    statusFilter === "todos"
      ? listaBase
      : listaBase.filter((c) => {
          const s = (c.status || "").toUpperCase().replace(/\s|-/g, "_");
          return s === statusFilter;
        });

  return (
    <div className="app-page">

      {/* HEADER COM LOGO */}
      <header className="header">

        <div className="logo-startup">
          <div className="logo-icon">
            <svg viewBox="0 0 32 32">
              <defs>
                <linearGradient id="ecoGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00c853" />
                  <stop offset="100%" stopColor="#00acc1" />
                </linearGradient>
              </defs>

              <rect x="2" y="2" width="28" height="28" rx="10" fill="url(#ecoGradient)" />
              <path d="M10 20c0-5 5-9 11-9-1 4-3 8-7 10-2 1-4 0-4-1z" fill="#E8F5E9" />
              <circle cx="14" cy="13" r="1" fill="#E8F5E9" />
            </svg>
          </div>

          <div className="logo-text">
            <span className="logo-primary">Eco</span>
            <span className="logo-highlight">Denúncia</span>
          </div>
        </div>

        <button className="link-button" onClick={onGoToProfile}>
          Meu perfil
        </button>
      </header>

      {/* ÁREA PRINCIPAL */}
      <main className="content">

        <button className="btn-nova" onClick={openModal}>
          + Nova Denúncia
        </button>

        {/* filtro minhas / todas */}
        <div className="filter-tabs filter-near-list">
          <button
            className={filterMode === "todas" ? "tab-button tab-button-active" : "tab-button"}
            onClick={() => setFilterMode("todas")}
          >
            Todas
          </button>

          <button
            className={filterMode === "minhas" ? "tab-button tab-button-active" : "tab-button"}
            onClick={() => setFilterMode("minhas")}
          >
            Minhas
          </button>
        </div>

        {/* filtro status */}
        <div className="filter-tabs filter-near-list">
          <button
            className={statusFilter === "todos" ? "tab-button tab-button-active" : "tab-button"}
            onClick={() => setStatusFilter("todos")}
          >
            Todos
          </button>

          <button
            className={statusFilter === "ABERTA" ? "tab-button tab-button-active" : "tab-button"}
            onClick={() => setStatusFilter("ABERTA")}
          >
            Abertas
          </button>

          <button
            className={statusFilter === "EM_ANALISE" ? "tab-button tab-button-active" : "tab-button"}
            onClick={() => setStatusFilter("EM_ANALISE")}
          >
            Em análise
          </button>

          <button
            className={statusFilter === "RESPONDIDA" ? "tab-button tab-button-active" : "tab-button"}
            onClick={() => setStatusFilter("RESPONDIDA")}
          >
            Respondidas
          </button>
        </div>

        {/* LISTA + DETALHE */}
        <div className="complaints-layout">

          <div className="complaints-list">
            {listaFinal.map((c) => (
              <ComplaintCard
                key={c.id}
                item={c}
                onClick={() => onSelectComplaint(c)}
              />
            ))}
          </div>

          <div className="complaints-detail">
            {selectedComplaint ? (
              <ComplaintDetail complaint={selectedComplaint} />
            ) : (
              <div className="detail-placeholder">
                <p>Selecione uma denúncia para ver os detalhes</p>
              </div>
            )}
          </div>

        </div>

        {/* MODAL */}
        {isModalOpen && (
          <NewComplaintModal
            onClose={closeModal}
            onSave={onSaveComplaint}
            titulo={novoTitulo}
            setTitulo={setNovoTitulo}
            empresa={novaEmpresa}
            setEmpresa={setNovaEmpresa}
            categoria={novaCategoria}
            setCategoria={setNovaCategoria}
            texto={novoTexto}
            setTexto={setNovoTexto}
          />
        )}

      </main>
    </div>
  );
}

export default ComplaintsPage;
