//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var articulos;

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_DESAFIO).then(function(resultObj){ 
        if (resultObj.status === "ok")
        {
            articulos = resultObj.data.articles;

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
                </tr>
                </tbody>
                `
                           
            }
            texto += `<td></td><td></td><td></td><td><strong>Total:</strong></td><td><strong id="total">Total</strong></td>`
            listado.innerHTML += texto;

        } 
        calcularSubtotales();
   })


});

function calcularSubtotales(){
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
        document.getElementById(id).innerHTML="UYU " +subtotal;
        total= total + subtotal;
        document.getElementById("total").innerHTML= "UYU " +total;
    }
}