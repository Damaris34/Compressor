// Função para atualizar a data e hora
function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    document.getElementById('datetime').textContent = formattedDateTime;
}

// Função para salvar como PDF (simulação)
function saveAsPDF() {
    alert('Salvando como PDF...');
    // Aqui você pode implementar a lógica para gerar um PDF usando uma biblioteca como jsPDF
}

// Atualizar a data e hora imediatamente ao carregar a página
updateDateTime();
