document.addEventListener("DOMContentLoaded", init);

const URL_API = "https://tpodotnetbbapi-production.up.railway.app/api/pedidos";

let pedidos = [];

function init() {
  search();
}

function agregarPedido() {
  clean();
  abrirFormulario();
}

function abrirFormulario() {
  document.getElementById("pedidos_modal").className =
    "pedidos_modale pedidos_opened";
}

function cerrarModal() {
  document.getElementById("pedidos_modal").className = "pedidos_modale";
}

// ======================================
// TRAER PEDIDOS
// ======================================
async function search() {
  try {
    const respuesta = await axios.get(URL_API, {
      withCredentials: true,
    });
    console.log("PEDIDOS:", respuesta.data);
    pedidos = respuesta.data;

    let html = "";

    pedidos.forEach((pedido) => {
      html += `
      <tr>
        <td>${pedido.id}</td>
        <td>${pedido.fecha_COMPRA}</td>
        <td>${pedido.idcliente}</td>
        <td>${pedido.idproducto}</td>
        <td>${pedido.precio}</td>
        <td>${pedido.cantidad}</td>
        <td>${pedido.importe}</td>
        <td>${pedido.idestado}</td>
        <td>
          #"
             class="pedidos_myButton">Editar</a>

          #"
             class="pedidos_btnDelete">Eliminar</a>
        </td>
      </tr>
      `;
    });

    document.querySelector("#pedidos tbody").innerHTML = html;
  } catch (error) {
    console.error(error);

    document.querySelector("#txtmsg").innerHTML =
      error.response?.data?.mensaje || error.message;
  }
}

// ======================================
// EDITAR
// ======================================
function edit(id) {
  abrirFormulario();

  const pedido = pedidos.find((x) => x.ID == id);

  if (!pedido) return;

  document.getElementById("txtid").value = pedido.ID;
  document.getElementById("txtfecha_compra").value = pedido.FECHA_COMPRA;

  document.getElementById("txtidcliente").value = pedido.IDCLIENTE;

  document.getElementById("txtidproducto").value = pedido.IDPRODUCTO;

  document.getElementById("txtprecio").value = pedido.PRECIO;

  document.getElementById("txtcantidad").value = pedido.CANTIDAD;

  document.getElementById("txtimporte").value = pedido.IMPORTE;

  document.getElementById("txtidestado").value = pedido.IDESTADO;
}

// ======================================
// ELIMINAR
// ======================================
async function remove(id) {
  if (!confirm(`¿Está seguro de eliminar el Pedido Nro: ${id}?`)) return;

  try {
    const respuesta = await axios.delete(`${URL_API}/${id}`, {
      withCredentials: true,
    });

    alert(respuesta.data.mensaje);

    search();
  } catch (error) {
    alert(error.response?.data?.mensaje || error.message);
  }
}

// ======================================
// LIMPIAR FORMULARIO
// ======================================
function clean() {
  document.getElementById("txtid").value = 0;
  document.getElementById("txtfecha_compra").value = "";
  document.getElementById("txtidproducto").value = "";
  document.getElementById("txtprecio").value = "";
  document.getElementById("txtcantidad").value = "";
  document.getElementById("txtimporte").value = "";
  document.getElementById("txtidestado").value = 1;

  document.querySelector("#txtmsg").innerHTML = "";
}

// ======================================
// ALTA / MODIFICACION
// ======================================
async function save() {
  const txtMsg = document.querySelector("#txtmsg");

  const data = {
    FECHA_COMPRA: document.getElementById("txtfecha_compra").value,

    IDPRODUCTO: parseInt(document.getElementById("txtidproducto").value),

    PRECIO: parseFloat(document.getElementById("txtprecio").value),

    CANTIDAD: parseInt(document.getElementById("txtcantidad").value),

    IMPORTE: parseFloat(document.getElementById("txtimporte").value),

    IDESTADO: parseInt(document.getElementById("txtidestado").value),
  };

  const id = document.getElementById("txtid").value;

  try {
    let respuesta;

    // ALTA
    if (id === "0") {
      respuesta = await axios.post(URL_API, data, {
        withCredentials: true,
      });
    } else {
      // MODIFICACION
      respuesta = await axios.put(`${URL_API}/${id}`, data, {
        withCredentials: true,
      });
    }

    txtMsg.innerHTML = respuesta.data.mensaje;

    search();
  } catch (error) {
    // Validaciones ASP.NET
    if (error.response?.data?.errors) {
      const errores = error.response.data.errors;

      let html = "<ul>";

      Object.values(errores).forEach((listaErrores) => {
        listaErrores.forEach((mensaje) => {
          html += `<li>${mensaje}</li>`;
        });
      });

      html += "</ul>";

      txtMsg.innerHTML = html;
    } else {
      txtMsg.innerHTML = error.response?.data?.mensaje || error.message;
    }
  }
}
