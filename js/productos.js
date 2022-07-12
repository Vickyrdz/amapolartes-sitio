
alert("Con la compra de 5 productos o más, se te aplica un 10% de descuento");

let precioIngresado = parseInt(prompt("Cual es el precio del producto que deseas llevar?"));
let cantidadIngresada = parseInt(prompt("Cuantas unidades querés comprar?"));

function precioPorProducto(precio, cantidad) {
    let resultado = (precio * cantidad);
    // si la cantidad es mayor a 5, le descontamos el 10%
    if (cantidad > 5) resultado = resultado * 0.9;
    return resultado;
}

let monto = precioPorProducto(precioIngresado, cantidadIngresada);

function sorteo() {
    if (monto > 4500) {
        alert("¡Felicidades! Por superar los 4500 estas participando por un increible sorteo");
    } else {
        alert("¡Gracias por la compra!");
    }
}
    
sorteo();