const formularioRegister = document.getElementById('formRegister');
const inputs = document.querySelectorAll('#form div');
const botonRegister = document.getElementById('botonRegister');

const expresiones = {
  fecha:
    /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/-](?:0?[1-9]|1[0-2])|(?:29|30)[/-](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/-](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/-]0?2[/-](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/,
  hora: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
  password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  dni: /^\d{8,8}$/, // 7 a 14 numeros.
};

const validarFormulario = e => {
  switch (e.target.name) {
    case 'fullName':
      validarCampo(expresiones.nombre, e.target, 'fullName');
      break;
    case 'usuario':
      validarCampo(expresiones.nombre, e.target, 'usuario');
      break;
    case 'email':
      validarCampo(expresiones.correo, e.target, 'email');
      break;
    case 'password':
      validarCampo(expresiones.password, e.target, 'password');
      validarPassword2();
      break;
    case 'password2':
      validarPassword2();
      break;
      case 'passwordOld':
      validarCampo(expresiones.password, e.target, 'passwordOld');
      break;
  }
};
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .querySelector(`#grupo_${campo} input`)
      .classList.remove('formulario-invalido');
    document
      .querySelector(`#grupo_${campo} input`)
      .classList.add('formulario-valido');
    document
      .querySelector(`#grupo_${campo}  i`)
      .classList.remove('formulario-invalido');
    document
      .querySelector(`#grupo_${campo}  i`)
      .classList.add('formulario-valido');
    document
      .querySelector(`#grupo_${campo} p`)
      .classList.remove('formulario-error-activo');

  } else {
    document
      .querySelector(`#grupo_${campo} input`)
      .classList.add('formulario-invalido');
    document
      .querySelector(`#grupo_${campo} i`)
      .classList.add('formulario-invalido');
    document
      .querySelector(`#grupo_${campo} input`)
      .classList.remove('formulario-valido');
    document
      .querySelector(`#grupo_${campo} i`)
      .classList.remove('formulario-valido');
    document
      .querySelector(`#grupo_${campo} p`)
      .classList.add('formulario-error-activo');

  }
};

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById('password');
  const inputPassword2 = document.getElementById('password2');

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .querySelector(`#grupo_password2 input`)
      .classList.add('formulario-invalido');
    document
      .querySelector(`#grupo_password2 i`)
      .classList.add('formulario-invalido');
    document
      .querySelector(`#grupo_password2 input`)
      .classList.remove('formulario-valido');
    document
      .querySelector(`#grupo_password2 i`)
      .classList.remove('formulario-valido');
    document
      .querySelector(`#grupo_password2 p`)
      .classList.add('formulario-error-activo');
    campos['password'] = false;
  } else {
    document
      .querySelector(`#grupo_password2 input`)
      .classList.remove('formulario-invalido');
    document
      .querySelector(`#grupo_password2 i`)
      .classList.remove('formulario-invalido');
    document
      .querySelector(`#grupo_password2 input`)
      .classList.add('formulario-valido');
    document
      .querySelector(`#grupo_password2 i`)
      .classList.add('formulario-valido');
    document
      .querySelector(`#grupo_password2 p`)
      .classList.remove('formulario-error-activo');
    campos['password'] = true;
  }
};
inputs.forEach(input => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});
