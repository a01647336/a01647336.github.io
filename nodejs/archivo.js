console.log("Hola mundo");

let p = new Promise(function(resuelve, rechazo){
    let test = 10;
    if(test == 10){
        resuelve("La promesa se ha cumplido");
    }else{
        rechazo("La promesa no se ha cumplido");
    }
});

console.log(p);

p.then(function(mensaje){
    console.log("Resuelto:",mensaje);
}).catch(function(error){
    console.log("Rechazado:",error);
});