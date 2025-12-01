// src/components/ComplaintDetail.jsx

// Componente que exibe os detalhes completos de uma denúncia
function ComplaintDetail({ complaint }) {
  // Caso não tenha item selecionado, não renderiza nada
  if (!complaint) return null;

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
    </section>
  );
}

export default ComplaintDetail;
