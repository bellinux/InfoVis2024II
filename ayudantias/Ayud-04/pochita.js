function crearCirculo(svgElement, x, y, r, clase){
    let circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circulo.setAttribute("cx", x);
    circulo.setAttribute("cy", y);
    circulo.setAttribute("r", r);
    circulo.setAttribute("class", clase);
    svgElement.appendChild(circulo);
    return circulo;
}

function crearRectangulo(svgElement, x, y, ancho, alto, clase){
    let rectangulo = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    
    // TODO: COMPLETAR 
    
    return rectangulo; 
}

function crearEllipse(svgElement, x, y, rx, ry, clase){
    let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    
    // TODO: COMPLETAR 

    return ellipse;
}

function rotarElemento(element, grado, x, y) {
    // Construimos la cadena de transformación
    let transformValue = "rotate(" + grado + "," + x + "," + y + ")";
    // Establecemos el atributo 'transform' con la nueva transformación
    element.setAttribute("transform", transformValue);
}

function crearPochita(SVG){
    // CUERPO
    crearCirculo(SVG, 300, 300, 150, "pelaje-pochita");
    
    // TODO: CREAR MAS ELEMENTOS PARA DIBUJAR A POCHITA 

    // OJOS
    crearCirculo(SVG, 325, 255, 45, "ojos-pochita");
    crearCirculo(SVG, 320, 250, 40, "pupila-pochita");
}

function eventoDarkMode(){    
    document.getElementById('dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});}

function eventoAnimacionOJO(SVG) {
    // Seleccionar el elementos
    let pupila = SVG.querySelector('.pupila-pochita');
    let ojo = SVG.querySelector('.ojos-pochita');

    // Guardar la posición original de la pupila
    const centroPupilaX = parseFloat(pupila.getAttribute('cx'));
    const centroPupilaY = parseFloat(pupila.getAttribute('cy'));
    const radioPupila = parseFloat(pupila.getAttribute('r'));

    // Guardar atributos del Ojo 
    const centroOjoX = parseFloat(ojo.getAttribute('cx'));
    const centroOjoY = parseFloat(ojo.getAttribute('cy'));
    const radioOjo = parseFloat(ojo.getAttribute('r')); 

    SVG.addEventListener('mousemove', function(event) {
        // coordenadas donde esta el cursor
        let rect = SVG.getBoundingClientRect();
        // considerar que el svg tiene una posicion
        let x = event.clientX - rect.left; 
        let y = event.clientY - rect.top ;

        // calculo nueva posicion pupila
        let dx = x - centroOjoX;
        let dy = y - centroOjoY;
        let distancia = Math.sqrt(dx * dx + dy * dy);
        
        // Calcular factor de movimiento asegurando que la pupila no salga del ojo
        let distanciaMaxPupila = radioOjo - radioPupila;
        let factorOjo = Math.min(distanciaMaxPupila, distancia) / distancia;

        // Actualizar posición de la pupila con el factor ajustado
        pupila.setAttribute("cx", centroOjoX + dx * factorOjo);
        pupila.setAttribute("cy", centroOjoY + dy * factorOjo);   
    });

    SVG.addEventListener('mouseout', function() {
        // resetear posicion inicial del ojo
        pupila.setAttribute("cx", centroPupilaX);
        pupila.setAttribute("cy", centroPupilaY);
    });
}

function eventoResizePochita(SVG){
    /* TODO: descomentar este código y editar ids 
    cuando definan los ids de sus botones 
    para agrandar y achicar pochita
    */

    /* 
    let scale = 1; 
    
    document.getElementById('ID-AGRANDAR').addEventListener('click', function() {
        if (scale < 0.97) scale += 0.03;;
        SVG.style.transform = `scale(${scale})`;
    });

    document.getElementById('ID-ACHICAR').addEventListener('click', function() {
        if (scale > 0.47) scale -= 0.03;
        SVG.style.transform = `scale(${scale})`;
    });
    */
}

function crearEventos(SVG){
    eventoDarkMode();

    eventoResizePochita(SVG);

    //eventoAnimacionOJO(SVG);
}

function pochita(){
    let SVG = document.getElementById("pochita");
    SVG.setAttribute("width", "500");
    SVG.setAttribute("height", "500");

    crearPochita(SVG);

    crearEventos(SVG);
}

pochita()