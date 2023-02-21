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
$(function () {
  if ($('.owl-2').length > 0) {
    $('.owl-2').owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 20,
      smartSpeed: 1000,
      autoplay: true,
      nav: true,
      dots: true,
      pauseOnHover: false,
      responsiveClass:true,
      responsive: {
        0: {
          margin: 10,
          nav: true,
          items: 1,
        },
        600: {
          margin: 20,
          nav: true,
          items: 2,
        },
        1000: {
          margin: 20,
          stagePadding: 0,
          nav: true,
          items: 3,
        },
      },
    });
  }
});

function productosEnElCarrito() {
  if (localStorage.carrito) {
    return JSON.parse(localStorage.carrito).reduce(
      (acum, cantidad) => acum + cantidad.quantity,
      0,
    );
  } else {
    return 0;
  }
}
window.addEventListener('load', function () {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: '400',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
  };
  let productos = document.querySelectorAll('.agregar_carrito');

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
      toastr['success']('Producto agregado al carrito');
    });
  });

  let cartNumber = document.querySelector('.cart-number');
  cartNumber.innerText = productosEnElCarrito();

  let formContact = document.querySelector('#checkoutContact');

  formContact.onsubmit = e => {
    e.preventDefault();
    const formData = {
      email: formContact.email.value,
      description: formContact.description.value,
    };
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(r => r.json())
      .then(res => {
        if (res.ok) {
          location.href = `/?enviado=true`;
        } else {
        }
      })
      .catch(error => console.log(error));
  };


  });

