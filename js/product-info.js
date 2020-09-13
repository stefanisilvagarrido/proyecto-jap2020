//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productrecomendados = []

var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
        
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCategoryHTML = document.getElementById("productCategory")
            let productSoldCountHTML = document.getElementById("productSoldCount")
            
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.currency +' '+ product.cost;
            productCategoryHTML.innerHTML = product.category;
            productSoldCountHTML.innerHTML = product.soldCount;
            
    

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            productrecomendados = product.relatedProducts
            
        }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            var listaRecomendados = document.getElementById("listaRecomendados")
            
            for(let i = 0; i < productrecomendados.length; i++){

                listaRecomendados.innerHTML += `
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="` + product[i].imgSrc + `" alt="">
                    </div>
                </div>
                `
                           
            }
        } 

     });

     getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            var comentarios = document.getElementById("comentarios");
            
            for(let i = 0; i < product.length; i++){

                comentarios.innerHTML += `
                <div id="comentarios" class="row box-comentarios my-3 w-100" > 
                <div class="col-6 box-nombreUsuario font-weight-bold"> ` + product[i].user +`</div>
                <div class="col-6 box-fecha text-rigth text-muted">` + product[i].dateTime +`</div>
                <div class="col-12 box-descripcion">` + product[i].description +`</div>
                <div class="col-12 box-estrellas">` + seleccionarEstrellas(product[i].score)+`</div>
        
                `
            
            }
            
        }
            

     });


});

function seleccionarEstrellas(calificacion){
    let textoHtml = "";
    let pintadas = 0;

    while (pintadas < calificacion) {
        textoHtml += '<span class="fa fa-star checked"></span>';
        pintadas += 1;
    }

    while (5-pintadas > 0){
        textoHtml += '<span class="fa fa-star"></span>';
        pintadas += 1;
    }

    return textoHtml;

}

document.getElementById("enviar").addEventListener("click", function(){
    var nombre = document.getElementById("nombre").value;
    var comentario = document.getElementById("comentario").value;
    var puntaje = document.getElementById("puntaje").value;
    var n = new Date();
    var fecha = n.getFullYear() + '-' + n.getMonth() + '-' + n.getDate() + ' ' + n.getHours()+ ':' + n.getMinutes() + ':' + n.getSeconds();

    var comentarios = document.getElementById("comentarios");

    comentarios.innerHTML += `
    <div id="nuevoComentario" class="row box-comentarios my-3 w-100" > 
    <div class="col-6 box-nombreUsuario font-weight-bold"> ` + nombre +`</div>
    <div class="col-6 box-fecha text-rigth text-muted">` + fecha +`</div>
    <div class="col-12 box-descripcion">` + comentario +`</div>
    <div class="col-12 box-estrellas">` + seleccionarEstrellas(puntaje) +`</div>`

});