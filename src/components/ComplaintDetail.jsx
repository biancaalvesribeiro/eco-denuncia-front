// src/components/ComplaintDetail.jsx

import { useState } from "react";

// Componente que exibe os detalhes completos de uma denúncia
// Agora com área de comentários
function ComplaintDetail({ complaint, onAddComentario, currentUserEmail }) {
  // Caso não tenha item selecionado, não renderiza nada
  if (!complaint) return null;

  // estado interno para escrever um novo comentário
  const [novoComentario, setNovoComentario] = useState("");

  // função para enviar o comentário
  function handleEnviar() {
    // verifica se o campo está vazio
    if (!novoComentario.trim()) return;

    // chama a função do pai para salvar na denúncia
    onAddComentario(complaint.id, {
      autor: currentUserEmail,
      texto: novoComentario,
      data: new Date().toISOString()
    });

    // limpa o campo após enviar
    setNovoComentario("");
  }

  return (
    <section className="detail-card">
      {/* Título da seção */}
      <h3>Detalhe da Reclamação</h3>

      {/* Título da denúncia */}
      <h4 className="detail-title">{complaint.titulo}</h4>

      {/* Informações estruturadas da denúncia */}
      <div className="detail-info-box">
        <div className="info-item">
          <span className="info-label">Empresa</span>
          <span className="info-value">{complaint.empresa}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Categoria</span>
          <span className="info-value">{complaint.categoria}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Status</span>
          <span className={`status status-${complaint.status.toLowerCase()}`}>
            {complaint.status}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">Abertura</span>
          <span className="info-value">
            {new Date(complaint.dataAbertura).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>

      {/* Mensagem completa da denúncia */}
      <p className="detail-message">{complaint.mensagem}</p>

      {/* Área de comentários */}
      <hr style={{ margin: "20px 0", opacity: 0.3 }} />

      <h4 style={{ fontSize: "1rem", marginBottom: "10px" }}>
        Comentários
      </h4>

      {/* Lista de comentários */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {complaint.comentarios?.length > 0 ? (
          complaint.comentarios.map((com, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(240, 253, 244, 0.6)",
                border: "1px solid rgba(22, 163, 74, 0.15)",
                padding: "10px 12px",
                borderRadius: "12px"
              }}
            >
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#065f46" }}>
                <strong>{com.autor}</strong> —{" "}
                {new Date(com.data).toLocaleDateString("pt-BR")}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "0.92rem" }}>
                {com.texto}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            Nenhum comentário ainda.
          </p>
        )}
      </div>

      {/* Campo para adicionar comentário */}
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <textarea
          placeholder="Escreva um comentário..."
          className="modal-textarea"
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
        />

        <button className="btn-salvar" onClick={handleEnviar}>
          Enviar comentário
        </button>
      </div>
    </section>
  );
}

export default ComplaintDetail;
