//Implementar una función que reciba un arreglo de enteros y un número objetivo, y determine si existe alguna combinación de elementos (sin repetir valores) cuya suma sea igual al número objetivo.

function existeCombinacion(numeros, objetivo) {
    let sumas = new Set([0]);

    for (let numero of numeros) {
        let nuevasSumas = new Set();

        for (let suma of sumas) {
            nuevasSumas.add(suma + numero);
        }

        for (let suma of nuevasSumas) {
            sumas.add(suma);
        }

        if (sumas.has(objetivo)) {
            return true;
        }
    }

    return sumas.has(objetivo);
}

//Prueba
console.log(existeCombinacion([2, 5, 8, 44, 1, 7], 9));
console.log(existeCombinacion([55, 3, 8, 11, 45, 1], 12));
console.log(existeCombinacion([4, 8, 48, 44, 1], 11));
