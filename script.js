document.getElementById('photoInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('photoDisplay');
            img.src = e.target.result;
            img.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

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

// Função para gerar PDF completo
async function generateCompletePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionar dados do equipamento ao PDF
    const existingData = JSON.parse(localStorage.getItem('equipmentData')) || {};
    let yOffset = 20;

    for (const [key, value] of Object.entries(existingData)) {
        doc.text(`Equipamento: ${key}`, 10, yOffset);
        doc.text(`Pressão: ${value.pressure} bar`, 10, yOffset + 10);
        doc.text(`Temperatura: ${value.temperature} °C`, 10, yOffset + 20);
        doc.text(`Estado: ${value.operation}`, 10, yOffset + 30);
        doc.text(`Responsável: ${value.responsible}`, 10, yOffset + 40);
        doc.text(`Data/Horário: ${value.datetime}`, 10, yOffset + 50);
        yOffset += 60;
    }

    // Adicionar foto ao PDF
    const imgElement = document.getElementById('photoDisplay');
    if (imgElement.src) {
        const canvas = await html2canvas(imgElement);
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, yOffset, 180, (180 * canvas.height) / canvas.width);
    }

    // Salvar o PDF
    doc.save('relatorio_equipamentos.pdf');
}

// Atualizar a data e hora imediatamente ao carregar a página
updateDateTime();

// Carregar dados do equipamento ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadEquipmentData();
    document.getElementById('equipment-select').addEventListener('change', loadEquipmentData);
});
