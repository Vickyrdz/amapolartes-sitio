
//Utilice Jquery para agregar funcionalidades como la validacion de los campos.
//Además el boton de enviar no funciona hasta que todos los campos requeeridos esten llenos. 


const validarCampoNoVacio = (valor) => {
    return !!valor;
}

// funcion para marcar como requerido un campo
const marcarCampoRequerido = (campo, mensajeCampo) => {
    campo.removeClass('valido');
    campo.addClass('requerido');
    mensajeCampo.removeClass('oculto');
}

// funcion para marcar como valido un campo
const marcarCampoValido = (campo, mensajeCampo) => {
    campo.addClass('valido');
    campo.removeClass('requerido');
    mensajeCampo.addClass('oculto');
}

const validarNombreYApellido = () => {
    // busco el boton del formulario
    const boton = $('#boton-form');
    // si tengo nombre y apellido, permito el envío, de lo contrario desactivo el boton
    if (nombre.value && apellido.value) {
        boton.attr('disabled', false);
    } else {
        boton.attr('disabled', true);
    }
}

// agrego evento change a input de nombre
$('#nombre').change((evento) => {
    // busco el input con id NOMBRE y lo guardo en una variable para pasarlo a la funcion
    const campo = $('#nombre');
    const mensajeCampo = $('#nombre-mensaje');

    // tomo el valor del input sobre el cual ocurre el evento
    const valor = evento.target.value;

    // valido el calor del input
    const esValido = validarCampoNoVacio(valor);

    // si es valido, lo marco como valido, de lo contrario como requerido
    if (esValido) marcarCampoValido(campo, mensajeCampo);
    else marcarCampoRequerido(campo, mensajeCampo);
    validarNombreYApellido();
});

$('#apellido').change((evento) => {
    const campo = $('#apellido');
    const mensajeCampo = $('#apellido-mensaje');

    const valor = evento.target.value;

    const esValido = validarCampoNoVacio(valor);

    if (esValido) marcarCampoValido(campo, mensajeCampo);
    else marcarCampoRequerido(campo, mensajeCampo); 

    validarNombreYApellido();
});

$('#campoTexto').change((evento) => {
    const campo = $('#campoTexto');
    const mensajeCampo = $('#textarea-mensaje');

    const valor = evento.target.value;

    const esValido = validarCampoNoVacio(valor);

    if (esValido) marcarCampoValido(campo, mensajeCampo);
    else marcarCampoRequerido(campo, mensajeCampo); 

    validarNombreYApellido();
});



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
   
        //utilicé operador or

        nombre.value = nombreStorage || `` ;
    
        apellido.value = apellidoStorage || `` ;

        //Utilicé operador ternario 

        const tipoCliente = (nombreStorage && apellidoStorage) ? concurrente : nuevo; 
    
        tipoCliente.checked = true;
}

verificarExistenciaCliente();