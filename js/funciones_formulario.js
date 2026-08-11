
/* showToast centralized in js/toasts.js */

/* Función para validar datos turnos */
function validarturnos() {
  const validaNombrePersona = document.getElementById("nombreDueño").value;
  const validaNombreMascota = document.getElementById("nombreMascota").value;
  const validaDia = document.getElementById("dia").value;
  const validaHorario = document.getElementById("horario").value;

  if (validaNombrePersona === "" || validaNombreMascota === "" || validaDia === "" || validaHorario === "") {
    showToast(t('campo_vacio'), "error");
    return false; // Evita que se envíe el formulario
  }

  showToast(t('turno_solicitado'), "info");
  document.getElementById("nombreDueño").value = ""; // Limpia los campos del formulario
  document.getElementById("nombreMascota").value = "";
  document.getElementById("dia").value = "";
  document.getElementById("horario").value = "";
  return false; // Evita que se envíe el formulario
}

/* Función para validar datos consulta */
function validarconsulta() {
  const validaEmail = document.getElementById("email").value;

  // Expresión regular para validar el correo electrónico
  const emailRegex = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

  if (validaEmail !== "" && !emailRegex.test(validaEmail)) {
    showToast(t('mail_invalido'), "error");
    return false; // Evita que se envíe el formulario
  }

  const validaNombre = document.getElementById("nombreCompleto").value;
  const validaAsunto = document.getElementById("motivo").value;
  const validaConsulta = document.getElementById("comentario").value;

  if (validaNombre === "" || validaAsunto === "" || validaConsulta === "") {
    showToast(t('campo_vacio'), "error");
    return false; // Evita que se envíe el formulario
  }
  showToast(t('consulta_enviada'), "info");
  // Limpiar campos del formulario
  document.getElementById("nombreCompleto").value = "";
  document.getElementById("email").value = "";
  document.getElementById("motivo").value = "";
  document.getElementById("comentario").value = "";
  return false; // Evita que se envíe el formulario
}

// Bind botones (sin onclick inline)
document.addEventListener("DOMContentLoaded", () => {
  const btnTurnos = document.getElementById("btnEnviarTurnos");
  if (btnTurnos) btnTurnos.addEventListener("click", (e) => { e.preventDefault(); validarturnos(); });

  const btnConsulta = document.getElementById("btnEnviarConsulta");
  if (btnConsulta) btnConsulta.addEventListener("click", (e) => { e.preventDefault(); validarconsulta(); });
});
