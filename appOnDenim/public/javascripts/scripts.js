/* 
function showContent() {
  element = document.getElementById('newPassword');
  check = document.getElementById('check');

  if (check.checked) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

let showPassword = document.getElementById('showPassword');
let password = document.getElementById('password');
let showPassword2 = document.getElementById('showPassword2');
let password2 = document.getElementById('password2');
let showPasswordOld = document.getElementById('showPasswordOld');
let passwordOld = document.getElementById('passwordOld');

function mostrarPassword(passwordClick, passwordInput) {
  passwordClick.addEventListener('click', function () {
    if (passwordInput.type == 'password') {
      passwordInput.type = 'text';
      let showIcon= document.querySelector('#iconPassword');
      showIcon.classList.add("fa-eye-slash")
      showIcon.classList.remove("fa-eye")
      
    } else {
      passwordInput.type = 'password';
      let showIcon= document.querySelector('#iconPassword');
      showIcon.classList.add("fa-eye")
      showIcon.classList.remove("fa-eye-slash")
    }
  });


mostrarPassword(showPassword, password);
mostrarPassword(showPassword2, password2);
mostrarPassword(showPasswordOld, passwordOld);  */
function productosEnElCarrito() {
  if (localStorage.carrito) {
    return JSON.parse(localStorage.carrito).length;
  } else {
    return 0;
  }
}
window.addEventListener('load', function () {

  let productos = document.querySelectorAll('.agregar_carrito');

  /* Creo un event listener por cada boton */
  productos.forEach(producto => {
    producto.addEventListener('click', function (e) {
      if (localStorage.carrito) {
        let carrito = JSON.parse(localStorage.carrito);
        let index = carrito.findIndex(prod => prod.id == e.target.dataset.id);
        if (index != -1) {
          carrito[index].quantity = carrito[index].quantity + 1;
        } else {
          carrito.push({ id: e.target.dataset.id, quantity: 1 });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
      } else {
        localStorage.setItem(
          'carrito',
          JSON.stringify([{ id: e.target.dataset.id, quantity: 1 }]),
        );
      }
      cartNumber.innerText = productosEnElCarrito();
      toastr.success('Se agregó este producto al carrito');
    });
  });

  /* Numero del carrito */
  let cartNumber = document.querySelector('.cart-number');
  cartNumber.innerText = productosEnElCarrito();
});
