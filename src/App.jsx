import React, { useState } from "react";
import "./App.css";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    descricao: "",
  });

  // Atualiza o estado quando o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ao enviar
  const handleSubmit = (e) => {
    e.preventDefault();

    // Salva no localStorage
    const listaExistente = JSON.parse(localStorage.getItem("denuncias")) || [];
    listaExistente.push({ ...form, data: new Date().toISOString() });
    localStorage.setItem("denuncias", JSON.stringify(listaExistente));

    // Limpa o formulário
    setForm({ nome: "", cpf: "", email: "", telefone: "", descricao: "" });

    // Mostra checklist
    setSubmitted(true);
  };

  // Voltar ao formulário
  const handleBack = () => setSubmitted(false);

  return (
    <div className="container">
      {!submitted ? (
        <>
          <header className="header">
            <div className="logo">🏛️ <span>Órgão Institucional</span></div>
          </header>

          <h1>Portal de Denúncias Institucionais</h1>
          <p>Preencha o formulário abaixo para enviar sua denúncia anônima.</p>

          <form onSubmit={handleSubmit} className="formulario" autoComplete="off">
            <label>Nome completo:</label>
            <input name="nome" type="text" value={form.nome} onChange={handleChange} required />

            <label>CPF:</label>
            <input name="cpf" type="text" value={form.cpf} onChange={handleChange} required />

            <label>E-mail:</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />

            <label>Telefone:</label>
            <input
              name="telefone"
              type="tel"
              value={form.telefone}
              onChange={handleChange}
              required
              placeholder="(99) 99999-9999"
            />

            <label>Descrição da denúncia:</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} required></textarea>

            <button type="submit">Enviar denúncia</button>
          </form>
        </>
      ) : (
        <div className="checklist">
          <h2>Checklist de Verificação Institucional ✅</h2>
          <ul>
            <li>🔒 O site possui certificado HTTPS válido?</li>
            <li>🏢 O domínio é realmente da instituição (ex: gov.br, edu.br)?</li>
            <li>📞 Há canais oficiais de contato confirmando o formulário?</li>
            <li>✉️ Há assinatura ou selo de verificação institucional?</li>
            <li>📜 O conteúdo informa política de privacidade e uso de dados?</li>
          </ul>
          <button onClick={handleBack} style={{ marginTop: "15px", padding: "8px 15px", borderRadius: "6px", cursor: "pointer" }}>
            Voltar ao formulário
          </button>
        </div>
      )}

      <footer className="footer">
        <small>Projeto educativo — não envie dados reais.</small>
      </footer>
    </div>
  );
}

export default App;
