//Implementar una función que reciba dos enteros inicio y fin, y devuelva una lista de pares de números primos gemelos dentro del rango.

//Funcion para verificar si el numero es primo
function numerosPrimos(n){
    //CORRECIÓN* se inicializa el valor en 2 ya que los numeros menores a 2 no son primos
    for (let i = 2; i <= Math.sqrt(n); i++) {
        //Si dividiendo el número da exacto entonces no es primo
        if (n % i === 0){
            return false;
        }
    }

    return true;
}

//Funcion para encontrar los primos gemelos
function primosGemelos(inicio, numMax){
    const resultado = [];
    //Verificamos que el inicio siempre sea en 2
    const numMin = Math.max(inicio, 2);

    //Establecemos el numero máximo - 2 para que no sobrepase el límite
    for (let j = numMin; j <= numMax - 2; j++){
        //Condición para encontrar los gemelos
        if (numerosPrimos(j) && numerosPrimos(j + 2)){
            resultado.push([j, j + 2]);
        }
    }

    return resultado.length > 0 ? resultado : 0;
}

//Pruebas
console.log(primosGemelos(0, 10));
console.log(primosGemelos(100, 150));
console.log(primosGemelos(700, 800)); 