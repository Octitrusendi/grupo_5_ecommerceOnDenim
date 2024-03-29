const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function removeItem(index) {
  if (carrito.length > 1) {
    carrito.splice(index, 1);
    products.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    document.getElementById(`row${index}`).remove();
  } else {
    localStorage.removeItem('carrito');
    products = [];
    setCarritoVacio();
  }
  toastr['warning'](
    'Producto eliminado del carrito' ,
  );
  
  let cartNumber = document.querySelector('.cart-number');
  cartNumber.innerText = productsEnElCarrito();

  document.querySelector('.totalAmount').innerText = `$ ${calcularTotal(
    products,
  )}`;


}

function setCarritoVacio() {
  cartRows.innerHTML = `
  <tr>     
      <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes productos en el carrito</div></td>
  </tr>            
  `;
}
function vaciarCarrito() {
  localStorage.removeItem('carrito');
}

function calcularTotal(products) {
  return products.reduce(
    (acum, product) => (acum += product.price * product.quantity),
    0,
  );
}

let cartRows = document.querySelector('.cartRows');
let products = [];


if (localStorage.carrito && localStorage.carrito != '[]') {
  carrito = JSON.parse(localStorage.carrito);
  carrito.forEach((item, index) => {
    fetch(`/api/products/${item.id}`)
      .then(res => res.json())
      .then(product => {
        if (product) {
          console.log(product);
          let finalPrice = product.price - (product.price * product.sale) / 100;
          cartRows.innerHTML += `
          <tr id="row${index}">
              <th scope="row">${index + 1}</th>
              <td>${product.name}</td>
              <td>$ ${toThousand(finalPrice)}</td>
              <td class="text-center">${item.quantity}</td>
              <td class="text-center">$ ${toThousand(
                finalPrice * item.quantity)}</td>
              <td><button class="btn btn-danger btn-sm" onclick=removeItem(${index})><i class="fas fa-trash"></i></button></td>
          </tr>            
          `;
          
          products.push({
            productId: product.id,
            name: product.name,
            price: finalPrice,
            quantity: item.quantity,
          });
        } else {
          carrito.splice(index, 1);
          localStorage.setItem('carrito', JSON.stringify(carrito));
        }
      })
      .then(() => {
        document.querySelector('.totalAmount').innerText = `$ ${calcularTotal(
          products,
        )}`;
      });
  });
} else {
  setCarritoVacio();
}

let formCheckout = document.querySelector('#checkoutCart');

formCheckout.onsubmit = e => {
  e.preventDefault();
  const formData = {
    orderItems: products,
    paymentMethod: formCheckout.paymentMethod.value,
    shippingMethod: formCheckout.shippingMethod.value,
    total: calcularTotal(products),
  };
  fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(r => r.json())
    .then(res => {
      if (res.ok) {
        vaciarCarrito();
        location.href = `/user/order/${res.order.id}?creado=true`;
      } else {
        toastr['error'](
          'No se pudo realizar la compra' ,
        );
      }
    })
    .catch(error => console.log(error));
};
