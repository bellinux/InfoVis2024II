
// EJEMPLO 1
const ejemplo1 = document.getElementById('ejemplo1');

// crea un boton y se agrega una clase para luego otorgar estilo
const boton = document.createElement('button');
boton.setAttribute('class', 'boton');
boton.textContent = 'Click me!';

// hasta ahora el boton no ha sido agregado al html
ejemplo1.appendChild(boton);

// se crea un párrafo y se agrega para hacer un contador de clicks
let cont_clicks = 0
let text_cont_clicks = document.createElement('p');
text_cont_clicks.setAttribute('id', 'contador');
ejemplo1.appendChild(text_cont_clicks);
text_cont_clicks.textContent = `clicks: ${cont_clicks}`;


boton.onclick = () => {
    // Se dispara cuando el usuario hace click en un elemento.
    cont_clicks++
    console.log(`click ${cont_clicks}`);
    text_cont_clicks.textContent = `clicks: ${cont_clicks}`;

}

boton.onmouseover = () => {
    // Se activa cuando el ratón entra en un elemento o cualquiera de sus hijos.
    boton.style.backgroundColor = '#FA6767';
    console.log('Mouse over');
}

boton.onmouseout = () => {
    // Se activa cuando el ratón sale de un elemento o cuando se mueve
    // a un elemento hijo dentro de ese elemento.
    boton.style.backgroundColor = '#C1EDF5';
    console.log('Mouse out');
}

// ejemplo1.onmouseover = () => {
//     ejemplo1.style.opacity = 1;
// }
// ejemplo1.onmouseout = () => {
//     ejemplo1.style.opacity = 0.3;
// }

// crear un círculo (con estilo en css)
const circulo = document.createElement('div');
circulo.setAttribute('id', 'circulo');
// Añadir el círculo al HTML
ejemplo1.appendChild(circulo);

circulo.onclick = () => {
    circulo.style.backgroundColor = 'yellow';
    // se reinicia el contador de clicks
    text_cont_clicks.textContent = `clicks: 0`;
    cont_clicks = 0;
    // cambiar el color de fondo a verde después de 2 segundos
    setTimeout(() => {
        circulo.style.backgroundColor = '#4CAF50';
    }, 2000);
}

// EJEMPLO 2
const ejemplo2 = document.getElementById('ejemplo2');


let p2 = document.createElement('p');
ejemplo2.appendChild(p2);
p2.textContent = 'Lista de nombres';

// crear un formulario
const form = document.createElement('form');
form.setAttribute('id', 'formulario');
ejemplo2.appendChild(form);

// Crear un campo de entrada para el nombre
const inputNombre = document.createElement('input');

// hay distintos tipos de input como:
inputNombre.setAttribute('type', 'text');
// inputNombre.setAttribute('type', 'password');
// inputNombre.setAttribute('type', 'date');
// inputNombre.setAttribute('type', 'checkbox');
// inputNombre.setAttribute('type', 'radio');
// inputNombre.setAttribute('type', 'file');
// inputNombre.setAttribute('type', 'number');
// inputNombre.setAttribute('type', 'range');
// inputNombre.setAttribute('type', 'color');
// inputNombre.setAttribute('type', 'submit');

inputNombre.setAttribute('name', 'nombre');
// esto es lo que se ve cuando no se ha escrito nada
inputNombre.setAttribute('placeholder', 'Nombre');
form.appendChild(inputNombre);

const inputColor = document.createElement('input');
inputColor.setAttribute('type', 'color');
inputColor.setAttribute('name', 'color');
form.appendChild(inputColor);

const botonEnviar = document.createElement('button');
botonEnviar.setAttribute('type', 'submit');
botonEnviar.textContent = 'Enviar';
form.appendChild(botonEnviar);

// Función para generar un color hexadecimal aleatorio
function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

// cada vez que se apreta el enter mientras el formulario esta activo
form.onsubmit = (e) => {
    console.log(e)
    // esto evita que la pagina se recargue automaticamente 
    e.preventDefault();
    // se obtiene el valor actual del inputNombre, todo lo que este escrito
    const nombre = inputNombre.value;
    console.log(nombre);

    // se crea un nuevo parrafo y se le asigna el nombre
    const p = document.createElement('p');
    p.textContent = nombre;
    // color = generarColorAleatorio();
    // se obtiene el valor del inputColor
    const color = inputColor.value;
    p.style.color = color;
    ejemplo2.appendChild(p);
    inputNombre.value = '';
}

const divisores = document.getElementsByClassName('divisor');
console.log(divisores);

// para una lista de elementos podemos iterar para asignar los eventos
for (let d = 0; d < divisores.length; d++) {
    divisores[d].onmouseover = () => {
        divisores[d].style.opacity = 1;
    }
}

for (let d = 0; d < divisores.length; d++) {
    divisores[d].onmouseout = () => {
        divisores[d].style.opacity = 0.3;
    }
}