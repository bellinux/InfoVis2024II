import Acceleration from './js/acceleration.js';
import Protobject from './js/protobject.js';

// Inicia la captura de datos de aceleración
Acceleration.start(0);

//https://github.com/wouterbulten/kalmanjs
var KalmanFilter=function(){"use strict";function s(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(){function v(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},i=t.R,e=void 0===i?1:i,s=t.Q,n=void 0===s?1:s,r=t.A,h=void 0===r?1:r,a=t.B,o=void 0===a?0:a,u=t.C,c=void 0===u?1:u;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,v),this.R=e,this.Q=n,this.A=h,this.C=c,this.B=o,this.cov=NaN,this.x=NaN}var t,i,e;return t=v,(i=[{key:"filter",value:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;if(isNaN(this.x))this.x=1/this.C*t,this.cov=1/this.C*this.Q*(1/this.C);else{var e=this.predict(i),s=this.uncertainty(),n=s*this.C*(1/(this.C*s*this.C+this.Q));this.x=e+n*(t-this.C*e),this.cov=s-n*this.C*s}return this.x}},{key:"predict",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;return this.A*this.x+this.B*t}},{key:"uncertainty",value:function(){return this.A*this.cov*this.A+this.R}},{key:"lastMeasurement",value:function(){return this.x}},{key:"setMeasurementNoise",value:function(t){this.Q=t}},{key:"setProcessNoise",value:function(t){this.R=t}}])&&s(t.prototype,i),e&&s(t,e),v}()}();

// Crea una instancia del filtro de Kalman con parámetros ajustados
// Este filtro ayuda a suavizar los valores del acelerómetro, reduciendo el ruido y haciendo que los datos sean más utilizables
var kf = new KalmanFilter({ R: 0.1, Q: 100 });

Acceleration.onData((data) => {
    // Calcula el total de la aceleración en los tres ejes
    let total = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);

    // Suaviza los valores del acelerómetro usando el filtro de Kalman
    let totalFiltered = kf.filter(total);

    // Intenta reproducir los valores de magnitud de un terremoto considerando los movimientos
    // Los parámetros fueron establecidos con pruebas y errores
    let magnitude = Math.log(1 + (totalFiltered * 6)) * 2;

    // Enviar la magnitud calculada a otro módulo
    Protobject.send(magnitude).to('main.js');
});