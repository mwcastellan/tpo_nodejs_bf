const URL_API =
  "https://tpodotnetbbapi-production.up.railway.app/api/clientes/registrar";
// ALTA CLIENTES
async function save() {
  try {
    const data = {
      EMAIL: document.getElementById("EMAIL").value,
      APELLIDO: document.getElementById("APELLIDO").value,
      NOMBRE: document.getElementById("NOMBRE").value,
      DIRECCION: document.getElementById("DIRECCION").value,
      PASSWORD: document.getElementById("PASSWORD").value,
    };

    const res = await axios.post(URL_API, data);

    document.querySelector("#txtmsg").innerHTML = res.data.mensaje;
  } catch (error) {
    document.querySelector("#txtmsg").innerHTML =
      error.response?.data?.mensaje || error.message;
  }
}
