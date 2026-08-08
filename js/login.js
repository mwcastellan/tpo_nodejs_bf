const URL_API = "https://tpodotnetbbapi-production.up.railway.app/api/Clientes/login";
// LOGIN CLIENTES
async function login() {
  var data = {
    EMAIL: document.getElementById("EMAIL").value,
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
      const ress = res.data.message;
      let mensajesdeRes = "<ul>";
      ress.forEach((ressi) => (mensajesdeRes += "<li>" + ressi.msg + "</li>"));
      mensajesdeRes += "</ul>";
      document.querySelector("#txtmsg").innerHTML = mensajesdeRes;
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        const errores = error.response.data.message;
        let mensajesdeError = "<ul>";
        errores.forEach(
          (error) => (mensajesdeError += "<li>" + error.msg + "</li>")
        );
        mensajesdeError += "</ul>";
        document.querySelector("#txtmsg").innerHTML = mensajesdeError;
      } else {
        document.querySelector("#txtmsg").innerHTML =
          "<p>" + error.message + "</p>";
      }
    });
}
