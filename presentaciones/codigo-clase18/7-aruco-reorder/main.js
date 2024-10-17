import "https://cdn.plot.ly/plotly-2.34.0.min.js"; // Importa la librería Plotly para gráficos
import Protobject from './js/protobject.js'; // Importa el objeto Protobject para la comunicación

// Crea un contenedor para el gráfico en el cuerpo del documento
document.body.innerHTML = `<div id='myDiv' style="width: 800px"></div>`;

// Inicializa un array para almacenar las trazas del gráfico
var trace = []; 

// Define los países y productos que se van a visualizar
var countries = ['Italia', 'Francia', 'Alemania'];
var productos = ["Porotos", "Té", "Atún"];

// Define la primera traza para "Porotos"
trace[1] = { // 1 es el marcador Aruco de los porotos
  x: countries, // Eje X: países
  y: [20, 14, 23], // Eje Y: cantidades exportadas
  marker: { color: '#8B4513' }, // Color del marcador
  name: productos[0], // Nombre del producto
  width: 0.5, // Ancho de las barras
  type: 'bar' // Tipo de gráfico
};

// Define la segunda traza para "Té"
trace[100] = { // 100 es el marcador Aruco del té
  x: countries,
  y: [12, 18, 29],
  width: [0.8, 0.8, 0.8], // Ancho de las barras (puede ser redundante)
  marker: { color: '#556B2F' },
  name: productos[1],
  width: 0.5,
  type: 'bar'
};

// Define la tercera traza para "Atún"
trace[200] = { // 100 es el marcador Aruco del Atun
  x: countries,
  y: [14, 13, 18],
  width: [0.8, 0.8, 0.8],
  marker: { color: '#4682B4' },
  name: productos[2],
  width: 0.5,
  type: 'bar'
};

// Define el layout del gráfico
var layout = {
  barmode: 'stack', // Modo de apilamiento de las barras
  title: 'Exportación de productos por país en toneladas' // Título del gráfico
};

// Inicializa el gráfico con el conjunto de datos
var dataset = [trace[1], trace[100], trace[200]];
Plotly.newPlot('myDiv', dataset, layout); // Dibuja el gráfico en el div con id 'myDiv'

// Escucha los datos recibidos desde Protobject
Protobject.onReceived((order) => {
  let dataset = []; // Array para almacenar las trazas seleccionadas según el orden

  // Añade las trazas según el orden recibido, si existen
  if (trace[order[0]]) { dataset.push(trace[order[0]]); }
  if (trace[order[1]]) { dataset.push(trace[order[1]]); }
  if (trace[order[2]]) { dataset.push(trace[order[2]]); }
  
  // Redibuja el gráfico con las trazas seleccionadas
  Plotly.newPlot('myDiv', dataset, layout);
});
