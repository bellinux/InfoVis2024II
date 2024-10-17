import FaceSensor from './js/faceSensor.js';  // Importa el módulo FaceSensor para detectar rostros.
import Protobject from './js/protobject.js';  // Importa Protobject para la comunicación entre scripts.

// Inicia la detección de rostros con un intervalo de 100 ms
FaceSensor.start(100);

// Muestra una vista previa de la detección de rostros en la pantalla con las siguientes dimensiones y posición:
FaceSensor.showPreview({ 
    top: 50,  // Distancia desde la parte superior de la pantalla en píxeles.
    left: 50,  // Distancia desde la parte izquierda de la pantalla en píxeles.
    width: 640,  // Ancho de la vista previa en píxeles.
    height: 480  // Altura de la vista previa en píxeles.
});

let oldFaceNumber = 0;  // Inicializa una variable para almacenar el número anterior de rostros detectados.

// Escucha los datos de FaceSensor:
FaceSensor.onData((data) => {
    // Obtiene el número de rostros detectados basado en la longitud de los puntos faciales (landmarks).
    let faceNumber = data.faceLandmarks.length;
    console.log("Face number: ", faceNumber);  // Muestra en la consola el número de rostros detectados.
  
    // Solo si el número de rostros ha cambiado desde la última detección:
    if (faceNumber != oldFaceNumber) {
        // Envía el nuevo número de rostros detectados al archivo 'main.js' a través de Protobject.
        Protobject.send(faceNumber).to('main.js');
        
        // Actualiza la variable para almacenar el nuevo número de rostros.
        oldFaceNumber = faceNumber;
    }
});
