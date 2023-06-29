function enviarFormulario() {
    if (validarFormulario()) {
        var rut = document.getElementById('rut').value;
        var nombre = document.getElementById('nom').value;
        var apellidoPaterno = document.getElementById('apeP').value;
        var apellidoMaterno = document.getElementById('apeM').value;
        var genero = document.getElementById('genero').value;
        var direccion = document.getElementById('direccion').value;
        var correo = document.getElementById('correo').value;
        var telefono = document.getElementById('telefono').value;

        var mensaje = "Los datos han sido enviados correctamente:\n" +
            "RUT: " + rut + "\n" +
            "Nombre: " + nombre + "\n" +
            "Apellido Paterno: " + apellidoPaterno + "\n" +
            "Apellido Materno: " + apellidoMaterno + "\n" +
            "Género: " + genero + "\n" +
            "Dirección: " + direccion + "\n" +
            "Correo Electrónico: " + correo + "\n" +
            "Teléfono: " + telefono;
        alert(mensaje);
    }
}




function validarFormulario() {
    var rut = document.getElementById('rut');
    var nombre = document.getElementById('nom');
    var apellidoPaterno = document.getElementById('apeP');
    var apellidoMaterno = document.getElementById('apeM');
    var direccion = document.getElementById('direccion');
    var correo = document.getElementById('correo');
    var telefono = document.getElementById('telefono');
    var rutmensaje = document.getElementById('rut-mensaje');
    var nombremensaje = document.getElementById('nom-mensaje');
    var apellidoPaternomensaje = document.getElementById('apeP-mensaje');
    var apellidoMaternomensaje = document.getElementById('apeM-mensaje');
    var direccionmensaje = document.getElementById('direccion-mensaje');
    var correomensaje = document.getElementById('correo-mensaje');
    var telefonomensaje = document.getElementById('telefono-mensaje');
  
    var validacion = true;
  
    var esRutValido = validarRut(rut.value);
  
    if (!esRutValido) {
        rut.classList.add('input-error');
        rutmensaje.classList.remove('hide');
        validacion = false;
    } else {
        rut.classList.remove('input-error');
        rutmensaje.classList.add('hide');
    }
  
    if (nombre.value.trim().length < 3 || !/^[a-zA-Z]+$/.test(nombre.value.trim())) {
        nombre.classList.add('input-error');
        nombremensaje.classList.remove('hide');
        validacion = false;
    } else {
        nombre.classList.remove('input-error');
        nombremensaje.classList.add('hide');
    }
    
    if (apellidoPaterno.value.trim().length < 3 || !/^[a-zA-Z]+$/.test(apellidoPaterno.value.trim())) {
        apellidoPaterno.classList.add('input-error');
        apellidoPaternomensaje.classList.remove('hide');
        validacion = false;
    } else {
        apellidoPaterno.classList.remove('input-error');
        apellidoPaternomensaje.classList.add('hide');
    }
    
    if (apellidoMaterno.value.trim().length < 3 || !/^[a-zA-Z]+$/.test(apellidoMaterno.value.trim())) {
        apellidoMaterno.classList.add('input-error');
        apellidoMaternomensaje.classList.remove('hide');
        validacion = false;
    } else {
        apellidoMaterno.classList.remove('input-error');
        apellidoMaternomensaje.classList.add('hide');
    }
  
    if (direccion.value.trim().length <= 3) {
        direccion.classList.add('input-error');
        direccionmensaje.classList.remove('hide');
        validacion = false;
    } else {
        direccion.classList.remove('input-error');
        direccionmensaje.classList.add('hide');
    }
  
    if (correo.value.trim() === '' || !/\S+@\S+\.\S+/.test(correo.value.trim())) {
        correo.classList.add('input-error');
        correomensaje.classList.remove('hide');
        validacion = false;
    } else {
        correo.classList.remove('input-error');
        correomensaje.classList.add('hide');
    }
    
  
    if (telefono.value.trim() === '' || !/^\d{9}$/.test(telefono.value.trim())) {
        telefono.classList.add('input-error');
        telefonomensaje.classList.remove('hide');
        validacion = false;
    } else {
        telefono.classList.remove('input-error');
        telefonomensaje.classList.add('hide');
    }
    
  
    return validacion;
}

function validarRut(rut) {
    return !/^[0-9]+[-‐]?[0-9kK]{1}$/.test(rut)
        ? false
        : dv(rut.split('-')[0]) == rut.split('-')[1].toUpperCase();
}

function dv(T) {
    var M = 0,
        S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : 'K';
}

//Consumo de API
const apiKey = '6d002334dc7c8698fabd7d7f7ba7dbdf';
const url = `https://gnews.io/api/v4/top-headlines?country=ar&lang=es&token=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const addNoticias = document.getElementById('news-container');

        data.articles.forEach(article => {
            addNoticias.innerHTML += `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${article.image}" class="card-img-top" alt="Imagen de la noticia">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description}</p>
                            <p class="card-text"><small class="text-muted">${article.source.name}</small></p>
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => {
        console.log('Error:', error);
    });