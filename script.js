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
    const responsible = document.getElementById('responsible').value;
    const datetime = document.getElementById('datetime').textContent;

    const data = { pressure, temperature, operation, responsible, datetime };
    const existingData = JSON.parse(localStorage.getItem('equipmentData')) || {};
    existingData[equipment] = data;
    localStorage.setItem('equipmentData', JSON.stringify(existingData));
}

// Função para carregar dados do equipamento do localStorage
function loadEquipmentData() {
    const equipment = document.getElementById('equipment-select').value;
    const existingData = JSON.parse(localStorage.getItem('equipmentData')) || {};
    const data = existingData[equipment];

    if (data) {
        document.getElementById('pressure').value = data.pressure || '';
        document.getElementById('temperature').value = data.temperature || '';
        document.getElementById('operation-select').value = data.operation || 'parado';
        document.getElementById('responsible').value = data.responsible || '';
    } else {
        // Resetar campos se não houver dados salvos
        document.getElementById('pressure').value = '';
        document.getElementById('temperature').value = '';
        document.getElementById('operation-select').value = 'parado';
        document.getElementById('responsible').value = '';
    }
}

// Função para gerar PDF completo (simulação)
function generateCompletePDF() {
    alert('Gerando PDF completo...');
    // Aqui você pode implementar a lógica para gerar um PDF usando uma biblioteca como jsPDF
    // Recupere todos os dados do localStorage e gere o PDF
}

// Atualizar a data e hora imediatamente ao carregar a página
updateDateTime();

// Carregar dados do equipamento ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadEquipmentData();
    document.getElementById('equipment-select').addEventListener('change', loadEquipmentData);
});
