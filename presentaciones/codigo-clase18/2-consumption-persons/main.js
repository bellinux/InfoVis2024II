import "https://cdn.plot.ly/plotly-2.34.0.min.js"; // Importa la librería Plotly para gráficos interactivos.
import Protobject from './js/protobject.js'; // Importa Protobject para recibir datos en tiempo real de otros scripts.

// Estructura HTML del gráfico y del contador de personas.
document.body.innerHTML = `
  <div id='myDiv'></div>  <!-- Contenedor del gráfico -->
  <p id="npersonas">0</p>  <!-- Muestra el número de personas -->
  <style>
    #myDiv {
      width: 1200px;
      height: 900px;
    }
    #npersonas {
      position: absolute;
      font: 40px sans-serif;
      top: 405px;
      left: 470px;
      display: none;  // Oculto inicialmente.
    }
    #npersonas:after {
      content: ' persona(s)';  // Sufijo después del número.
    }
  </style>
`;

// Datos ficticios....
var cData=[{time:"12:00 AM",cons1:470545,cons2:564654,cons3:677585,cons4:813102},{time:"1:00 AM",cons1:444445,cons2:533334,cons3:640001,cons4:768001},{time:"2:00 AM",cons1:422920,cons2:507504,cons3:609005,cons4:730806},{time:"3:00 AM",cons1:406416,cons2:487699,cons3:585239,cons4:702287},{time:"4:00 AM",cons1:394129,cons2:472955,cons3:567546,cons4:681055},{time:"5:00 AM",cons1:390258,cons2:468310,cons3:561972,cons4:674366},{time:"6:00 AM",cons1:391830,cons2:470196,cons3:564235,cons4:677082},{time:"7:00 AM",cons1:403545,cons2:484254,cons3:581105,cons4:697326},{time:"8:00 AM",cons1:418595,cons2:502314,cons3:602777,cons4:723332},{time:"9:00 AM",cons1:429666,cons2:515599,cons3:618719,cons4:742463},{time:"10:00 AM",cons1:442180,cons2:530616,cons3:636739,cons4:764087},{time:"11:00 AM",cons1:454986,cons2:545983,cons3:655180,cons4:786216},{time:"12:00 PM",cons1:466927,cons2:560312,cons3:672374,cons4:806849},{time:"1:00 PM",cons1:480078,cons2:576094,cons3:691313,cons4:829576},{time:"2:00 PM",cons1:492361,cons2:590833,cons3:709e3,cons4:850800},{time:"3:00 PM",cons1:503078,cons2:603694,cons3:724433,cons4:869320},{time:"4:00 PM",cons1:512177,cons2:614612,cons3:737534,cons4:885041},{time:"5:00 PM",cons1:519905,cons2:623886,cons3:748663,cons4:898396},{time:"6:00 PM",cons1:525905,cons2:631086,cons3:757303,cons4:908764},{time:"7:00 PM",cons1:525650,cons2:630780,cons3:756936,cons4:908323},{time:"8:00 PM",cons1:521763,cons2:626116,cons3:751339,cons4:901607},{time:"9:00 PM",cons1:511343,cons2:613612,cons3:736334,cons4:883601},{time:"10:00 PM",cons1:494099,cons2:592919,cons3:711503,cons4:853804},{time:"11:00 PM",cons1:479790,cons2:573348,cons3:689818,cons4:825982},{time:"12:00 AM",cons1:470545,cons2:564654,cons3:677585,cons4:813102}];

// Mapeo de las horas para el eje theta (angular) del gráfico
let time = cData.map(item => item.time);

// Mapeo de los consumos divididos por 200000 para normalizarlos en el rango 0-5 (los datos son ficticios)
let cons1 = cData.map(item => item.cons1 / 200000);
let cons2 = cData.map(item => item.cons2 / 200000);
let cons3 = cData.map(item => item.cons3 / 200000);
let cons4 = cData.map(item => item.cons4 / 200000);

// Generación de valores de texto con un decimal para mostrarlos en el hover
let cons1t = cons1.map(value => value.toFixed(1));
let cons2t = cons2.map(value => value.toFixed(1));
let cons3t = cons3.map(value => value.toFixed(1));
let cons4t = cons4.map(value => value.toFixed(1));

// Definición de la primera traza (curva) polar para el consumo 1
var trace1 = {
  theta: time, // Eje angular
  r: cons1,    // Eje radial
  text: cons1t, // Valores de texto para hover
  fill: 'toself', // El área se rellena hasta el centro
  type: 'scatterpolar', // Tipo de gráfico polar
  fillcolor: 'transparent', // Sin relleno visible (solo líneas)
  mode: 'lines', // Solo líneas (sin marcadores)
  line: {
    color: '#333', // Color de la línea
    width: 2,      // Grosor de la línea
    shape: 'spline', // Línea suavizada
    smoothing: 1.1,  // Nivel de suavizado
  },
  textfont: {
    color: "#111", // Color del texto
    size: 16,      // Tamaño del texto
  },
  hoverinfo: "none", // Desactivar información en hover para simplificar
};

// Definición de la segunda traza polar (similar a la primera)
var trace2 = {
  theta: time,
  r: cons2,
  text: cons2t,
  fill: 'tonext', // La segunda área se rellena entre esta curva y la anterior
  type: 'scatterpolar',
  fillcolor: 'transparent',
  mode: 'lines',
  line: {
    color: '#333',
    width: 2,
    shape: 'spline',
    smoothing: 1.1,
  },
  textfont: {
    color: "#111",
    size: 16,
  },
  hoverinfo: "none",
};

// Definición de la tercera traza polar
var trace3 = {
  theta: time,
  r: cons3,
  text: cons3t,
  fill: 'tonext',
  type: 'scatterpolar',
  mode: 'lines',
  fillcolor: 'transparent',
  line: {
    color: '#333',
    width: 2,
    shape: 'spline',
    smoothing: 1.1,
  },
  textfont: {
    color: "#111",
    size: 16,
  },
  hoverinfo: "none",
};

// Definición de la cuarta traza polar
var trace4 = {
  theta: time,
  r: cons4,
  text: cons4t,
  fill: 'tonext',
  type: 'scatterpolar',
  mode: 'lines',
  fillcolor: 'transparent',
  line: {
    color: '#333',
    width: 2,
    shape: 'spline',
    smoothing: 1.1,
  },
  textfont: {
    color: "#111",
    size: 16,
  },
  hoverinfo: "none",
};

// Agrupamos todas las trazas para graficarlas juntas
var data = [trace1, trace2, trace3, trace4];

var layout = {
  title: "Consumo eléctrico medio en kW para familias de 1 a 4 personas durante el día en una ciudad no especificada.",
  showlegend: false, // No se muestra la leyenda
  polar: {
    radialaxis: {
      visible: true, // Mostrar el eje radial
      showgrid: true, // Mostrar las líneas de la cuadrícula
      griddash: "dot", // Tipo de línea punteada
      gridcolor: "#aaa", // Color de las líneas de cuadrícula
      tickvals: [1, 2, 3, 4, 5], // Valores de las marcas de la escala
      ticktext: ['        1 kW', "", '   3 kW', '         4 kW',""], // Texto de las marcas de escala
      angle: 0, // Inicia en el ángulo 0
      range: [0, 5.1], // Rango del eje radial
      tickcolor: "transparent", // Las marcas de escala son invisibles
      ticklen: 0, // Longitud de la marca de escala (no hay)
      showline: false // Ocultar el borde radial
    },
    angularaxis: {
      showgrid: false, // No mostrar líneas en el eje angular
      showline: false, // No mostrar el borde angular
      tickcolor: "transparent", // Marcas invisibles
      direction: "clockwise" // Dirección del gráfico: en sentido horario
    }
  }
};


Plotly.newPlot('myDiv', data, layout);

// Obtener la referencia del gráfico
var myDiv = document.getElementById('myDiv');

// Manejo del evento hover
myDiv.on('plotly_hover', function(data) {
  var curveNumber = data.points[0].curveNumber; // Obtener el número de curva
  drawForFaces(curveNumber + 1);
});

function drawForFaces(curveNumber) {
  // Mostrar el número de personas basado en la curva actual
  var personasDiv = document.getElementById("npersonas");
  personasDiv.style.display = "block";
  personasDiv.innerHTML = curveNumber;

  // Si el número de curva es 0, restaurar los valores originales
  if (curveNumber == 0) {
    restore();
    return;
  }
  
  // Ajustamos curveNumber a un índice válido
  curveNumber--;

  // Establecer los colores y las modalidades en función del número de curva
  var fillColors = ['#ddd', '#ddd', '#ddd', '#ddd'];
  var modes = ['lines', 'lines', 'lines', 'lines']; // Inicializar todos como 'lines'

  // Cambiar colores solo hasta la curva actual
  for (var i = 0; i <= curveNumber; i++) {
    fillColors[i] = '#77bbee'; // Colorear el área resaltada
  }

  // Solo la curva seleccionada mostrará 'lines+text'
  modes[curveNumber] = 'lines+text'; 

  // Crear el objeto de actualización
  var update = {
    fillcolor: fillColors,
    mode: modes,
    line: {
      color: '#888', // Color de la línea al hacer hover
      width: 1,      // Grosor de la línea reducido
      shape: 'spline', // Líneas suavizadas
      smoothing: 1.1  // Nivel de suavizado
    }
  };

  // Ocultar temporalmente los textos del eje radial
  layout.polar.radialaxis.ticktext = ['', '', '', '', ''];

  // Aplicar la actualización a la gráfica
  Plotly.restyle('myDiv', update);
  Plotly.relayout('myDiv', layout);
}

// Manejo del evento unhover (restaurar el gráfico)
myDiv.on('plotly_unhover', function() {
  restore();
});

// Función para restaurar el gráfico a su estado original
function restore() {
  document.getElementById("npersonas").style.display = "none"; // Ocultar el div de personas

  // Restablecer los valores originales
  var update = {
    fillcolor: ['transparent', 'transparent', 'transparent', 'transparent'],
    mode: ['lines', 'lines', 'lines', 'lines'],
    line: {
      color: '#333', // Restaurar el color de la línea
      width: 2,      // Restaurar el grosor de la línea
      shape: 'spline', // Líneas suavizadas
      smoothing: 1.1  // Nivel de suavizado
    }
  };

  // Restaurar los textos del eje radial
  layout.polar.radialaxis.ticktext = ['        1 kW', "", '   3 kW', '         4 kW', ""];

  // Actualizar el gráfico
  Plotly.restyle('myDiv', update);
  Plotly.relayout('myDiv', layout);
}

// Función que se ejecuta cuando se recibe un dato desde Protobject
Protobject.onReceived((data) => {
  drawForFaces(data);
});
