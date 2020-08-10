//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)

   
        .then(res => res.json())
        .then(res => {
            var listaProductos= document.getElementById("cat-list-container")

            for(var producto of res){
              listaProductos.innerHTML+=  `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name +`</h4>
                            <small class="text-muted">` + producto.currency + ` ` + producto.cost + `</small>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                    </div>
                </div>
            </a>
            `
            }
        })







});