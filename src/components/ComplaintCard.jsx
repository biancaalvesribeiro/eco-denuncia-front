// src/components/ComplaintCard.jsx

// Componente que exibe um card de denúncia individual
function ComplaintCard({ item, onClick }) {
  return (
    // Card clicável
    <div className="complaint-card" onClick={onClick}>
      
      {/* Título da denúncia */}
      <div className="complaint-title">{item.titulo}</div>

      {/* Informações principais (empresa e status) */}
      <div className="complaint-meta">
        <span className="empresa">{item.empresa}</span>

        <span className={`status status-${item.status.toLowerCase()}`}>
          {item.status}
        </span>
      </div>

      {/* Informações adicionais (data e resumo) */}
      <div className="complaint-extra">
        <span className="data">
          {new Date(item.dataAbertura).toLocaleDateString("pt-BR")}
        </span>

        <p className="resumo">{item.resumo}</p>
      </div>
    </div>
  );
}

export default ComplaintCard;
