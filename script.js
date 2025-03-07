// Função para atualizar a data e hora
function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    document.getElementById('datetime').textContent = formattedDateTime;
}

// Função para atualizar o status do compressor
function updateCompressorStatus() {
    const compressorCheck = document.getElementById('compressor-check').checked;
    const compressorStatus = document.getElementById('compressor-status');
    compressorStatus.textContent = compressorCheck ? 'Ligado' : 'Desligado';
}

// Atualizar a data e hora a cada segundo
setInterval(updateDateTime, 1000);

// Atualizar a data e hora imediatamente ao carregar a página
updateDateTime();
