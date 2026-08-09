const URL_API = "https://tpodotnetbbapi-production.up.railway.app/api/clientes/registrar";
// ALTA CLIENTES
async function save() {
  var data = {
    EMAIL: document.getElementById("EMAIL").value,
    APELLIDO: document.getElementById("APELLIDO").value,
    NOMBRE: document.getElementById("NOMBRE").value,
    DIRECCION: document.getElementById("DIRECCION").value,
    PASSWORD: document.getElementById("PASSWORD").value,
  };
  var url = URL_API;
  axios
    .post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("then");
      const ress = res.data.message;
      let mensajesdeRes = "<ul>";
      ress.forEach((ressi) => (mensajesdeRes += "<li>" + ressi.msg + "</li>"));
      mensajesdeRes += "</ul>";
      document.querySelector("#txtmsg").innerHTML = mensajesdeRes;
    })
    .catch((error) => {
      console.log("catch");
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.message);
        const errores = error.response.data.message;
        let mensajesdeError = "<ul>";
        errores.forEach(
          (error) => (mensajesdeError += "<li>" + error.msg + "</li>")
        );
        mensajesdeError += "</ul>";
        document.querySelector("#txtmsg").innerHTML = mensajesdeError;
      } else {
        console.error(`Error en la solicitud "${error.message}`);
      }
    });
}
