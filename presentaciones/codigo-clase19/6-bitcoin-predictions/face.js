import Protobject from './js/protobject.js';
import FaceSensor from './js/faceSensor.js';

// Inicia el sensor de cara para generar eventos cada 20 ms
FaceSensor.start(20); 
// Habilita el modo de inversión para que la vista sea más natural
FaceSensor.flip(true); 
// Muestra una vista previa del sensor de cara en la posición y tamaño especificados
FaceSensor.showPreview({ top: 30, left: 0, width: 400, height: 320 });

// Escucha los datos del sensor de cara
FaceSensor.onData((data) => {
    // Verifica si se recibieron las formas de mezcla de la cara y si hay al menos una forma
    if (data.faceBlendshapes && data.faceBlendshapes[0]) {
        // Evaluar la expresión facial basada en los puntajes de las categorías de expresiones
        if (data.faceBlendshapes[0].categories[45].score > 0.6) { // Indica una expresión optimista
            Protobject.send("Optimistic").to('main.js');
        } else if (data.faceBlendshapes[0].categories[1].score > 0.3) { // Indica una expresión pesimista
            Protobject.send("Pessimistic").to('main.js');
        } else {
            Protobject.send("Neutral").to('main.js'); // Si no se detectan expresiones fuertes, es neutral
        }
    }
});