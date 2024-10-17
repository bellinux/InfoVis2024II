import Inclination from './js/inclination.js';
import Protobject from './js/protobject.js';

// Inicia el sensor de inclinación para generar eventos cada 300 ms
Inclination.start(300); 

// Escucha los datos del sensor de inclinación
Inclination.onData((data) => {
    // Muestra las lecturas de inclinación en la consola
    // console.log("X: " + data.x + "; Y: " + data.y + "; Z: " + data.z);

    // Clasifica la inclinación en función del eje Z
    if (data.z > 5) { // Indica inclinación optimista (cara optimista hacia arriba)
        Protobject.send("Optimistic").to('main.js');
    } else if (data.z < -5) { // Indica inclinación pesimista (cara pesimista hacia arriba)
        Protobject.send("Pessimistic").to('main.js');
    } else { // Indica inclinación neutral (posición vertical)
        Protobject.send("Neutral").to('main.js');
    }
});