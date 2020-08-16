//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
var mail= document.getElementById("inputEmail") //Buscar la etiqueta donde igresamos el mail, en el html.
var ingresarEmail= document.getElementById("buttonEmail")//Buscar la etiqueta del botón para ingresar al index.html
ingresarEmail.addEventListener("click", ()=>{ //Esta función lo que hace es: cuando damos click en el botón, guardamos nuestro email, en sessionStorage.
    window.sessionStorage.setItem("mail", mail.value)
})
  

});