//Fetch para productos destacados vistos en  un console.log(). 

fetch("js/datosFetch.json")
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))
