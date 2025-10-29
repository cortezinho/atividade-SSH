import React from "react";

export default function Checklist() {
  return (
    <div id="alerta" role="alert">
      <h2>⚠️ Atenção!</h2>
      <p>Você acabou de preencher uma <strong>simulação de página falsa</strong>.</p>
      <p>Antes de enviar informações pessoais em formulários online, verifique:</p>

      <ul className="checklist">
        <li>✅ O site possui <strong>domínio oficial</strong> (ex: <code>.gov.br</code>)?</li>
        <li>✅ Há <strong>certificado de segurança</strong> (cadeado 🔒 na barra de endereço)?</li>
        <li>✅ Existem <strong>canais de contato oficiais</strong> disponíveis?</li>
        <li>✅ O formulário foi divulgado por <strong>fontes confiáveis</strong>?</li>
        <li>✅ Há <strong>assinatura ou selo institucional</strong> visível?</li>
      </ul>

      <p>🔍 Sempre confirme a autenticidade antes de informar seus dados!</p>
    </div>
  );
}