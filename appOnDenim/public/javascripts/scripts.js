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
}

mostrarPassword(showPassword, password);
mostrarPassword(showPassword2, password2);
mostrarPassword(showPasswordOld, passwordOld);
