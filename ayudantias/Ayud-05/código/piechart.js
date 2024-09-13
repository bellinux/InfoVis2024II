let nuevoDiv = document.createElement('div');
nuevoDiv.id = 'piechart 1';
document.body.appendChild(nuevoDiv);

var data = [{
    values: [19, 26, 100], // calcula solo el porcentaje de cada valor
    labels: ['A', 'B', 'C'],
    type: 'pie'
}];

var layout = {
    title: 'Pie Chart Example'
};

Plotly.newPlot('piechart 1', data, layout);