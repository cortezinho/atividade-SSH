import React from "react";
// import "./checklist.css"; // opcional: se separar estilos, senão use App.css

// Recebe `submission` que é a última submissão (objeto) ou null
export default function Checklist({ submission }) {
  // Se não houver submissão, avisar
  if (!submission) {
    return (
      <div className="checklist-wrapper">
        <h2>Checklist de Verificação Institucional</h2>
        <p>Nenhuma submissão encontrada para validar.</p>
      </div>
    );
  }

  // Funções de validação simples (exemplos)
  const hasHTTPS = true; // simulação: normalmente verificar via domínio/servidor
  const domainLooksOfficial = false; // não temos domínio real — marcamos false para alertar
  const hasContact = !!(submission.email || submission.telefone);
  const hasSignatureOrSeal = !!submission.nome;
  const mentionsPrivacy = submission.descricao && submission.descricao.length > 20;

  const items = [
    { text: "O site possui certificado HTTPS válido?", ok: hasHTTPS, detail: hasHTTPS ? "🔒 Certificado aparentemente presente (simulado)" : "❌ Sem HTTPS" },
    { text: "O domínio é realmente da instituição (ex: .gov.br / .edu.br)?", ok: domainLooksOfficial, detail: domainLooksOfficial ? "✅ Domínio parecido com institucional" : "❌ Domínio não verificado (simulado)" },
    { text: "Há canais oficiais de contato confirmando o formulário?", ok: hasContact, detail: hasContact ? `✅ Contato presente: ${submission.email || submission.telefone}` : "❌ Sem contato fornecido" },
    { text: "Há assinatura ou selo institucional visível?", ok: hasSignatureOrSeal, detail: hasSignatureOrSeal ? `✅ Nome informado: ${submission.nome}` : "❌ Nome não informado" },
    { text: "O conteúdo informa política de privacidade e uso de dados?", ok: mentionsPrivacy, detail: mentionsPrivacy ? "✅ Texto longo descrevendo o caso (simulação)" : "❌ Não há texto suficiente mencionando privacidade" },
  ];

  return (
    <div className="checklist-wrapper">
      <h2>Checklist de Verificação Institucional ✅</h2>
      <p>Avaliando os dados da sua última submissão (usados apenas para demonstrar o checklist):</p>

      <div className="checklist-items">
        {items.map((it, idx) => (
          <div key={idx} className={`check-item ${it.ok ? "ok" : "nok"}`}>
            <div className="check-left">
              <div className="bullet">{it.ok ? "✅" : "❌"}</div>
              <div>
                <div className="question">{it.text}</div>
                <div className="detail">{it.detail}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="submission-preview">
        <h3>Preview (dados usados na verificação)</h3>
        <pre>{JSON.stringify(submission, null, 2)}</pre>
      </div>
    </div>
  );
}
