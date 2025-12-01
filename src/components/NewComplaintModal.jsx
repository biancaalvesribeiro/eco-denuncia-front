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

        {/* título */}
        <h3>Nova denúncia</h3>

        {/* título da denúncia */}
        <label className="modal-label">
          Título
          <input
            className="modal-input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>

        {/* empresa */}
        <label className="modal-label">
          Empresa
          <input
            className="modal-input"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          />
        </label>

        {/* categoria */}
        <label className="modal-label">
          Categoria
          <select
            className="modal-input"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" disabled hidden>Escolha…</option>

            {/* aqui coloquei o value corretamente */}
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        {/* descrição */}
        <label className="modal-label">
          Descrição
          <textarea
            className="modal-textarea"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </label>

        {/* botões */}
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
