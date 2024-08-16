let miVariable = 1;
miVariable = 5;
// console.log(miVariable)


// ERROR
// const miVariableConstante = 1;
// miVariableConstante = 4; 


// Strings
const nombre = "Wolverine";
const saludo1 = "¡Hola " + nombre + "!";
const saludo2 = `¡Hola ${nombre}!`;
// console.log(nombre)
// console.log(saludo1)
// console.log(saludo2)


// Arrays
let arreglo = ["hola", "ola", "olas"];
const variable = arreglo[0]; // "hola"
// console.log(variable)
arreglo.push("mar"); 
const largo = arreglo.length; // 4
// console.log(largo)
// console.log(arreglo)


// Objetos
let miObjeto = {
    titulo: "Deadpool & Wolverine",
    año: 2024,
};

const titulo = miObjeto["titulo"]; // "Deadpool & Wolverine"
const año = miObjeto.año; // 2024
// console.log(titulo)
// console.log(año)

miObjeto["genero"] = ["Comedia", "Accion"];
miObjeto.director = "Shawn Levi";
// console.log(miObjeto)


// Funciones
// function sumar9(numero) {
//     return numero + 9;
// }
// console.log(sumar9(6));
// console.log(sumar9(sumar9(6)))

   
// const sumar9 = function(numero) {
//     return numero + 9;
//    }
// console.log(sumar9(6));
// console.log(sumar9(sumar9(6)))


// const sumar9 = (numero) => numero + 9;
// console.log(sumar9(6));
// console.log(sumar9(sumar9(6)))