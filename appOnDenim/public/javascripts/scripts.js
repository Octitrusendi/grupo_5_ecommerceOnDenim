
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

  /* formContact.onsubmit = e => {
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
 */

  });

