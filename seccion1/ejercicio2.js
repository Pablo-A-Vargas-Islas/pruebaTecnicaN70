//Implementar una función que reciba un arreglo de números y retorne un nuevo arreglo conteniendo únicamente los números pares únicos (sin repetidos). 


function numerosPares(arreglo){
    //Recorremos el arreglo y separamos los numeros pares
    const pares = arreglo.filter((num) => num % 2 === 0);
    //Utilizamos Set para filtrar valores duplicados
    return [...new Set(pares)];
}

//Pruebas
console.log(numerosPares([2, 7, 9, 12, 33, 15, 22, 12, 4]));
console.log(numerosPares([1, 2, 3, 4, 5, 6, 7, 2, 4, 6, 8, 6]));