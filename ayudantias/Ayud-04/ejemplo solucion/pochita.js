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
    rectangulo.setAttribute("x", x);
    rectangulo.setAttribute("y", y);
    rectangulo.setAttribute("width", ancho);
    rectangulo.setAttribute("height", alto);
    rectangulo.setAttribute("class", clase);
    svgElement.appendChild(rectangulo);
    return rectangulo; 
}

function crearEllipse(svgElement, x, y, rx, ry, clase){
    let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ellipse.setAttribute("cx", x);
    ellipse.setAttribute("cy", y);
    ellipse.setAttribute("rx", rx);
    ellipse.setAttribute("ry", ry);
    ellipse.setAttribute("class", clase);
    svgElement.appendChild(ellipse);
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
    crearRectangulo(SVG, 150, 300, 300, 400, "pelaje-pochita");

    // SIERRA
    // manilla
    crearCirculo(SVG, 410, 225, 30, "manilla");
    crearRectangulo(SVG, 380, 130, 60, 100, "manilla");
    crearRectangulo(SVG, 220, 100, 220, 40, "manilla");
    // dientes sierra
    crearRectangulo(SVG, 230, 115, 25, 25, "dientes-sierra");
    crearRectangulo(SVG, 175, 60, 25, 25, "dientes-sierra");
    crearRectangulo(SVG, 75, 55, 25, 25, "dientes-sierra");
    crearRectangulo(SVG, 90, 140, 25, 25, "dientes-sierra");
    crearRectangulo(SVG, 140, 190, 25, 25, "dientes-sierra");

    // cuerpo sierra
    crearCirculo(SVG, 135, 100, 60, "cuerpo-sierra");
    let sierra = crearRectangulo(SVG, 100, 150, 120, 150, "cuerpo-sierra");
    rotarElemento(sierra, -45, 100, 150);
    crearCirculo(SVG, 137, 102, 55, "punta-sierra");

    // ellipse encima de sierra
    crearEllipse(SVG, 285, 225, 90, 75, "pelaje-pochita");

    // BOCA
    crearEllipse(SVG, 225, 350, 40, 80, "boca-pochita");
    // dientes
    let colmilloUno = crearRectangulo(SVG, 175, 345, 20, 20, "colmillos-pochita");
    rotarElemento(colmilloUno, -45, 175, 345);
    let colmilloDos = crearRectangulo(SVG, 235, 345, 20, 20, "colmillos-pochita");
    rotarElemento(colmilloDos, -45, 235, 345);

    // labios
    crearCirculo(SVG, 185, 300, 50, "sombra-boca-pochita");
    crearCirculo(SVG, 185, 295, 50, "pelaje-pochita");
    crearCirculo(SVG, 250, 300, 50, "sombra-boca-pochita");
    crearCirculo(SVG, 250, 295, 50, "pelaje-pochita");

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
    let scale = 1; // Por defecto es de tamaño 100% o 1
    
    document.getElementById('increase-size').addEventListener('click', function() {
        if (scale < 0.97) scale += 0.03;;
        SVG.style.transform = `scale(${scale})`;
    });

    document.getElementById('decrease-size').addEventListener('click', function() {
        if (scale > 0.47) scale -= 0.03;
        SVG.style.transform = `scale(${scale})`;
    });
}

function crearEventos(SVG){
    eventoDarkMode();

    eventoResizePochita(SVG);

    eventoAnimacionOJO(SVG);
}

function pochita(){
    let SVG = document.getElementById("pochita");
    SVG.setAttribute("width", "500");
    SVG.setAttribute("height", "500");

    crearPochita(SVG);

    crearEventos(SVG);
}

pochita()