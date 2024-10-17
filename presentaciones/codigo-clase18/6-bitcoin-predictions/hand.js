import Protobject from './js/protobject.js';
import HandSensor from './js/handSensor.js';

// Inicia el sensor de mano para generar eventos cada 20 ms
HandSensor.start(20); 
// Habilita el modo de inversión para que la vista sea más natural
HandSensor.flip(true); 
// Muestra una vista previa del sensor de mano en la posición y tamaño especificados
HandSensor.showPreview({ top: 30, left: 0, width: 400, height: 320 });

// Escucha los datos del sensor de mano
HandSensor.onData((data) => {
    // Verifica si se recibieron gestos y si hay al menos un gesto
    if (data.gestures && data.gestures[0]) {
        // Evaluar el gesto basado en el nombre de la categoría
        const gesture = data.gestures[0][0].categoryName; // Accede al nombre de la categoría del primer gesto
        
        // Envía la clasificación de la expresión en función del gesto detectado
        if (gesture === "Thumb_Up") { // Indica un gesto optimista
            Protobject.send("Optimistic").to('main.js');
        } else if (gesture === "Thumb_Down") { // Indica un gesto pesimista
            Protobject.send("Pessimistic").to('main.js');
        } else {
            Protobject.send("Neutral").to('main.js'); // Si no se detecta un gesto relevante, es neutral
        }
    }
});
