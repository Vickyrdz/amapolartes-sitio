
//CADA PARTE DEL FORMULARIO SE DEJA VER EN LA CONSOLA: 

const nombre = document.querySelector("#nombre"); 
nombre.addEventListener("change", () => {
    console.log(nombre.value); 
})

const apellido = document.querySelector("#apellido"); 
apellido.addEventListener("change", () => {
    console.log(apellido.value); 
})

const campoTexto = document.querySelector("#campoTexto"); 
campoTexto.addEventListener("change", () => {
    console.log(campoTexto.value); 
})

const nuevo = document.querySelector("#nuevo"); 
nuevo.addEventListener("click", () => {
    console.log("cliente nuevo");
})

const concurrente = document.querySelector("#concurrente"); 
concurrente.addEventListener("click", () => {
    console.log("cliente concurrente");
})

const formulario = document.querySelector("#formulario"); 

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombreFormulario = nombre.value;
    const apellidoFormulario = apellido.value;
    localStorage.setItem('nombreFormulario', nombreFormulario);
    localStorage.setItem('apellidoFormulario', apellidoFormulario);
    console.log("el formulario se ha enviado con exito"); 
})

const verificarExistenciaCliente = () => {
    const nombreStorage = localStorage.getItem('nombreFormulario'); 
    const apellidoStorage = localStorage.getItem('apellidoFormulario'); 
    
    if (nombreStorage) {
        nombre.value = nombreStorage;
    }
    if (apellidoStorage) {
        apellido.value = apellidoStorage;
    }
    if (nombreStorage && apellidoStorage) {
        concurrente.checked = true;
    }
}

verificarExistenciaCliente();


// JSON.stringify(nombreStorage); 
// JSON.stringify(apellidoStorage); 