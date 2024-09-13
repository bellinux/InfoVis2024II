// EJEMPLO BASE SCATTER PLOT
var trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [5, 10, 13, 17, 14],
    mode: 'markers',
    type: 'scatter'
};

var data = [trace1];

var layout = {
    title: 'Scatterplot Example',
    xaxis: { title: 'X Axis' },
    yaxis: { title: 'Y Axis' }
};

Plotly.newPlot('scatterplot 1', data, layout);

// USANDO DATOS REALES (score.csv)
// Función para leer el archivo CSV y convertirlo a un formato usable
async function fetchData() {
    const response = await fetch('score.csv');
    const data = await response.text();
    
    // Dividir los datos por líneas
    const rows = data.split('\n').slice(1);
    
    const hours = [];
    const scores = [];
    
    rows.forEach(row => {
        const cols = row.split(','); // ojo algunos csv tiene separacion ';'
        hours.push(parseFloat(cols[0]));
        scores.push(parseFloat(cols[1]));
    });

    return { hours, scores };
}
fetchData().then(data => {
    const trace = {
        x: data.hours,
        y: data.scores,
        mode: 'markers',
        type: 'scatter',
        marker: { color: 'blue', size: 10 } // TODO, ver si se puede modificar esto en css en vez de aca
    };
    
    const layout = {
        title: 'Study Hours vs Scores',
        xaxis: { title: 'Hours Studied' },
        yaxis: { title: 'Scores' }
    };

    Plotly.newPlot('scatterplot 2', [trace], layout);
});

