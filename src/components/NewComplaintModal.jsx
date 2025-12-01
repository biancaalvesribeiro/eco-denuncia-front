// src/components/NewComplaintModal.jsx

// Lista fixa de categorias disponíveis no formulário
const CATEGORIAS = [
  "Fraude financeira",
  "Golpe digital / Internet",
  "Crimes ambientais",
  "Assédio ou ameaça",
  "Problema contratual",
  "Outros"
];

// Modal para criação de uma nova denúncia
function NewComplaintModal({
  onClose,
  onSave,
  titulo,
  setTitulo,
  empresa,
  setEmpresa,
  categoria,
  setCategoria,
  texto,
  setTexto
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">

        {/* Título do modal */}
        <h3>Nova denúncia</h3>

        {/* Campo: título da denúncia */}
        <label className="modal-label">
          Título
          <input
            className="modal-input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>

        {/* Campo: empresa */}
        <label className="modal-label">
          Empresa
          <input
            className="modal-input"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          />
        </label>

        {/* Campo: categoria */}
        <label className="modal-label">
          Categoria
          <select
            className="modal-input"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" disabled hidden>Escolha…</option>

            {/* Opções geradas a partir da lista CATEGORIAS */}
            {CATEGORIAS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        {/* Campo: descrição completa */}
        <label className="modal-label">
          Descrição
          <textarea
            className="modal-textarea"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </label>

        {/* Botões do modal */}
        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-salvar" onClick={onSave}>
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
}

export default NewComplaintModal;
