import HandSensor from './js/handSensor.js?ffha';
import Protobject from './js/protobject.js';

// Iniciar el HandSensor
HandSensor.start(100, 1);

// Mostrar la vista previa del video en la posición y tamaño especificados
HandSensor.showPreview({
    top: 0,
    left: 0,
    width: 1280/2,
    height: 720/2
});

// Hacer flip horizontal de la imagen
HandSensor.flip(false);

// El punto 8 corresponde al dedo índice
// Enviar la posición del índice a 'main.js'
HandSensor.onData((data) => {
    if (data.landmarks && data.landmarks[0] && data.landmarks[0][8]) {
        Protobject.send(data.landmarks[0][8]).to('main.js');
    }
});