// ==========================================
// LOGIN CLIENTES
// ==========================================

const URL_API =
  "https://tpodotnetbbapi-production.up.railway.app/api/clientes/login";

async function login() {
  const txtMsg = document.querySelector("#txtmsg");

  const data = {
    email: document.getElementById("EMAIL").value.trim(),
    password: document.getElementById("PASSWORD").value,
  };

  try {
    txtMsg.innerHTML = "<p>Validando usuario...</p>";

    const res = await axios.post(URL_API, data, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    txtMsg.innerHTML = `<p style="color:green">${res.data.mensaje}</p>`;

    // Opcional (para depuración)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    // Redireccionar al módulo pedidos
    setTimeout(() => {
      window.location.href = "pedidos.html";
    }, 1000);
  } catch (error) {
    console.error(error);

    // Errores de validación ASP.NET
    if (error.response?.data?.errors) {
      let html = "<ul>";

      Object.values(error.response.data.errors).forEach((listaErrores) => {
        listaErrores.forEach((mensaje) => {
          html += `<li>${mensaje}</li>`;
        });
      });

      html += "</ul>";

      txtMsg.innerHTML = html;
      return;
    }

    // Mensaje personalizado del backend
    if (error.response?.data?.mensaje) {
      txtMsg.innerHTML = `<p style="color:red">
          ${error.response.data.mensaje}
        </p>`;

      return;
    }

    // Error inesperado
    txtMsg.innerHTML = `<p style="color:red">
        ${error.message}
      </p>`;
  }
}

// ==========================================
// LOGIN CON ENTER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const password = document.getElementById("PASSWORD");

  if (password) {
    password.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        login();
      }
    });
  }
});
