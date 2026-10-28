//Implementar una función que reciba un arreglo de números y retorne un nuevo arreglo conteniendo únicamente los números pares únicos (sin repetidos).

function invertirPalabras(cadena) {
  // Dividimos la cadena usando el método .split
  const palabras = cadena.split(" ");

  //Guardaremos aquí las palabras ya invertidas
  const result = []

  //For para recorrer cada palabra
  for (let i=0; i<palabras.length; i++) {
    const palabraInicial = palabras[i];
    let palabraInvertida = "";

    //Recorremos la palabra al revés y la guardamos en el arreglo
    for (let j=palabraInicial.length - 1; j>=0; j--) {
        palabraInvertida += palabraInicial[j];
    }

    result.push(palabraInvertida);
  }

  return result.join(" ");
}

//Pruebas
console.log(invertirPalabras("Hola soy una cadena"));
console.log(invertirPalabras("Programando ando"));
console.log(invertirPalabras("Concatenación"));