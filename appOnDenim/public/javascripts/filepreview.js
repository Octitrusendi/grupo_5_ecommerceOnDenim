function cambiarImgen() {
  document.getElementById('avatar').onchange = function (e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);


    reader.onload = function () {
      console.log(reader)
      let imgOld = document.getElementById('imgOld');
      let preview = document.getElementById('preview');
      imagen = document.createElement('img');
      imagen.src = reader.result;
      imagen.classList.add('user-image');
      if (imgOld) {
        imgOld.remove();
      }
      imagen.setAttribute('id', 'imgOld');
      preview.append(imagen);
    };
  };
}

cambiarImgen();
