// Função para atualizar a data e hora
function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    document.getElementById('datetime').textContent = formattedDateTime;
}

// Função para salvar dados do equipamento no localStorage
function saveEquipmentData() {
    const equipment = document.getElementById('equipment-select').value;
    const pressure = document.getElementById('pressure').value;
    const temperature = document.getElementById('temperature').value;
    const operation = document.getElementById('operation-select').value;

    const data = { pressure, temperature, operation };
    localStorage.setItem(equipment, JSON.stringify(data));
}

// Função para carregar dados do equipamento do localStorage
function loadEquipmentData() {
    const equipment = document.getElementById('equipment-select').value;
    const data = JSON.parse(localStorage.getItem(equipment));

    if (data) {
        document.getElementById('pressure').value = data.pressure || '';
        document.getElementById('temperature').value = data.temperature || '';
        document.getElementById('operation-select').value = data.operation || 'parado';
    } else {
        // Resetar campos se não houver dados salvos
        document.getElementById('pressure').value = '';
        document.getElementById('temperature').value = '';
        document.getElementById('operation-select').value = 'parado';
    }
}

// Função para salvar como PDF (simulação)
function saveAsPDF() {
    alert('Salvando como PDF...');
    // Aqui você pode implementar a lógica para gerar um PDF usando uma biblioteca como jsPDF
}

// Atualizar a data e hora imediatamente ao carregar a página
updateDateTime();

// Carregar dados do equipamento ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadEquipmentData();
    document.getElementById('equipment-select').addEventListener('change', loadEquipmentData);
});
