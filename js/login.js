const URL_API =
  "https://tpodotnetbbapi-production.up.railway.app/api/Clientes/login";
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
    document.querySelector("#txtmsg").innerHTML =
      "<p>" + res.data.mensaje + "</p>";

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
  })
  .catch((error) => {
    if (error.response) {
      document.querySelector("#txtmsg").innerHTML =
        "<p>" + error.response.data.mensaje + "</p>";
    } else {
      document.querySelector("#txtmsg").innerHTML =
        "<p>" + error.message + "</p>";
    }
  });
}
