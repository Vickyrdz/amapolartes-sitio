
//Cambie los titulos de las imagenes del index. Los subraye: 

let titulosCarta = document.querySelectorAll(".card-title"); 
console.log(titulosCarta); 

titulosCarta.forEach((tituloCarta) => {
    tituloCarta.style.textDecoration = "underline"; 
});

