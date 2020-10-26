//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var articulos;
var tarjeta = false;

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_DESAFIO).then(function(resultObj){ 
        if (resultObj.status === "ok")
        {
            articulos = resultObj.data.articles;
            escribirArticulos();
        } 
        calcularSubtotales();
   })

});

   function escribirArticulos(){


    var texto = '';
    var listado = document.getElementById("listado");
    var subtotal = 0;

    for(let i = 0; i < articulos.length; i++){

        if (articulos[i].currency == "UYU"){
            subtotal = articulos[i].unitCost*articulos[i].count;
        }else{
            subtotal = articulos[i].unitCost*articulos[i].count*40; 
        }
        
        texto += `
        <tbody class"row list-group-item">
        <tr>
            <td><img style="display:block; height:110px" src="` + articulos[i].src + `"></td>
            <td>`+ articulos[i].name +`</td>
            <td>`+ articulos[i].currency +' '+ articulos[i].unitCost+`</td>
            <td class="col-xs-2"><input id=`+ i +` oninput="calcularSubtotales()" style="width:4em" class="form-control" type="number" value= `+ articulos[i].count +`></td>
            <td><strong id="subtotal`+ i +`" > UYU `+ subtotal + `</strong></td>
            <td><button id="`+i+`" onclick="eliminar(this.id)" class="btn btn-light"><img style="width:30px" src="img/papelera.jpg"/></button></td>
        </tr>
        </tbody>
        `
                   
    }
    //texto += `<td></td><td></td><td></td><td><strong>Total:</strong></td><td><strong id="total">Total</strong></td>`
    listado.innerHTML = texto;
   }

function calcularSubtotales(){
    
    var porcentajeEnvio = 0;
    var costoEnvio = 0;
    var envios = document.getElementsByName("envio"); 
    for(i = 0; i < envios.length; i++) { 
        if(envios[i].checked) 
            porcentajeEnvio = envios[i].value;
    } 
    
    total= 0

    for(let i = 0; i < articulos.length; i++){

        if (articulos[i].currency == "UYU"){
            precio = articulos[i].unitCost;
        }else{
            precio = articulos[i].unitCost*40; 
        }
        id2= i;
        cantidad= document.getElementById(id2).value;

        subtotal= precio*cantidad;
        id="subtotal" + i;
        document.getElementById(id).innerHTML="UYU " + subtotal;
        total= total + subtotal;
        
    }

    costoEnvio = (total*porcentajeEnvio)/100;

    document.getElementById("subtotal").innerHTML= "UYU " + total;
    document.getElementById("envio").innerHTML= "UYU " + costoEnvio;
    document.getElementById("total").innerHTML= "UYU " + (total+costoEnvio);
}

document.getElementById("aceptar").addEventListener("click", function(){
    let nombre = document.getElementById("owner");
    let nroTarjeta = document.getElementById("cardNumber");
    let anio = document.getElementById("year");
    let mes = document.getElementById("month");
    let cvv = document.getElementById("cvv");

    if(nombre.value){
        nombre.className = "form-control is-valid";
    }else{
        nombre.className = "form-control is-invalid";
    }
    if(nroTarjeta.value){
        nroTarjeta.className = "form-control is-valid";
    }else{
        nroTarjeta.className = "form-control is-invalid";
    }
    if(anio.value){
        anio.className = "form-control is-valid";
    }else{
        anio.className = "form-control is-invalid";
    }
    if(mes.value){
        mes.className = "form-control is-valid";
    }else{
        mes.className = "form-control is-invalid";
    }
    if(cvv.value){
        cvv.className = "form-control is-valid";
    }else{
        cvv.className = "form-control is-invalid";
    }

    if(nombre.value && nroTarjeta.value && anio.value && mes.value && cvv.value){
        tarjeta = true;
        document.getElementById("formaPago").innerHTML= "Tarjeta número "+nroTarjeta.value;
        $("#exampleModal").modal("hide");
    }
});

function eliminar(e){
    articulos.splice(e,1);
    escribirArticulos();
    calcularSubtotales();
} 

document.getElementById("comprar").addEventListener("click", function(){
    var calle = document.getElementById("calle");
    var nro = document.getElementById("nro");
    var esq = document.getElementById("esq");
    var divMensaje = document.getElementById("mensaje");
    var msg;

    if(calle.value){
        calle.className = "form-control is-valid";
    }else{
        calle.className = "form-control is-invalid";
    }
    if(nro.value){
        nro.className = "form-control is-valid";
    }else{
        nro.className = "form-control is-invalid";
    }
    if(esq.value){
        esq.className = "form-control is-valid";
    }else{
        esq.className = "form-control is-invalid";
    }

    if(calle.value && nro.value && esq.value && tarjeta){
        getJSONData(CART_BUY_URL).then(function(resultObj){
            msg = resultObj.data.msg;
            divMensaje.innerHTML = "<div class='alert alert-success' role='alert'>"+msg+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        })
    }
    else{
        divMensaje.innerHTML = "<div class='alert alert-danger' role='alert'>Debe completar todos lo campos<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    }
});