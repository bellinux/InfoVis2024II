import "https://cdn.plot.ly/plotly-2.34.0.min.js";
import Protobject from './js/protobject.js';

//Ver codigo aqui para entender mas detalles: https://github.com/bellinux/InfoVis2014II/blob/main/presentaciones/codigo-clase11/terremotos.html

//Este codigo abajo agrega todo el HTML y CSS
document.body.insertAdjacentHTML('beforeend', `
    <div id='title'><h1>Terremotos de Chile desde el 2000</h1></div>
    <div id='details'>
        <span id="nombre"></span> <span id="regiones"></span> <span id="muertos"></span> <span id="magnitud"></span>
        <span id="tzunami"><img src="https://bellinux.github.io/proyectos-infovis/tzunami.png" /></span>
    </div>
    <div id='myMap'></div>
    <img id="context" src="https://bellinux.github.io/proyectos-infovis/map.svg" />

	<style>
	* { font-family: sans-serif; }
	#context {	pointer-events: none; position: absolute; top: 85px; left: 83px; transition: 500ms ease all; }
	#myMap { position: absolute;	width: 200px; height: 800px; border: 0px solid #333; left: 30px;top: 0px; }
	#details { position: absolute; left: 270px; top: 145px; width: 500px; height: 500px; transition: 500ms ease all; opacity: 0; }
	#title { position: absolute; left: 265px; top: 20px; }
	h1 { font-size: 36px; font-weight: 200; color: #777; }
	span { display: block; margin-top: 6px; }
	#nombre { font-size: 18px; font-weight: 800; color: #333; }
	#regiones {	font-size: 16px; font-weight: 200; font-style: italic; }
	#muertos:after { content: ' muertos'; font-size: 16px; font-weight: 500; text-transform: uppercase; color: #444; }
	#tzunami img { height: 120px; }
	#tzunami { position: absolute;	top: 224px;	margin-left: 121px;	}
	#muertos { transition: 500ms ease all;	font-size: 60px; margin-top: 59px; font-weight: 700; color: #970b0b; }
	#magnitud {	width: 100px; transition: 500ms all ease; height: 100px; border: 1px solid;	text-align: center;	line-height: 100px;	border-radius: 100px;margin-top: 43px; font-size: 20px; background: #881d0f; color: #fff;}
	#magnitud:after { content: "MW"; font-size: 12px; }
	</style>
`);

//Los datos estan en la variable terremotos abajo. Se minimizaron para que esten en una sola linea.
const terremotos=[{Fecha:"24 de julio de 2001 (01:00)",Nombre:"Tarapac\xe1 de 2001",Lat:-19,Lon:-70,Zonas:"I\xa0y\xa0II\xa0regiones",Magnitud:6.5,Tzunami:!1,Muertos:1},{Fecha:"18 de abril de 2002 (12:08)",Nombre:"Copiap\xf3 de 2002",Lat:-27.535,Lon:-70.586,Zonas:"II\xa0y\xa0III\xa0regiones",Magnitud:6.8,Tzunami:!1,Muertos:0},{Fecha:"18 de junio de 2002 (09:56)",Nombre:"Coquimbo de 2002",Lat:-30.805,Lon:-71.124,Zonas:"IV regi\xf3n",Magnitud:6.7,Tzunami:!1,Muertos:0},{Fecha:"20 de junio de 2003 (09:30)",Nombre:"Coquimbo de 2003",Lat:-30.653,Lon:-71.533,Zonas:"IV\xa0y\xa0V\xa0regiones",Magnitud:6.8,Tzunami:!1,Muertos:0},{Fecha:"2 de mayo de 2004 (00:36)",Nombre:"Angol de 2004",Lat:-37.695,Lon:-73.406,Zonas:"VII,\xa0VIII\xa0y\xa0IX\xa0regiones",Magnitud:6.7,Tzunami:!1,Muertos:0},{Fecha:"28 de agosto de 2004 (09:41)",Nombre:"Curic\xf3 de 2004",Lat:-35.173,Lon:-70.525,Zonas:"V\xa0hasta\xa0VIII regi\xf3n",Magnitud:6.6,Tzunami:!1,Muertos:0},{Fecha:"13 de junio de 2005 (18:44)",Nombre:"Tarapac\xe1 de 2005",Lat:-19.895,Lon:-69.125,Zonas:"I regi\xf3n",Magnitud:7.9,Tzunami:!1,Muertos:11},{Fecha:"30 de abril de 2006 (15:17)",Nombre:"Copiap\xf3 de 2006",Lat:-27.017,Lon:-71.022,Zonas:"III regi\xf3n",Magnitud:6.8,Tzunami:!1,Muertos:0},{Fecha:"21 de abril de 2007 (13:53)",Nombre:"Ays\xe9n de 2007",Lat:-45.266,Lon:-72.496,Zonas:"XI regi\xf3n",Magnitud:6.3,Tzunami:!0,Muertos:10},{Fecha:"14 de noviembre de 2007 (12:40)",Nombre:"Tocopilla de 2007",Lat:-22.314,Lon:-70.078,Zonas:"I\xa0y\xa0II\xa0regiones",Magnitud:7.7,Tzunami:!1,Muertos:2},{Fecha:"4 de febrero de 2008 (14:01)",Nombre:"Iquique de 2008",Lat:-20.166,Lon:-70.037,Zonas:"XV,\xa0I\xa0y\xa0II\xa0regiones",Magnitud:6.4,Tzunami:!1,Muertos:0},{Fecha:"13 de noviembre de 2009 (00:05)",Nombre:"Iquique de 2009",Lat:-19.394,Lon:-70.321,Zonas:"XV,\xa0I\xa0y\xa0II\xa0regiones",Magnitud:6.6,Tzunami:!1,Muertos:0},{Fecha:"27 de febrero de 2010 (03:34)",Nombre:"Cauquenes de 2010",Lat:-36.29,Lon:-73.239,Zonas:"IV,\xa0V,\xa0VI,\xa0VII,\xa0XVI,\xa0VIII,\xa0IX,\xa0X,\xa0XIV\xa0regiones y\xa0R.M.",Magnitud:8.8,Tzunami:!0,Muertos:521},{Fecha:"11 de marzo de 2010 (11:39)",Nombre:"Pichilemu de 2010",Lat:-34.259,Lon:-71.929,Zonas:"V,\xa0VI,\xa0VII,\xa0XVI\xa0y\xa0VIII\xa0regiones y\xa0R.M.",Magnitud:7,Tzunami:!1,Muertos:2},{Fecha:"2 de enero de 2011 (17:20)",Nombre:"Tir\xfaa de 2011",Lat:-38.35,Lon:-73.27,Zonas:"VIII\xa0y\xa0IX\xa0regiones",Magnitud:7.3,Tzunami:!1,Muertos:0},{Fecha:"25 de marzo de 2012 (19:37)",Nombre:"Constituci\xf3n de 2012",Lat:-35.12,Lon:-72.13,Zonas:"V\xa0a\xa0VIII\xa0regiones",Magnitud:7.2,Tzunami:!1,Muertos:2},{Fecha:"17 de abril de 2012 (00:50)",Nombre:"Zapallar de 2012",Lat:-32.625,Lon:-71.365,Zonas:"IV,\xa0V,\xa0VI,\xa0VII\xa0regiones y\xa0R.M.",Magnitud:6.8,Tzunami:!1,Muertos:2},{Fecha:"30 de enero de 2013 (17:15)",Nombre:"Vallenar de 2013",Lat:-28.06,Lon:-70.84,Zonas:"III\xa0a\xa0VIII\xa0regiones",Magnitud:6.9,Tzunami:!1,Muertos:1},{Fecha:"16 de marzo de 2014 (18:16)",Nombre:"Iquique de 2014",Lat:-19.96,Lon:-70.81,Zonas:"XV,\xa0I\xa0y\xa0II\xa0regiones",Magnitud:6.8,Tzunami:!1,Muertos:0},{Fecha:"1 de abril de 2014 (20:46)",Nombre:"Iquique de 2014",Lat:-19.63,Lon:-70.86,Zonas:"XV,\xa0I\xa0y\xa0II\xa0regiones",Magnitud:8.3,Tzunami:!0,Muertos:7},{Fecha:"2 de abril de 2014 (23:43)",Nombre:"Iquique de 2014",Lat:-20.545,Lon:-70.418,Zonas:"XV,\xa0I,\xa0II\xa0y\xa0III\xa0regiones",Magnitud:7.7,Tzunami:!0,Muertos:0},{Fecha:"8 de octubre de 2014 (21:14)",Nombre:"Isla de Pascua de 2014",Lat:-32.11,Lon:-110.77,Zonas:"V regi\xf3n",Magnitud:7.1,Tzunami:!1,Muertos:0},{Fecha:"16 de septiembre de 2015 (19:54)",Nombre:"Coquimbo de 2015",Lat:-31.535,Lon:-71.919,Zonas:"III,\xa0IV,\xa0V,\xa0VI,\xa0VII,\xa0XVI,\xa0VIII,\xa0IX\xa0regiones y\xa0R.M.",Magnitud:8.4,Tzunami:!0,Muertos:15},{Fecha:"25 de diciembre de 2016 (11:22)",Nombre:"Chilo\xe9 de 2016",Lat:-43.517,Lon:-74.391,Zonas:"VIII,\xa0IX,\xa0XIV,\xa0X\xa0y\xa0XI\xa0regiones",Magnitud:7.6,Tzunami:!1,Muertos:0},{Fecha:"24 de abril de 2017 (18:38)",Nombre:"Valpara\xedso de 2017",Lat:-33.07,Lon:-72.382,Zonas:"IV,\xa0V,\xa0VI,\xa0VII,\xa0XVI,\xa0VIII\xa0regiones y\xa0R.M.",Magnitud:6.9,Tzunami:!1,Muertos:0},{Fecha:"19 de enero de 2019 (22:32)",Nombre:"Coquimbo de 2019",Lat:-30.276,Lon:-71.364,Zonas:"III,\xa0IV,\xa0V,\xa0VI\xa0y\xa0R.M.",Magnitud:6.7,Tzunami:!1,Muertos:2},{Fecha:"3 de junio de 2020 (03:35)",Nombre:"San Pedro de Atacama de 2020",Lat:-23.247,Lon:-68.53,Zonas:"XV,\xa0I,\xa0II\xa0y\xa0III\xa0regiones",Magnitud:6.9,Tzunami:!1,Muertos:0},{Fecha:"17 de julio de 2020 (01:40)",Nombre:"Iquique de 2020",Lat:-20.235,Lon:-70.14,Zonas:"XV,\xa0I\xa0y\xa0II\xa0regiones",Magnitud:5.9,Tzunami:!1,Muertos:0},{Fecha:"1 de septiembre de 2020 (00:09)",Nombre:"Vallenar de 2020",Lat:-27.96,Lon:-71.24,Zonas:"II,\xa0III,\xa0IV,\xa0V\xa0regiones y\xa0R.M.",Magnitud:7,Tzunami:!1,Muertos:0},{Fecha:"11 de septiembre de 2020 (04:35)",Nombre:"Quillagua de 2020",Lat:-21.363,Lon:-69.907,Zonas:"XV,\xa0I\xa0y\xa0II\xa0regiones",Magnitud:6.3,Tzunami:!1,Muertos:0},{Fecha:"23 de enero de 2021 (20:36)",Nombre:"Shetland del Sur de 2021",Lat:-61.9,Lon:-55,Zonas:"XII regi\xf3n",Magnitud:7.1,Tzunami:!1,Muertos:0},{Fecha:"28 de julio de 2022 (00:15)",Nombre:"Tocopilla de 2022",Lat:-21.931,Lon:-70.339,Zonas:"I,\xa0II\xa0y\xa0III\xa0regiones",Magnitud:6.1,Tzunami:!1,Muertos:0},{Fecha:"12 de noviembre de 2022 (23:24)",Nombre:"Lebu de 2022",Lat:-37.465,Lon:-73.676,Zonas:"VII,\xa0XVI,\xa0VIII,\xa0IX\xa0y\xa0XIV\xa0regiones",Magnitud:6.2,Tzunami:!1,Muertos:0},{Fecha:"30 de marzo de 2023 (14:34)",Nombre:"Cobquecura de 2023",Lat:-35.666,Lon:-73.497,Zonas:"VII,\xa0XVI\xa0y\xa0VIII\xa0regiones",Magnitud:6.3,Tzunami:!1,Muertos:0},{Fecha:"18 de julio de 2024 (21:50)",Nombre:"San Pedro de Atacama de 2024",Lat:-23.047,Lon:-67.782,Zonas:"XV,\xa0I,\xa0I,\xa0III\xa0y\xa0IV\xa0regiones",Magnitud:7.4,Tzunami:!1,Muertos:1}];

const myPlot = document.getElementById('myMap');

const lon = terremotos.map(item => item.Lon);
const lat = terremotos.map(item => item.Lat);
//magnitudRaw son las magnitudes reales
const magnitudRaw=terremotos.map(item => item.Magnitud);
//magnitud transforma las magnitudes reales para que las diferencias sean mas evidentes. 
const magnitud = terremotos.map(item => (item.Magnitud * 5 - 28));

const data = [{
      type: 'choropleth', locations: ['CHL'], z: [5], zmin: 0, zmax: 10, hoverinfo: "skip", showscale: false,
      colorscale: [[0, 'rgb(255,255,255)'], [1, 'rgb(200,200,200)']],
    }, {
      type: 'scattergeo', mode: 'markers', lon: lon, lat: lat, cmax: 9, cmin: 6, hoverinfo: "none", name: '',
      marker: {
        color: magnitud, size: magnitud, colorscale: [[0, 'rgb(255,255,255)'], [1, 'rgb(0,0,0)']],
        line: { color: 'black' }
      },
}];

const layout = {
      geo: {
        scope: 'south america', resolution: 150, showland: true, landcolor: 'rgb(255, 255, 255)',
        subunitwidth: 1, countrywidth: 1, subunitcolor: 'rgb(255,255,255)', countrycolor: 'rgb(255,255,255)',
        lonaxis: { range: [-64, -76] },
        lataxis: { range: [-18, -59] }
      },
      autosize: false, width: 200, height: 800, dragmode: false, 
      margin: { l: 0, r: 0, b: 0, t: 0, pad: 0, },
};

Plotly.newPlot('myMap', data, layout, { scrollZoom: false, displayModeBar: false });

const highAudio = new Audio("https://bellinux.github.io/proyectos-infovis/effects/high.mp3");
const mediumAudio = new Audio("https://bellinux.github.io/proyectos-infovis/effects/medium.mp3");
const lowAudio = new Audio("https://bellinux.github.io/proyectos-infovis/effects/low.mp3");

myPlot.on('plotly_hover', function(data) {
    var index = data.points[0].pointIndex;
  	//deshabilitar el interval que gestiona la interaccion 
  	clearInterval(interactionInterval);
	showDetail(index);
});

function showDetail(index){
      document.getElementById("nombre").innerHTML = terremotos[index].Nombre;
      document.getElementById("regiones").innerHTML = terremotos[index].Zonas;

      if (terremotos[index].Tzunami) {
        document.getElementById("tzunami").style.display = "block";
      } else {
        document.getElementById("tzunami").style.display = "none";
      }

      if (terremotos[index].Muertos == 0) {
        document.getElementById("muertos").style.color = "#124599";
      } else {
        document.getElementById("muertos").style.color = "";
      }

      document.getElementById("muertos").innerHTML = terremotos[index].Muertos;

      var magnitud = terremotos[index].Magnitud;
      var magnitudElement = document.getElementById("magnitud");
      magnitudElement.innerHTML = magnitud;

      magnitud *= 10;
      magnitudElement.style.width = magnitud + "px";
      magnitudElement.style.height = magnitud + "px";
      magnitudElement.style.lineHeight = magnitud + "px";
      document.querySelector("#tzunami img").style.height = magnitud + "px";

      document.getElementById("details").style.opacity = 1;
      document.getElementById("context").style.opacity = 0;
}

myPlot.on('plotly_unhover', function() {
	showInitialContext();
  	//habilitar el interval que gestiona la interaccion 
  	activateInteraction();
});

function showInitialContext(){
    document.getElementById("details").style.opacity = 0;
    document.getElementById("context").style.opacity = 1;
}

var timeout;
myPlot.on('plotly_click', function(data) {
      earthQuake({
        el: myPlot,
        animationOption: "shaky"
      });

      var magnitudSound = terremotos[data.points[0].pointIndex].Magnitud;
      Protobject.send(magnitudSound - 5.9).to('phys.js');

      var volumeHigh = magnitudSound - 7.9;
      var volumeMedium = magnitudSound - 6.9;
      var volumeLow = magnitudSound - 5.9;

      volumeHigh = Math.max(0, Math.min(volumeHigh, 1));
      volumeMedium = Math.max(0, Math.min(volumeMedium, 1));
      volumeLow = Math.max(0, Math.min(volumeLow, 1));

      highAudio.volume = volumeHigh;
      mediumAudio.volume = volumeMedium;
      lowAudio.volume = volumeLow;

      highAudio.currentTime = 0;
      mediumAudio.currentTime = 0;
      lowAudio.currentTime = 0;

      highAudio.play();
      mediumAudio.play();
      lowAudio.play();

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        highAudio.pause();
        mediumAudio.pause();
        lowAudio.pause();
        Protobject.send(0).to('phys.js');
      }, 20000);
});

let generatedMagnitude = 0;

// Comentarios CLASE 18 abajo 
// Escucha los valores de magnitud generados
Protobject.onReceived((magnitude) => {
    generatedMagnitude = magnitude;
});

// Encuentra el índice del terremoto más cercano al valor generado
function indiceMasCercano(valorGenerado) {
    // Inicializa el índice y la diferencia mínima con el primer valor
    let indiceMasCercano = 0;
    let diferenciaMinima = Math.abs(valorGenerado - magnitudRaw[0]);

    // Itera a través de las magnitudes para encontrar la más cercana
    for (let i = 1; i < magnitudRaw.length; i++) {
        const diferenciaActual = Math.abs(valorGenerado - magnitudRaw[i]);
        
        // Actualiza si la diferencia actual es menor que la mínima registrada
        if (diferenciaActual < diferenciaMinima) {
            diferenciaMinima = diferenciaActual;
            indiceMasCercano = i;
        }
    }

    return indiceMasCercano;
}

let interactionInterval;

// Activa la interacción para mostrar información sobre el terremoto
function activateInteraction() {
    interactionInterval = setInterval(() => {
        // Solo realiza la acción si la magnitud generada es mayor que 3
        if (generatedMagnitude > 3) {
            console.log(`Generated magnitude: ${generatedMagnitude}`);
            const indexTerremoto = indiceMasCercano(generatedMagnitude);
            showDetail(indexTerremoto);
        } else {
            showInitialContext();
        }
    }, 3000);
}

// Inicia la función de interacción
activateInteraction();

//Funcion para crear el efecto terremoto encontrada en https://esqsoft.com/javascript_examples/earthquake
function earthQuake(e){e.el.getAttribute("data-quake")||(e.el.setAttribute("data-quake",!0),function e(n){var l,i,o;let a=[[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0]],[f,s]=a[n.index%a.length];l=n.el,i=n.x+f*n.delta,o=n.y+s*n.delta,l.style.left=t(i),l.style.top=t(o),n.index=(n.index+1)%a.length,--n.ttl>0?setTimeout(()=>e(n),n.speedMilliseconds):(n.el.removeAttribute("data-quake"),n=null)}({el:e.el,index:0,ttl:360,delta:1,speedMilliseconds:50,animationOption:e.animationOption||parseInt(2*Math.random()),...function e(t){let n=t.offsetLeft,l=t.offsetTop,i=t.offsetParent;for(;null!=i&&"relative"!==getComputedStyle(i).position;)n+=i.offsetLeft,l+=i.offsetTop,i=i.offsetParent;return{x:n,y:l}}(e.el)}));function t(e){return`${e}px`}}






