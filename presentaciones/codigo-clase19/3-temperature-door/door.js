import Orientation from './js/orientation.js'; // Importa el módulo de orientación
import Protobject from './js/protobject.js'; // Importa el módulo de comunicación
import SoundPlayer from './js/soundPlayer.js'; // Importa el reproductor de sonido

// Inicia la captura de datos de orientación cada 30 ms
Orientation.start(30);
const player = new SoundPlayer(); // Crea una instancia del reproductor de sonido
let previousAngle = null; // Variable para almacenar el ángulo anterior

// Escucha los datos de orientación
Orientation.onData(({ horizontalContinuous }) => {
  const currentAngle = parseInt(horizontalContinuous); // Convierte el ángulo a un número entero

  // Compara el ángulo actual con el anterior y verifica si está dentro de un rango específico
  if (currentAngle !== previousAngle && Math.abs(currentAngle) < 90) {
    Protobject.send(Math.abs(currentAngle)).to('graph.js'); // Envía el ángulo actual a 'graph.js'
    previousAngle = currentAngle; // Actualiza el ángulo anterior
    console.log(currentAngle); // Muestra el ángulo actual en la consola
  }

  // Reproduce un sonido si el ángulo actual excede un umbral
  if (Math.abs(currentAngle) > 4) {
    player.play('https://cdn.freesound.org/previews/145/145805_1218676-lq.mp3', true); // Reproduce el sonido
  } else {
    player.stop(); // Detiene la reproducción si el ángulo está por debajo del umbral
  }
});
