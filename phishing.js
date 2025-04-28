// phishing.js
const apiKey = "uaj4i4r7VqR0bt7pF5466nsHAf7sAPNP"; // Substitua pela sua chave de API do IPQS
const apiEndpoint = "https://www.ipqualityscore.com/api/json/url/";

document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkBtn");
  const urlInput = document.getElementById("urlInput");
  const resultIcon = document.getElementById("resultIcon");
  const resultTitle = document.getElementById("resultTitle");
  const statusValue = document.getElementById("statusValue");
  const domainValue = document.getElementById("domainValue");
  const ipValue = document.getElementById("ipValue");
  const countryValue = document.getElementById("countryValue");
  const riskValue = document.getElementById("riskValue");
  const jsonView = document.getElementById("jsonView");
  const devView = document.getElementById("devView");
  const devBtn = document.getElementById("devBtn");

  // Listener para o botão de verificação
  checkBtn.addEventListener("click", () => {
    const url = urlInput.value.trim();

    if (!url) {
      alert("Por favor, insira uma URL válida.");
      return;
    }

    // Chamada à API IPQualityScore
    fetch(`${apiEndpoint}${apiKey}/${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => {
        // Atualizar interface com os dados da API
        updateUI(data);
      })
      .catch((error) => {
        console.error("Erro ao verificar a URL:", error);
        alert("Ocorreu um erro ao verificar a URL. Tente novamente.");
      });
  });

  // Listener para o botão de modo Dev
  devBtn.addEventListener("click", () => {
    devView.style.display = devView.style.display === "none" ? "block" : "none";
  });

  /**
   * Atualiza a interface HTML com os resultados da API
   * @param {Object} data - Dados retornados da API IPQualityScore
   */
  function updateUI(data) {
    if (data.success) {
      statusValue.textContent = data.unsafe ? "Perigosa" : "Segura";
      domainValue.textContent = data.domain || "-";
      ipValue.textContent = data.ip_address || "-";
      countryValue.textContent = data.country_code || "-";
      riskValue.textContent = `${data.risk_score || 0}%`;

      resultIcon.className = `result-icon ${
        data.unsafe ? "danger" : "safe"
      }`;
      resultTitle.textContent = data.unsafe ? "URL Perigosa Detectada" : "URL Segura";

      // Modo Dev (JSON)
      jsonView.textContent = JSON.stringify(data, null, 2);
    } else {
      alert("A verificação falhou. Verifique se a URL é válida.");
    }
  }
});
