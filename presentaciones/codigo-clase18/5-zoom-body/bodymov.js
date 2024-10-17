import Protobject from './js/protobject.js';
import BodySensor from './js/bodySensor.js';
 
// Inicia el sensor del cuerpo, generando eventos cada 200 ms
BodySensor.start(20); 
BodySensor.flip(true); // Activa el volteo (flip)
BodySensor.showPreview({ top: 30, left: 0, width: 400, height: 320 });

// https://github.com/wouterbulten/kalmanjs/tree/master/dist
var KalmanFilter=function(){"use strict";function s(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(){function v(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},i=t.R,e=void 0===i?1:i,s=t.Q,n=void 0===s?1:s,r=t.A,h=void 0===r?1:r,a=t.B,o=void 0===a?0:a,u=t.C,c=void 0===u?1:u;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,v),this.R=e,this.Q=n,this.A=h,this.C=c,this.B=o,this.cov=NaN,this.x=NaN}var t,i,e;return t=v,(i=[{key:"filter",value:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;if(isNaN(this.x))this.x=1/this.C*t,this.cov=1/this.C*this.Q*(1/this.C);else{var e=this.predict(i),s=this.uncertainty(),n=s*this.C*(1/(this.C*s*this.C+this.Q));this.x=e+n*(t-this.C*e),this.cov=s-n*this.C*s}return this.x}},{key:"predict",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;return this.A*this.x+this.B*t}},{key:"uncertainty",value:function(){return this.A*this.cov*this.A+this.R}},{key:"lastMeasurement",value:function(){return this.x}},{key:"setMeasurementNoise",value:function(t){this.Q=t}},{key:"setProcessNoise",value:function(t){this.R=t}}])&&s(t.prototype,i),e&&s(t,e),v}()}();

// Inicializa los filtros de Kalman para zoom y movimiento
var zoomKalman = new KalmanFilter({ R: 0.05, Q: 0.5 });
var movingKalman = new KalmanFilter({ R: 0.05, Q: 0.5 });

// Calcula la distancia entre dos puntos en el espacio
function pointDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1; 
    return Math.sqrt(dx * dx + dy * dy); 
}

// Inicializa factores de zoom y movimiento
let zoomFactor = 0;
let movingFactor = 0;

// Maneja los datos recibidos del sensor del cuerpo
BodySensor.onData((data) => {
    if (data.landmarks[0] && data.landmarks[0][12] !== undefined && data.landmarks[0][11] !== undefined) {
        // Calcula el zoom en base a la distancia entre los puntos 12 y 11 (hombros)
        zoomFactor = pointDistance(data.landmarks[0][12].x, data.landmarks[0][12].y, 
                                   data.landmarks[0][11].x, data.landmarks[0][11].y) * 100;

        zoomFactor += 10; // Ajusta el factor de zoom mínimo
        movingFactor = data.landmarks[0][0].x * 100; // Calcula el desplazamiento horizontal (nariz)

        // Filtra los valores utilizando los filtros de Kalman
        zoomFactor = zoomKalman.filter(zoomFactor);
        movingFactor = movingKalman.filter(movingFactor);
      
        // El maximo factor de zoom es 55 (valor calculado con pruebas y errores)
        zoomFactor=Math.min(zoomFactor, 55)

        // Envía los datos filtrados al script main.js
        Protobject.send({ zoom: zoomFactor, moving: movingFactor }).to('main.js');
    }
});