
// alert("Con la compra de 5 productos o más, se te aplica un 10% de descuento");

// let precioIngresado = parseInt(prompt("Cual es el precio del producto que deseas llevar?"));
// let cantidadIngresada = parseInt(prompt("Cuantas unidades querés comprar?"));

// function precioPorProducto(precio, cantidad) {
//     let resultado = (precio * cantidad);
//     // si la cantidad es mayor a 5, le descontamos el 10%
//     if (cantidad > 5) resultado = resultado * 0.9;
//     return resultado;
// }

// let monto = precioPorProducto(precioIngresado, cantidadIngresada);

// function sorteo() {
//     if (monto > 4500) {
//         alert("¡Felicidades! Por superar los 4500 estas participando por un increible sorteo");
//     } else {
//         alert("¡Gracias por la compra!");
//     }
// }
    
// sorteo();

//EJERCICIO ARRAY: LISTA DE PRODUCTOS DISPONIBLES

class Producto {
    constructor(nombreProducto, precio) {
      this.nombreProducto = nombreProducto;
      this.precio = precio;
    }
  }

  //Para la practicidaad del ejercicio voy a nombrar algunos de los productos
let mateRedondo = new Producto("mate redondo", 1500);
let mateHuevito = new Producto("mate huevito", 1500);
let mateHexagonal = new Producto("mate hexagonal", 2000);
let cuenco10cm = new Producto("cuenco de 10cm", 1000);
let tablaEucalipto = new Producto("tabla eucalipto", 3000);
let tablaAlgarrobo = new Producto("tabla algarrobo", 2500);
let comboCompleto = new Producto("combo completo", 5500);
  
  let listaProductosDisponibles = [
    mateRedondo,
    mateHuevito,
    mateHexagonal, 
    cuenco10cm, 
    tablaEucalipto,
    tablaAlgarrobo,
    comboCompleto,
  ];
  
  for(let i = 0; i < listaProductosDisponibles.length; i++) {
    console.log(listaProductosDisponibles[i]); 
  }
  

  //FILTRO DE BUSQUEDA PARA EL USUARIO: 

const productoIngresadoPorElUsuario = prompt("ingrese el nombre del producto que desea buscar");
function buscarProducto() {
  const productosEncontrados = listaProductosDisponibles.filter((producto) => {
      const coincide = producto.nombreProducto.includes(productoIngresadoPorElUsuario);
      return coincide;
    }
  )
  if(productosEncontrados.length === 0) {
    console.log("No se encontraron productos"); 
  } else {
    console.log(`los productos encontrados son: `);
    productosEncontrados.forEach((producto) => {
        console.log(`${producto.nombreProducto} y vale ${producto.precio}`);
    });
  }
}

buscarProducto();

//SUPONIENDO QUE EL CLIENTE HAYA ELEGIDO ESTOS PRODUCTOS:
 let listaProductosDelCliente = [
  mateHuevito,
  mateHuevito,
  mateHexagonal, 
  cuenco10cm,
 ]

 //SE HACE LA SUMA TOTAL
const totalCarrito = listaProductosDelCliente.reduce((acumulador, producto) => acumulador + producto.precio, 0);
alert(`Gracias por tu compra, el monto a abonar es ${totalCarrito}`);
console.log(`el total a pagar es ${totalCarrito}`);
