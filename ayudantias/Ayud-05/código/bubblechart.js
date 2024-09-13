let nuevoDiv = document.createElement('div');
nuevoDiv.id = 'bubblechart 1';
document.body.appendChild(nuevoDiv);

var trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [10, 15, 13, 17, 12],
    mode: 'markers',
    marker: {
        size: [40, 60, 80, 100],
    }
};

var data = [trace1];

var layout = {
    title: 'Bubble Chart Example',
    xaxis: { title: 'X Axis' },
    yaxis: { title: 'Y Axis' }
};

Plotly.newPlot('bubblechart 1', data, layout);