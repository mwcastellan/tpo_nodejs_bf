const URL_API = "https://tpodotnetbbapi-production.up.railway.app/api/clientes/registrar";

// ALTA CLIENTES
async function save() {
  const txtMsg = document.querySelector("#txtmsg");

  try {
    const data = {
      EMAIL: document.getElementById("EMAIL").value,
      APELLIDO: document.getElementById("APELLIDO").value,
      NOMBRE: document.getElementById("NOMBRE").value,
      DIRECCION: document.getElementById("DIRECCION").value,
      PASSWORD: document.getElementById("PASSWORD").value,
    };

    const res = await axios.post(URL_API, data);

    txtMsg.innerHTML = res.data.mensaje;

  } catch (error) {

    // Error de validación ASP.NET
    if (error.response?.data?.errors) {

      const errores = error.response.data.errors;

      let html = "<ul>";

      Object.keys(errores).forEach(campo => {
        errores[campo].forEach(mensaje => {
          html += `<li>${mensaje}</li>`;
        });
      });

      html += "</ul>";

      txtMsg.innerHTML = html;

    } else {

      // Error simple (ej: email ya existe)
      txtMsg.innerHTML =
        error.response?.data?.mensaje ||
        error.message;
    }
  }
}