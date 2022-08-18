// Array de los productos 
const productos = [
    {
        codigo: "mateHuevito",
        nombre: "Modelo Huevito",
        imagen: "assets/redondito-flores-rojas.jpeg",
        altImagen: "mate huevito", 
        descripcion: "Con diseño de flores rojas. Producto de algarrobo pintado a mano. Incluye bombilla.",
        precio : 1500,
    },
    {
        codigo: "CuatroPiezas",
        nombre: "Combo flores blancas",
        imagen: "assets/combo-flores-blancas.jpeg",
        altImagen: "combo blanco", 
        descripcion: "Combo 4 piezas: incluye azucarera de pino y mate (modelo redondo con bombilla), cuenco de 10cm y tabla de algarrobo.",
        precio : 4000,
     
    },
    {
        codigo: "TresPiezas",
        nombre: "Combo flores azules",
        imagen: "assets/combo-flores-azules.jpeg",
        altImagen: "combo azul",
        descripcion: "Combo 3 piezas: Incluye dos cuencos de 10 com de algarrobo y una tabla lisa de pino. Diseño pintado a mano. Consultar precios y/o pieza que podés sumarle.",
        precio : 3500,
    
    },
];

const imprimirFoto = (imagen, altImagen) => {
    const imagenProducto = document.createElement("img");
    imagenProducto.src = imagen;
    imagenProducto.classList.add("card-img-top");
    imagenProducto.alt = altImagen;
    return imagenProducto;
};

// Creo en un div tituloProducto con una clase que se llama nombreProducto. 
const imprimirNombre = (nombre) => {
    const tituloProducto = document.createElement('h5');
    tituloProducto.classList.add('card-title');
    tituloProducto.innerText = nombre;
    return tituloProducto;
};

const imprimirDescripcion = (descripcion) => {
    const descripcionProducto = document.createElement('p');
    descripcionProducto.className = 'card-text altura';
    descripcionProducto.innerText = descripcion;
    return descripcionProducto;
};

// Esta funcion agrega al carrito el porducto por su codigo
const agregarItemACarrito = (codigo) => {
    carrito.push(codigo);
    console.log(`agregue un item al carrito, es el que tiene codigo: ${codigo}`);
    console.log('mi carrito actual es: ');
    console.log({ carrito });
};

// Se cra un div con clase y se le agrega un boton y un precio 
const imprimirRenglonInferior = (precio, codigo) => {
    const cajita = document.createElement('div');
    cajita.classList.add('cajita');
    
    const etiquetaPrecio = document.createElement('p');
    etiquetaPrecio.classList.add('precio');
    etiquetaPrecio.innerText = precio;

    const botonComprar = document.createElement('button');
    botonComprar.innerText = 'comprar';
    botonComprar.addEventListener('click', () => {
        agregarItemACarrito(codigo);
    });
    // botonComprar.onclick = () => agregarItemACarrito(codigo);

    cajita.appendChild(etiquetaPrecio);
    cajita.appendChild(botonComprar);

    return cajita;
};

const imprimirIcono = () => {
    const icono = document.createElement("i");
    icono.className = 'bi bi-bag-plus-fill';
    return icono;
};

const imprimirProducto = (infoProducto) => {
    const icono = imprimirIcono();
    
    const botonComprar = document.createElement('button');
    botonComprar.className = "btn btn-primary boton-compra";
    botonComprar.appendChild(icono);

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

    const nombre = imprimirNombre(infoProducto.nombre); 
    const descripcion = imprimirDescripcion(infoProducto.descripcion); 

    const cuerpoTarjeta = document.createElement("div"); 
    cuerpoTarjeta.classList.add("card-body"); 
    cuerpoTarjeta.appendChild(nombre); 
    cuerpoTarjeta.appendChild(descripcion);
    cuerpoTarjeta.appendChild(renglonInferior);

    const imagen = imprimirFoto(infoProducto.imagen, infoProducto.altImagen); 

    const card = document.createElement("div"); 
    card.className = "card limitado-destacadas tarjeta";
    card.appendChild(imagen); 
    card.appendChild(cuerpoTarjeta); 

    const cardProducto = document.createElement('div');
    cardProducto.classList.add('col');
    cardProducto.appendChild(card); 
    return cardProducto;
}

const imprimirContenedorTarjetas = () => {
    const contenedorTarjetas = document.createElement("div");
    contenedorTarjetas.className = "row row-cols-1 row-cols-md-3 g-4 mx-auto";
    // imprimo renglon
    // cada renglon se llena con 3 cards/productos
    // se necesita llamar 3 veces a imprimirProducto
    // imprimirProducto

    // {
    //     codigo: "mateHuevito",
    //     nombre: "Modelo Huevito",
    //     imagen: "assets/redondito-flores-rojas.jpeg",
    //     altImagen: "", 
    //     descripcion: "Con diseño de flores rojas. Producto de algarrobo pintado a mano. Incluye bombilla.",
    //     precio : "$1500",
    // },

    productos.forEach((infoProducto) => {
        const cardProducto = imprimirProducto(infoProducto);
        contenedorTarjetas.appendChild(cardProducto);
    });

    const seccionDestacados = document.querySelector("#seccionDestacados"); 
    seccionDestacados.appendChild(contenedorTarjetas); 

    // const colProd1 = imprimirProducto(productos[0]);
    // const colProd2 = imprimirProducto(productos[0]);
    // const colProd3 = imprimirProducto(productos[0]);
   
}

imprimirContenedorTarjetas();

// //Fetch para productos destacados vistos en  un console.log(). 

// fetch("js/datosFetch.json")
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log(error))
