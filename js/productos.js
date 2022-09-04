// inicializo carrito como una lista vacia
let carrito = [];

const leerCarritoDeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem('miCarrito');
    // si encuentro el carrito guardado lo trato de convertir en un array de nuevo
    if (carritoGuardado) carrito = JSON.parse(carritoGuardado);
};

const guardarCarritoEnLocalStorage = () => {
    const nuevoCarrito = JSON.stringify(carrito);
    localStorage.setItem('miCarrito', nuevoCarrito);
};

// inicializo productos como null, al realizar el fetch debería convertirse en el listado de productos
let productos = null;

// Esta funcion quita un producto del carrito
const quitarItemDeCarrito = (codigo) => {
    // busco y elimino uno de los productos que tiene ese codigo
    const indiceProducto = carrito.findIndex((producto) => {
        return producto.codigo === codigo;
    });
    carrito.splice(indiceProducto, 1);
    calcularYMostrarTotalCarrito();
    imprimirSeccionCarrito();
    guardarCarritoEnLocalStorage();
};

const quitarItemsDeCarrito = (codigo) => {
    // filtro productos que no son el que quiero eliminar
    carrito = carrito.filter((producto) => { 
        return producto.codigo !== codigo;
    })
    calcularYMostrarTotalCarrito();
    imprimirSeccionCarrito();
    guardarCarritoEnLocalStorage();
};

// Esta funcion agrega al carrito el porducto por su codigo
const agregarItemACarrito = (producto) => {
    carrito.push(producto);
    calcularYMostrarTotalCarrito();
    imprimirSeccionCarrito();
    guardarCarritoEnLocalStorage();
};

// En cada ciclo debería recibir un objeto con toda la información necesaria para imprimir la tarjeta
// {
//     "destacado": false,
//     "altImagen": "redondito flores rojas",
//     "imagen": "./assets/redondito-flores-rojas.jpeg",
//     "nombre": "Modelo huevito",
//     "descripcion": "Con diseño de flores rojas. Producto de algarrobo pintado a mano. Incluye bombilla. Consultar precio..",
//     "codigo": "modelo_huevito",
//     "precio": 2929,
//     "cantidad": 2
// },

const imprimirProductoFormatoCarrito = (infoProducto) => {
    const nombreProducto = document.createElement('h5');
    nombreProducto.className = 'card-title';
    nombreProducto.innerText = infoProducto.nombre;

    const cantidadProducto = document.createElement('p');
    cantidadProducto.className = 'card-text';
    cantidadProducto.innerText = `Cantidad: ${infoProducto.cantidad}`;

    const precioUnitario = document.createElement('p');
    precioUnitario.className = 'card-text';
    precioUnitario.innerText = `Precio Unitario: $${infoProducto.precio}`;

    const precioTotal = document.createElement('p');
    precioTotal.className = 'card-text';
    precioTotal.innerText = `Precio Total: $${infoProducto.cantidad * infoProducto.precio}`;

    const botonQuitarUno = document.createElement('button');
    botonQuitarUno.innerText = 'Quitar uno';
    botonQuitarUno.addEventListener('click', () => {
        quitarItemDeCarrito(infoProducto.codigo);
    });

    const botonQuitarTodos = document.createElement('button');
    botonQuitarTodos.innerText = 'Quitar todos';
    botonQuitarTodos.addEventListener('click', () => {
        quitarItemsDeCarrito(infoProducto.codigo);
    });

    const renglonAccionesQuitar =  document.createElement('div');
    renglonAccionesQuitar.classList = 'renglon-acciones-quitar';
    renglonAccionesQuitar.appendChild(botonQuitarUno);
    renglonAccionesQuitar.appendChild(botonQuitarTodos);

    const imagenProducto = document.createElement('img');
    imagenProducto.src = infoProducto.imagen;
    imagenProducto.className = 'img-fluid rounded-start imagen-card-carrito';

    const colImagenProducto = document.createElement('div');
    colImagenProducto.className = 'col-md-4';
    colImagenProducto.appendChild(imagenProducto);
    
    const detalleProducto = document.createElement('div');
    detalleProducto.className = 'col-md-8 detalle-card-carrito';
    detalleProducto.appendChild(nombreProducto);
    detalleProducto.appendChild(cantidadProducto);
    detalleProducto.appendChild(precioUnitario);
    detalleProducto.appendChild(precioTotal);
    detalleProducto.appendChild(renglonAccionesQuitar);

    const rowProducto = document.createElement('div');
    rowProducto.className = 'row g-0';
    rowProducto.appendChild(colImagenProducto);
    rowProducto.appendChild(detalleProducto);

    const cardProducto = document.createElement('div');
    cardProducto.className = 'card mb-3';
    cardProducto.appendChild(rowProducto);
    return cardProducto;
};


const calcularYMostrarTotalCarrito = () => {
    const montoFinal = carrito.reduce((montoAcumulado, productoCarrito) => {
        return montoAcumulado + productoCarrito.precio;
    }, 0);
    const labelMontoHeader = document.getElementById('labelMontoHeader');
    const labelMonto = document.getElementById('labelMonto');
    labelMontoHeader.innerText = `$${montoFinal}`;
    labelMonto.innerText = `$${montoFinal}`;
};

const imprimirSeccionCarrito = () => {
    const listaDeControl = [];
    const seccion = document.getElementById('seccionItemsCarrito');
    const carritoUnificadoVacio = [];
    const productosConCantidad = carrito.reduce((carritoUnificado, productoActual) => {
        // verifico si ya agregue el codigo a la lista
        const existeEnCarrito = listaDeControl.indexOf(productoActual.codigo) >= 0;
        // hago una copia del producto para poder agregarle la cantidad
        const copiaProducto = { ...productoActual };
        if (!existeEnCarrito) {
            // agrego a mi lista de control
            listaDeControl.push(productoActual.codigo);
            // le digo que la cantidad inicial es 1
            copiaProducto.cantidad = 1;
            carritoUnificado.push(copiaProducto);
        } else {
            const productoConCantidad = carritoUnificado.find((producto) => {
                return producto.codigo === productoActual.codigo;
            });
            productoConCantidad.cantidad += 1
        }
        return carritoUnificado;
    }, carritoUnificadoVacio);

    // borro items actuales
    const itemsCarritoActual = document.getElementById('tarjetasProductoCarrito');
    if (itemsCarritoActual) itemsCarritoActual.remove();

    // creo los items nuevamente
    const tarjetasProductoCarrito = document.createElement('div');
    tarjetasProductoCarrito.className = 'items';
    tarjetasProductoCarrito.id = 'tarjetasProductoCarrito';
    productosConCantidad.forEach((itemCarrito) => {
        const tarjetaProducto = imprimirProductoFormatoCarrito(itemCarrito);
        tarjetasProductoCarrito.appendChild(tarjetaProducto);
    });

    seccion.appendChild(tarjetasProductoCarrito);
};

const botonModalConfirmarCompra = document.getElementById('botonModalConfirmarCompra');
botonModalConfirmarCompra.addEventListener('click', () => {
    const botonCarritoCerrar = document.getElementById('botonCarritoCerrar');
    const botonModalCerrar = document.getElementById('botonModalCerrar');
    console.log('Gracias por tu compra');
    carrito = [];
    imprimirSeccionCarrito();
    calcularYMostrarTotalCarrito();
    botonModalCerrar.click();
    botonCarritoCerrar.click();
});

// funciones para imprimir el producto en formato card
const imprimirFotoFormatoCard = (imagen, altImagen) => {
    const imagenProducto = document.createElement("img");
    imagenProducto.src = imagen;
    imagenProducto.classList.add("card-img-top");
    imagenProducto.alt = altImagen;
    return imagenProducto;
};

// Creo en un div tituloProducto con una clase que se llama nombreProducto. 
const imprimirNombreFormatoCard = (nombre) => {
    const tituloProducto = document.createElement('h5');
    tituloProducto.classList.add('card-title');
    tituloProducto.innerText = nombre;
    return tituloProducto;
};

const imprimirDescripcionFormatoCard = (descripcion) => {
    const descripcionProducto = document.createElement('p');
    descripcionProducto.className = 'card-text altura';
    descripcionProducto.innerText = descripcion;
    return descripcionProducto;
};

const imprimirIconoFormatoCard = () => {
    const icono = document.createElement("i");
    icono.className = 'bi bi-bag-plus-fill';
    return icono;
};

const imprimirProductoFormatoCard = (infoProducto) => {
    const icono = imprimirIconoFormatoCard();
    
    const botonComprar = document.createElement('button');
    botonComprar.className = "btn btn-primary boton-compra";
    botonComprar.appendChild(icono);
    botonComprar.addEventListener('click', () => {
        agregarItemACarrito(infoProducto);
    });

    const contenedorBotonComprar = document.createElement('div');
    contenedorBotonComprar.className = 'd-grid gap-2 d-md-flex justify-content-md-end';
    contenedorBotonComprar.appendChild(botonComprar);

    const precioProducto = document.createElement('p');
    precioProducto.innerText = `$${infoProducto.precio}`;
    precioProducto.classList.add('precio');

    const renglonInferior =document.createElement("div");
    renglonInferior.classList.add("renglonInferior"); 
    renglonInferior.appendChild(precioProducto);
    renglonInferior.appendChild(botonComprar); 

    const nombre = imprimirNombreFormatoCard(infoProducto.nombre); 
    const descripcion = imprimirDescripcionFormatoCard(infoProducto.descripcion); 

    const cuerpoTarjeta = document.createElement("div"); 
    cuerpoTarjeta.classList.add("card-body"); 
    cuerpoTarjeta.appendChild(nombre); 
    cuerpoTarjeta.appendChild(descripcion);
    cuerpoTarjeta.appendChild(renglonInferior);

    const imagen = imprimirFotoFormatoCard(infoProducto.imagen, infoProducto.altImagen); 

    const card = document.createElement("div"); 
    card.className = "card limitado-destacadas tarjeta";
    card.appendChild(imagen); 
    card.appendChild(cuerpoTarjeta); 

    const cardProducto = document.createElement('div');
    cardProducto.classList.add('col');
    cardProducto.appendChild(card); 
    return cardProducto;
};

const imprimirContenedorTarjetas = (mostrarSoloDestacados) => {
    // si estoy en la home solo muestro destacados
    const listadoProductos = mostrarSoloDestacados ? (
        productos.filter((producto) => producto.destacado)
    ) : (productos);

    if (mostrarSoloDestacados) {
        const contenedorTarjetas = document.createElement("div");
        contenedorTarjetas.className = "row row-cols-1 row-cols-md-3 g-4 mx-auto";
        listadoProductos.forEach((infoProducto) => {
            const cardProducto = imprimirProductoFormatoCard(infoProducto);
            contenedorTarjetas.appendChild(cardProducto);
        });
        const seccionProductos = document.querySelector("#seccionProductos"); 
        seccionProductos.appendChild(contenedorTarjetas);
    } else {
        const listadoMates = listadoProductos.filter((producto) => !producto.combo);
        const listadoCombos = listadoProductos.filter((producto) => producto.combo);

        const contenedorMates = document.createElement("div");
        contenedorMates.className = "row row-cols-1 row-cols-md-3 g-4 mx-auto";
        listadoMates.forEach((infoProducto) => {
            const cardProducto = imprimirProductoFormatoCard(infoProducto);
            contenedorMates.appendChild(cardProducto);
        });

        const contenedorCombos = document.createElement("div");
        contenedorCombos.className = "row row-cols-1 row-cols-md-3 g-4 mx-auto";
        console.log({ listadoCombos });
        listadoCombos.forEach((infoProducto) => {
            const cardProducto = imprimirProductoFormatoCard(infoProducto);
            contenedorCombos.appendChild(cardProducto);
        });

        const seccionMates = document.querySelector("#seccionMates"); 
        seccionMates.appendChild(contenedorMates);
        const seccionCombos = document.querySelector("#seccionCombos"); 
        seccionCombos.appendChild(contenedorCombos);
    }

};

const tituloPaginaInicio = 'Amapolartes-Inicio-del-sitio';
const tituloPaginaProductos = 'Amapolartes-Productos-y-Combos';

fetch("js/productos.json")
    .then((response) => response.json())
    .then((result) => {
        const nombrePagina = document.title;
        const mostrarSoloDestacados = nombrePagina === tituloPaginaInicio;

        productos = result;

        leerCarritoDeLocalStorage();
        if (nombrePagina === tituloPaginaInicio || nombrePagina === tituloPaginaProductos) {
            imprimirContenedorTarjetas(mostrarSoloDestacados);
        }
        imprimirSeccionCarrito();
        calcularYMostrarTotalCarrito();
    })
    .catch(error => console.log(error));
