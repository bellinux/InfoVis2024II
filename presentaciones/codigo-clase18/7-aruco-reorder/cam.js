import Protobject from './js/protobject.js';
import Aruco from './js/aruco.js';

// Inicializa el sistema de detección de marcadores Aruco
Aruco.start(30, 1); // La cámara genera eventos cada 30 ms y utiliza la cámara con id 1
Aruco.showPreview({ top: 0, left: 0, width: 1280 / 3, height: 720 / 3 }); // Muestra la vista previa de la cámara

// Escucha los datos de los marcadores Aruco
Aruco.onData((data) => {
  //console.log(data); // Muestra los datos en la consola para depuración

  // Identificadores de marcadores que se desea verificar
  const markerIds = [200, 1, 100]; 
  let markers = []; // Array para almacenar los marcadores detectados

  // Recorre los identificadores de marcadores y verifica su presencia en los datos
  for (const id of markerIds) {
    if (data[id]) {
      // Si el marcador está presente, guarda su id y posición en el eje Y
      markers.push({ id: id, y: data[id].position.y });
    }
  }

  // Ordena los marcadores detectados en función de su posición en el eje Y (de arriba hacia abajo)
  markers.sort((a, b) => b.y - a.y);

  // Crea un nuevo array que contiene solo los IDs de los marcadores en el orden determinado
  let orderPosition = markers.map(marker => marker.id);

  // Envía los IDs ordenados al sistema principal
  Protobject.send(orderPosition).to('main.js');
});