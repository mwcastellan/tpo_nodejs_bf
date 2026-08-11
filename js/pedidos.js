document.addEventListener("DOMContentLoaded", init);

const URL_API = "https://tpodotnetbbapi-production.up.railway.app/api/pedidos";
let pedidos = [];
const URL_CLIENTE = "https://tpodotnetbbapi-production.up.railway.app/api/clientes/cliente";

function init() {
  search();
  traerCliente();
  // Event bindings (no inline onclick)
  const btnAgregar = document.getElementById("btnAgregarPedido");
  if (btnAgregar) {
    btnAgregar.addEventListener("click", (e) => {
      e.preventDefault();
      agregarPedido();
    });
  }
  const btnClose = document.getElementById("btnCloseModal");
  if (btnClose) btnClose.addEventListener("click", (e) => { e.preventDefault(); cerrarModal(); });

  const btnSave = document.getElementById("btnSave");
  if (btnSave) btnSave.addEventListener("click", (e) => { e.preventDefault(); save(); });

  const tbody = document.querySelector("#pedidos > tbody");
  if (tbody) {
    tbody.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      const action = a.dataset.action;
      const id = a.dataset.id;
      if (action === "edit") edit(id);
      if (action === "delete") remove(id);
    });
  }
}

function agregarPedido() {
  clean();
  abrirFormulario();
}

// ======================================
// TRAER CLIENTE LOGUEADO
// ======================================
async function traerCliente() {
  const el = document.getElementById("cliente_email");
  if (!el) return;
  try {
    const res = await axios.get(URL_CLIENTE, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const cliente = res.data || {};
    const email = cliente.EMAIL || cliente.email || cliente.Email || "";
    el.innerText = t('client_label') + ': ' + (email || t('client_not_logged'));
  } catch (error) {
    el.innerText = t('client_label') + ': ' + t('client_not_logged');
  }
}

function abrirFormulario() {
  const modal = document.getElementById("pedidos_modal");
  if (!modal) return;
  // accesibilidad
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "false");
  // guardar foco previo
  window._lastFocusPedidos = document.activeElement;

  modal.className = "pedidos_modale pedidos_opened";
  // poner foco en el primer campo
  const first = document.getElementById("txtfecha_compra");
  if (first) first.focus();
}

function cerrarModal() {
  const modal = document.getElementById("pedidos_modal");
  if (!modal) return;
  modal.className = "pedidos_modale";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeAttribute("role");
  // restaurar foco
  const prev = window._lastFocusPedidos || document.getElementById("btnAgregarPedido");
  if (prev) prev.focus();
}

function setLoading(state) {
  const overlay = document.getElementById("spinnerOverlay");
  const btnSave = document.getElementById("btnSave");
  const btnAgregar = document.getElementById("btnAgregarPedido");
  if (overlay) {
    overlay.style.display = state ? "flex" : "none";
    overlay.setAttribute("aria-hidden", state ? "false" : "true");
  }
  if (btnSave) btnSave.disabled = !!state;
  if (btnAgregar) btnAgregar.disabled = !!state;
  document.body.style.cursor = state ? "wait" : "default";
}

// ======================================
// TRAER PEDIDOS
// ======================================

// TRAER PEDIDOS
async function search() {
  setLoading(true);
  let html = "";
  try {
    let respuesta = await axios.get(URL_API, {
      withCredentials: true,
      // credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    pedidos = respuesta.data || [];
    if (pedidos.length === 0) {
      html = `<tr><td colspan="9">${t('no_pedidos')} </td></tr>`;
    } else {
      for (const pedido of pedidos) {
        const id = escapeHtml(String(pedido.ID));
        const fecha = pedido.FECHA_COMPRA ? escapeHtml(pedido.FECHA_COMPRA.split("T")[0]) : "";
        const idcliente = escapeHtml(String(pedido.IDCLIENTE || ""));
        const idproducto = escapeHtml(String(pedido.IDPRODUCTO || ""));
        const precio = escapeHtml(String(pedido.PRECIO || ""));
        const cantidad = escapeHtml(String(pedido.CANTIDAD || ""));
        const importe = escapeHtml(String(pedido.IMPORTE || ""));
        const idestado = escapeHtml(String(pedido.IDESTADO || ""));

        html += `<tr>
        <td>${id}</td>
        <td>${fecha}</td>
        <td>${idcliente}</td>
        <td>${idproducto}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${importe}</td>
        <td>${idestado}</td>
        <td>
          <a href="#" class="pedidos_myButton" data-action="edit" data-id="${id}">${t('edit')}</a>
          <a href="#" class="pedidos_btnDelete" data-action="delete" data-id="${id}">${t('delete')}</a>
        </td>
      </tr>`;
      }
    }
    document.querySelector("#pedidos > tbody").innerHTML = html;
  } catch (error) {
    const msg = `${t('error_fetch_pedidos')}: ${error.response?.data?.mensaje || error.message || String(error)}`;
    html = `<tr><td colspan="9">${escapeHtml(msg)}</td></tr>`;
    document.querySelector("#pedidos > tbody").innerHTML = html;
  } finally {
    setLoading(false);
  }
}

// ======================================
// EDITAR
// ======================================
function edit(id) {
  abrirFormulario();

  const pedido = pedidos.find((x) => x.ID == id);

  if (!pedido) return;
  console.log(pedido);

  document.getElementById("txtid").value = pedido.ID;

  document.getElementById("txtfecha_compra").value = pedido.FECHA_COMPRA.split("T")[0];

  document.getElementById("txtidcliente").value = pedido.IDCLIENTE;

  document.getElementById("txtidproducto").value = pedido.IDPRODUCTO;

  document.getElementById("txtprecio").value = pedido.PRECIO;

  document.getElementById("txtcantidad").value = pedido.CANTIDAD;

  document.getElementById("txtimporte").value = pedido.IMPORTE;

  document.getElementById("txtidestado").value = pedido.IDESTADO;
}

// Utilidades
function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// showToast centralized in js/toasts.js

// ======================================
// ELIMINAR
// ======================================
async function remove(id) {
  if (!confirm(`¿Está seguro de eliminar el Pedido Nro: ${id}?`)) return;
  setLoading(true);
  try {
    const respuesta = await axios.delete(`${URL_API}/${id}`, {
      withCredentials: true,
    });

    showToast(respuesta.data.mensaje || 'El pedido fue eliminado', 'info');

    await search();
  } catch (error) {
    showToast(error.response?.data?.mensaje || error.message || 'Error al eliminar', 'error');
  } finally {
    setLoading(false);
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

  // Validaciones cliente
  if (!data.IDPRODUCTO || isNaN(data.IDPRODUCTO)) {
    txtMsg.textContent = t('invalid_product');
    showToast(t('invalid_product'), 'error');
    return;
  }
  if (isNaN(data.PRECIO) || data.PRECIO <= 0) {
    txtMsg.textContent = t('invalid_price');
    showToast(t('invalid_price'), 'error');
    return;
  }
  if (isNaN(data.CANTIDAD) || data.CANTIDAD <= 0) {
    txtMsg.textContent = t('invalid_quantity');
    showToast(t('invalid_quantity'), 'error');
    return;
  }
  if (isNaN(data.IMPORTE) || data.IMPORTE <= 0) {
    txtMsg.textContent = t('invalid_amount');
    showToast(t('invalid_amount'), 'error');
    return;
  }

  setLoading(true);
  try {
    let respuesta;
    if (id === "0") {
      respuesta = await axios.post(URL_API, data, { withCredentials: true });
    } else {
      respuesta = await axios.put(`${URL_API}/${id}`, data, { withCredentials: true });
    }

    txtMsg.textContent = respuesta.data.mensaje || "Operación realizada";
    showToast(respuesta.data.mensaje || "Guardado correctamente", "info");

    await search();
    cerrarModal();
  } catch (error) {
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
      showToast("Error de validación", "error");
    } else {
      const msg = error.response?.data?.mensaje || error.message || "Error inesperado";
      txtMsg.textContent = msg;
      showToast(msg, "error");
    }
  } finally {
    setLoading(false);
  }
}
