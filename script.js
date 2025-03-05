document.getElementById('gerar-pdf').addEventListener('click', function() {
    const element = document.querySelector('.container');
    html2pdf().from(element).save('relatorio_compressores.pdf');
});
