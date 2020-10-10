const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_DESAFIO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  //nuevo código para un solo menú para todo el sitio
  var textoMenu = `
      <a class="py-2 d-none d-md-inline-block" href="index.html">Inicio</a>
      <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
      <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
      <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
      <div class="btn-group">
        <button type="button" id="ubicacionMail" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="cart.html">Mi Carrito</a>
          <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="login.html">Cerrar Sesión</a>
        </div>
      </div>`;
  document.getElementById("menu").innerHTML = textoMenu;
  //hasta acá nuevo codigo

  if (localStorage.getItem("mail")== null) location.replace("login.html")
  else{
    var mail= document.getElementById("ubicacionMail")
    mail.innerHTML+= localStorage.getItem("mail")
  }

  
});