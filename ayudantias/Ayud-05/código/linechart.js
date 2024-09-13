// EJEMPLO BASE line chart 

var trace1 = {
    x: [1, 2,  4, 5, 8],
    y: [1, 2,  4, 5, 8],
    mode: 'line',
    marker: {color: 'red'}
};

var trace2 = {
    x: [1, 2, 3, 4, 5, 8],
    y: [5, 10, 13, 17, 14, 20],
    marker: {color: 'green'}
};

var trace3 = {
    x: [1, 2, 3, 4, 5, 8],
    y: [2, 5, 7, 9,17, 19],
    mode: 'lines',
    type: 'scatter',
    marker: {color: 'blue'}
};

var data = [trace1, trace2, trace3];

var layout = {
    title: 'line chart Example',
    xaxis: { title: 'X Axis' },
    yaxis: { title: 'Y Axis' }
};

Plotly.newPlot('linechart 1', data, layout);

// USANDO DATOS REALES (coffee-prices-historical-data.csv)

async function fetchData() {
    const response = await fetch('coffee-prices-historical-data.csv');
    const data = await response.text();
    
    // Dividir los datos por líneas
    const rows = data.split('\n').slice(1);
    
    const date = [];
    const value = [];
    
    rows.forEach(row => {
        const cols = row.split(','); // ojo algunos csv tiene separacion ';'
        date.push(cols[0]);  // Aquí la fecha se maneja como string
        value.push(parseFloat(cols[1])); // valor numérico
    });

    return { date, value };
}

fetchData().then(data => {
    const trace = {
        x: data.date,
        y: data.value,
        mode: 'lines',
        type: 'scatter',
        marker: { color: "RGB 204, 21, 213"} 
    };
    
    const layout = {
        title: 'Precios Históricos del Café',
        xaxis: { title: 'Fechas', type: 'date' },  // Indicar que el eje X contiene fechas
        yaxis: { title: 'Valor (USD)' }
    };

    Plotly.newPlot('linechart 2', [trace], layout);
});