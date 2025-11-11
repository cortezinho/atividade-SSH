import React, { useState, useEffect } from "react";
import Checklist from "./components/Checklist";
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

  // contém a última submissão para avaliar o checklist
  const [lastSubmission, setLastSubmission] = useState(null);

  // Carregar (opcional) algum estado do localStorage ao iniciar - não é necessário,
  // mas mantém compatibilidade caso queira visualizar em modo dev.
  useEffect(() => {
    const todas = JSON.parse(localStorage.getItem("denuncias")) || [];
    if (todas.length > 0) {
      // opcional: não ativamos submitted, apenas deixamos a última disponível
      setLastSubmission(todas[todas.length - 1]);
    }
  }, []);

  // Atualiza o estado quando o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ao enviar
  const handleSubmit = (e) => {
    e.preventDefault();

    // criar o objeto a salvar
    const nova = { ...form, data: new Date().toISOString() };

    // Salva no localStorage (array)
    const listaExistente = JSON.parse(localStorage.getItem("denuncias")) || [];
    listaExistente.push(nova);
    localStorage.setItem("denuncias", JSON.stringify(listaExistente));

    // definir a última submissão para o checklist
    setLastSubmission(nova);

    // Limpa o formulário (se quiser manter, comente esta linha)
    setForm({ nome: "", cpf: "", email: "", telefone: "", descricao: "" });

    // Mostra checklist
    setSubmitted(true);
  };

  // Voltar ao formulário
  const handleBack = () => setSubmitted(false);

  return (
    <div className="page">
      {/* faixa de simulação */}

      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-logo">UA</div>
            <div className="brand-text">
              <strong>Universidade Alfa</strong>
              <div className="brand-sub">Ouvidoria — Simulação</div>
            </div>
          </div>
          <nav className="top-nav">
            <a href="#quem-somos" onClick={(e)=>e.preventDefault()}>Quem somos</a>
            <a href="#contato" onClick={(e)=>e.preventDefault()}>Fale conosco</a>
            <a href="#apoie" onClick={(e)=>e.preventDefault()} className="cta">Apoie</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="main-inner">
          {!submitted ? (
            <section className="form-section">
              <h1>Fale Conosco — Ouvidoria</h1>
              <p className="lead">
                Este é um **ambiente de simulação** criado para ensinar como verificar a autenticidade de formulários.
                <br />
                Preencha abaixo — os dados serão salvos em <code>localStorage</code> (não enviados a servidor).
              </p>

              <form onSubmit={handleSubmit} className="formulario" autoComplete="off">
                <div className="row">
                  <label>Nome completo</label>
                  <input name="nome" type="text" value={form.nome} onChange={handleChange} required />
                </div>

                <div className="row two">
                  <div>
                    <label>CPF</label>
                    <input name="cpf" type="text" value={form.cpf} onChange={handleChange} required />
                  </div>
                  <div>
                    <label>Telefone</label>
                    <input name="telefone" type="tel" value={form.telefone} onChange={handleChange} placeholder="(99) 99999-9999" />
                  </div>
                </div>

                <div className="row">
                  <label>E-mail</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="row">
                  <label>Descrição da denúncia</label>
                  <textarea name="descricao" value={form.descricao} onChange={handleChange} required rows="6" />
                </div>

                <div className="actions">
                  <button type="submit" className="btn primary">Enviar denúncia</button>
                  <button type="button" className="btn secondary" onClick={() => {
                    // limpar localStorage (apenas para testes)
                    if (window.confirm("Limpar todas as denúncias salvas no localStorage?")) {
                      localStorage.removeItem("denuncias");
                      setLastSubmission(null);
                      alert("LocalStorage limpo.");
                    }
                  }}>Limpar Storage</button>
                </div>
              </form>
            </section>
          ) : (
            <section className="checklist-section">
              <Checklist submission={lastSubmission} />
              <div style={{ marginTop: 16 }}>
                <button onClick={handleBack} className="btn primary">Voltar ao formulário</button>
              </div>
            </section>
          )}

          {/* area lateral informativa como no layout real */}
          <aside className="aside">
            <div className="contact-box">
              <h3>Canal de relacionamento</h3>
              <p>Para confirmar: <strong>ouvidoria@universidadealfa.sim</strong></p>
              <p>Telefone: <strong>(11) 4000-0000</strong></p>
            </div>

            <div className="info-box">
              <h4>Privacidade</h4>
              <p>Os dados desta simulação são armazenados localmente no navegador (localStorage).</p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h4>Receba nossas atualizações</h4>
            <p>Projeto educativo — não colete dados reais.</p>
          </div>
          <div>
            <small>Universidade Alfa — Simulação</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
