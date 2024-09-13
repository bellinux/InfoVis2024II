// crear un div desde javascript en vez de selecionar uno predeterminado de html
let nuevoDiv = document.createElement('div');

// Asignar un id único al nuevo div
nuevoDiv.id = 'barchart 1';

// Insertar el nuevo div dentro de un contenedor existente
document.body.appendChild(nuevoDiv);


var trace1 = {
    x: ['A', 'B', 'C', 'D', 'E'],
    y: [20, 14, 23, 25, 22],
    type: 'bar'
};

var data = [trace1];

var layout = {
    title: 'Bar Chart Example',
    xaxis: { title: 'Categories' },
    yaxis: { title: 'Values' }
};

Plotly.newPlot('barchart 1', data, layout);