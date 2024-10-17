import "https://cdn.plot.ly/plotly-2.34.0.min.js";
import Protobject from './js/protobject.js';

// Configuración del DOM
document.body.innerHTML = `
  <div id='myDiv'></div>
  <div id='temp'><span id="indoor">X</span><span id="outdoor">X</span></div>
  <div id='close'>Close the door</div>
  <img id="heating" src="https://cdn.prod.website-files.com/66a9fa240521ccee763070c4/66a9fa250521ccee7630754d_6411a968c5a76062f53e9817_ezgif.com-resize.gif"></img>
  <style>
    #myDiv { width: 800px; }
    #indoor:before { content:'Indoor '; font-weight:200; }
    #outdoor:before { content:'Outdoor '; font-weight:200; }
    #indoor:after, #outdoor:after { content:'º'; }
    #indoor, #outdoor { font: 40px sans-serif; margin-left: 120px; font-weight:800; color:#333; }
    #close { display:none; font: 60px sans-serif; margin-left: 120px; margin-top: 40px; font-weight:800; color:#995522; }
    #heating { position: absolute; left:540px; top:20px; height:360px; }
  </style>
`;

let time = [];
let temp = [];

// Formatea la fecha y hora para ser usada en el gráfico
function getFormattedDate(timestamp) {
    // El formato de Suecia ('sv-SE') se utiliza simplemente porque es uno de los pocos locales que sigue el estándar ISO 8601 (YYYY-MM-DD HH:mm:ss)
    return new Date(timestamp).toLocaleString('sv-SE'); 
}

// Función que plotea los datos de temperatura a partir de la apertura de la puerta
function plotData(indoorTemp, outdoorTemp, doorAngle) {
    // Reinicia los arrays de tiempo y temperatura
    time.length = 0; // Mejor que usar `time = []` para no crear un nuevo array
    temp.length = 0; // Mejor que usar `temp = []` para no crear un nuevo array

    const exchangeRate = doorAngle / 90; // Porcentaje de apertura de la puerta
    const secondNumber = 4000; // Duración de la simulación (segundos)
    const actualTime = Date.now();

    // Genera los datos de tiempo y temperatura
    for (let i = 0; i < secondNumber; i++) {
        time.push(getFormattedDate(actualTime + (i * 1000)));
        // Modelo de enfriamiento exponencial -- No es confiable! Es solo para probar.
        const tempDropRate = exchangeRate * (indoorTemp - outdoorTemp) * (1 - Math.exp(-i / 600));
        // Temperatura interna después de un cierto tiempo, teniendo en cuenta el efecto de calentamiento
        let indoorTempAfterTime = indoorTemp - tempDropRate;
        indoorTempAfterTime = Math.max(indoorTempAfterTime, outdoorTemp); // Asegúrate de que no sea inferior a la temperatura exterior
        temp.push(indoorTempAfterTime);
    }

    // Configura el trazo del gráfico
    const trace1 = {
        type: "scatter",
        mode: "lines",
        x: time,
        y: temp,
        line: { color: '#333' }
    };

    // Configura el diseño del gráfico
    const layout = {
        title: 'Temperatura estimada en el tiempo',
        font: {
            color: "black",
            size: 20
        },
        showlegend: false,
        xaxis: {
            range: [time[0], time[time.length - 1]],
            tickformat: '%H:%M'
        },
        yaxis: {
            title: 'Temperatura (°C)',
            range: [0, 30] // Ajusta la escala según este rango
        }
    };

    // Dibuja el gráfico
    Plotly.newPlot('myDiv', [trace1], layout);
}

const inTemp = 25; // Temperatura interior inicial
const outTemp = 8;  // Temperatura exterior inicial

// Muestra las temperaturas en el DOM
document.getElementById("indoor").innerHTML = inTemp;
document.getElementById("outdoor").innerHTML = outTemp;

let apertura = 0;

// Realiza la estimación cada segundo, actualizando también el tiempo del gráfico.
setInterval(() => {
    plotData(inTemp, outTemp, apertura);
}, 1000);

// Realiza la estimación también cuando llegan nuevos datos sobre la apertura de la puerta.
Protobject.onReceived((data) => {
    apertura = data; // Actualiza el ángulo de apertura
    plotData(inTemp, outTemp, data); // Plotea los nuevos datos

    // Muestra/oculta el mensaje y la imagen dependiendo de la apertura
    if (data > 4) {
        document.getElementById("close").style.display = "block";
        document.getElementById("heating").style.display = "none";
    } else {
        document.getElementById("close").style.display = "none";
        document.getElementById("heating").style.display = "block";
    }
});
