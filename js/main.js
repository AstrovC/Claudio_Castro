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
  
    if (nombre.value.trim() === '') {
        nombre.classList.add('input-error');
        nombremensaje.classList.remove('hide');
        validacion = false;
    } else {
        nombre.classList.remove('input-error');
        nombremensaje.classList.add('hide');
    }
  
    if (apellidoPaterno.value.trim() === '') {
        apellidoPaterno.classList.add('input-error');
        apellidoPaternomensaje.classList.remove('hide');
        validacion = false;
    } else {
        apellidoPaterno.classList.remove('input-error');
        apellidoPaternomensaje.classList.add('hide');
    }
  
    if (apellidoMaterno.value.trim() === '') {
        apellidoMaterno.classList.add('input-error');
        apellidoMaternomensaje.classList.remove('hide');
        validacion = false;
    } else {
        apellidoMaterno.classList.remove('input-error');
        apellidoMaternomensaje.classList.add('hide');
    }
  
    if (direccion.value.trim() === '') {
        direccion.classList.add('input-error');
        direccionmensaje.classList.remove('hide');
        validacion = false;
    } else {
        direccion.classList.remove('input-error');
        direccionmensaje.classList.add('hide');
    }
  
    if (correo.value.trim() === '') {
        correo.classList.add('input-error');
        correomensaje.classList.remove('hide');
        validacion = false;
    } else {
        correo.classList.remove('input-error');
        correomensaje.classList.add('hide');
    }
  
    if (telefono.value.trim() === '') {
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