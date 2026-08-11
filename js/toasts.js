// Centralized toast helper using Toastify (requires Toastify script present on page)
// Internationalization (basic ES/EN)
const _lang = (function() {
  try {
    const stored = localStorage.getItem('app_lang');
    if (stored) return stored;
  } catch (e) {}
  const nav = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
  return nav.startsWith('en') ? 'en' : 'es';
})();

const i18n = {
  es: {
    client_label: 'Cliente',
    client_not_logged: 'No logueado',
    no_pedidos: 'No hay pedidos para mostrar',
    error_fetch_pedidos: 'Error al obtener pedidos',
    orders_list: 'Lista de pedidos',
    saved_ok: 'Guardado correctamente',
    deleted_ok: 'El pedido fue eliminado',
    invalid_product: 'ID de producto inválido',
    invalid_price: 'Precio inválido',
    invalid_quantity: 'Cantidad inválida',
    invalid_amount: 'Importe inválido',
    validation_error: 'Error de validación',
    unexpected_error: 'Error inesperado',
    campo_vacio: 'Un campo está vacío, favor de completar',
    turno_solicitado: 'Turno solicitado',
    mail_invalido: 'Escriba un mail válido',
    consulta_enviada: 'Consulta enviada',
    add_order: 'Agregar Pedido',
    login_client: 'Login Cliente',
    register_client: 'Registrar Cliente',
    order_data: 'Datos del Pedido',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    th_id: 'ID',
    th_fecha_compra: 'FECHA_COMPRA',
    th_idcliente: 'IDCLIENTE',
    th_idproducto: 'IDPRODUCTO',
    th_precio: 'PRECIO',
    th_cantidad: 'CANTIDAD',
    th_importe: 'IMPORTE',
    th_estado: 'ESTADO',
    label_id: 'ID',
    label_fecha_compra: 'FECHA_COMPRA',
    label_idcliente: 'IDCLIENTE',
    label_idproducto: 'IDPRODUCTO',
    label_precio: 'PRECIO',
    label_cantidad: 'CANTIDAD',
    label_importe: 'IMPORTE',
    label_estado: 'ESTADO',
    label_mensaje: 'MENSAJE'
    ,nav_inicio: 'Inicio',
    nav_productos: 'Productos',
    nav_adoptame: 'Adoptame',
    nav_ubicacion: 'Ubicación',
    nav_contacto: 'Contacto',
    nav_pedidos: 'Pedidos',
    index_welcome: 'Bienvenidos a nuestra Veterinaria',
    productos_detalle: 'Detalle de los productos',
    adoptame_title: 'Qué tener en cuenta antes de adoptar una mascota',
    adoptame_intro: 'Adoptar una mascota es una decisión importante y emocionante. Aquí hay algunas cosas que deberías considerar:',
    adoptame_li_1: 'Tipo de mascota: Decide qué tipo de mascota se adapta mejor a tu estilo de vida, ya sea un perro, un gato, un pájaro, un conejo, etc.',
    adoptame_li_2: 'Espacio: Considera el tamaño de tu hogar y si tienes suficiente espacio tanto dentro como fuera para la mascota que estás considerando.',
    adoptame_li_3: 'Tiempo: Las mascotas requieren tiempo y atención. Piensa en cuánto tiempo tienes disponible para dedicarle a tu mascota cada día.',
    adoptame_li_4: 'Costos: Tener una mascota conlleva gastos, como alimentos, atención veterinaria, juguetes, y otros accesorios.',
    adoptame_li_5: 'Compromiso a largo plazo: Las mascotas viven muchos años, asegúrate de estar listo para el compromiso.',
    adoptame_li_6: 'Compatibilidad: Considera si la mascota es compatible con tu estilo de vida y necesidades.',
    adoptame_li_7: 'Condiciones de adopción: Infórmate sobre los requisitos del refugio o centro de rescate.',
    adoptame_li_8: 'Preparación del hogar: Asegúrate de que tu hogar esté seguro y listo para recibir a tu nueva mascota.',
    adoptame_li_9: 'Considera la adopción: En lugar de comprar, considera adoptar de un refugio o centro de rescate.',
    adoptame_li_10: 'Responsabilidad: Adoptar es una gran responsabilidad; proporciona amor, cuidado y atención durante toda su vida.',
    form_turnos_title: 'Turnos',
    form_nombre_dueno: 'Nombre y Apellido',
    form_nombre_mascota: 'Nombre de la mascota',
    form_tipo_mascota: 'Tipo de mascota',
    form_subir_foto: 'Suba una foto de su mascota',
    form_motivo_turno: 'Motivo del Turno',
    form_dia: 'Día del turno',
    form_horario: 'Horario',
    form_enviar: 'Enviar',
    form_borrar: 'Borrar',
    contacto_title: 'Contactenos',
    contacto_nombre: 'Nombre y Apellido',
    contacto_mail: 'Mail',
    contacto_asunto: 'Asunto',
    contacto_consulta: 'Consulta',
    contacto_enviar: 'Enviar',
    clientes_registrarse: 'Registrarse',
    clientes_email: 'EMAIL',
    clientes_apellido: 'APELLIDO',
    clientes_nombre: 'NOMBRE',
    clientes_direccion: 'DIRECCION',
    clientes_password: 'PASSWORD',
    login_title: 'Login',
    login_email: 'EMAIL',
    login_password: 'PASSWORD'
    ,index_about: 'Más que una clínica veterinaria, Veterinaria Grupo 9 es una familia dedicada a brindar atención integral a sus mascotas. Con años de experiencia y un profundo amor por los animales, nuestro equipo se compromete a ofrecer servicios veterinarios de vanguardia en un ambiente cálido y acogedor.',
    mission_title: 'Nuestra Misión',
    mission_text: 'Nuestra misión es brindar atención veterinaria de excelencia a las mascotas de nuestra comunidad, promoviendo su salud y bienestar a través de servicios preventivos, curativos y de educación.',
    vision_title: 'Nuestra Visión',
    vision_text: 'Aspiramos a ser la clínica veterinaria líder en nuestra comunidad, reconocida por la excelencia en nuestros servicios, el compromiso con el bienestar animal y la construcción de relaciones sólidas con nuestros clientes.',
    ubicacion_text: 'Nos encontramos en el corazón de Palermo SOHO a metros de Plaza Serrano, en la esquina de Honduras al 5000'
  },
  en: {
    client_label: 'Client',
    client_not_logged: 'Not logged',
    no_pedidos: 'No orders to display',
    error_fetch_pedidos: 'Error fetching orders',
    orders_list: 'Orders list',
    saved_ok: 'Saved successfully',
    deleted_ok: 'Order deleted',
    invalid_product: 'Invalid product ID',
    invalid_price: 'Invalid price',
    invalid_quantity: 'Invalid quantity',
    invalid_amount: 'Invalid amount',
    validation_error: 'Validation error',
    unexpected_error: 'Unexpected error',
    campo_vacio: 'A field is empty, please complete',
    turno_solicitado: 'Appointment requested',
    mail_invalido: 'Enter a valid email',
    consulta_enviada: 'Inquiry sent',
    add_order: 'Add Order',
    login_client: 'Client Login',
    register_client: 'Register Client',
    order_data: 'Order Data',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    th_id: 'ID',
    th_fecha_compra: 'PURCHASE_DATE',
    th_idcliente: 'CLIENT_ID',
    th_idproducto: 'PRODUCT_ID',
    th_precio: 'PRICE',
    th_cantidad: 'QUANTITY',
    th_importe: 'AMOUNT',
    th_estado: 'STATUS',
    label_id: 'ID',
    label_fecha_compra: 'PURCHASE_DATE',
    label_idcliente: 'CLIENT_ID',
    label_idproducto: 'PRODUCT_ID',
    label_precio: 'PRICE',
    label_cantidad: 'QUANTITY',
    label_importe: 'AMOUNT',
    label_estado: 'STATUS',
    label_mensaje: 'MESSAGE'
    ,nav_inicio: 'Home',
    nav_productos: 'Products',
    nav_adoptame: 'Adopt',
    nav_ubicacion: 'Location',
    nav_contacto: 'Contact',
    nav_pedidos: 'Orders',
    index_welcome: 'Welcome to our Veterinary',
    productos_detalle: 'Products details',
    adoptame_title: 'What to consider before adopting a pet',
    adoptame_intro: 'Adopting a pet is an important and exciting decision. Here are some things you should consider:',
    adoptame_li_1: 'Type of pet: Decide which type of pet best fits your lifestyle, whether it is a dog, cat, bird, rabbit, etc.',
    adoptame_li_2: 'Space: Consider the size of your home and whether you have enough space both indoors and outdoors for the pet you are considering.',
    adoptame_li_3: 'Time: Pets require time and attention. Think about how much time you have available each day.',
    adoptame_li_4: 'Costs: Having a pet involves expenses like food, veterinary care, toys, and other accessories.',
    adoptame_li_5: 'Long-term commitment: Pets live many years; make sure you are ready for the long-term commitment.',
    adoptame_li_6: 'Compatibility: Consider whether the pet is compatible with your lifestyle and needs.',
    adoptame_li_7: 'Adoption conditions: Learn about the adoption requirements at the shelter or rescue center.',
    adoptame_li_8: 'Home preparation: Ensure your home is safe and ready to receive your new pet.',
    adoptame_li_9: 'Consider adoption: Instead of buying, consider adopting from a shelter or rescue center.',
    adoptame_li_10: 'Responsibility: Adopting a pet is a big responsibility; provide love, care and attention throughout its life.',
    form_turnos_title: 'Appointments',
    form_nombre_dueno: "Owner's Name",
    form_nombre_mascota: "Pet's Name",
    form_tipo_mascota: 'Pet type',
    form_subir_foto: 'Upload a photo of your pet',
    form_motivo_turno: 'Reason for Appointment',
    form_dia: 'Appointment day',
    form_horario: 'Time',
    form_enviar: 'Send',
    form_borrar: 'Clear',
    contacto_title: 'Contact us',
    contacto_nombre: 'Full name',
    contacto_mail: 'Email',
    contacto_asunto: 'Subject',
    contacto_consulta: 'Inquiry',
    contacto_enviar: 'Send',
    clientes_registrarse: 'Register',
    clientes_email: 'EMAIL',
    clientes_apellido: 'LASTNAME',
    clientes_nombre: 'NAME',
    clientes_direccion: 'ADDRESS',
    clientes_password: 'PASSWORD',
    login_title: 'Login',
    login_email: 'EMAIL',
    login_password: 'PASSWORD'
    ,index_about: 'More than a veterinary clinic, Veterinary Group 9 is a family dedicated to providing comprehensive care to your pets. With years of experience and a deep love for animals, our team is committed to offering cutting-edge veterinary services in a warm and welcoming environment.',
    mission_title: 'Our Mission',
    mission_text: 'Our mission is to provide excellent veterinary care to the pets of our community, promoting their health and well-being through preventive, curative and educational services.',
    vision_title: 'Our Vision',
    vision_text: 'We aspire to be the leading veterinary clinic in our community, recognized for excellence in our services, commitment to animal welfare and building strong relationships with our clients.',
    ubicacion_text: 'We are located in the heart of Palermo SOHO, a few meters from Plaza Serrano, on the corner of Honduras at 5000'
  }
};

function t(key) {
  return (i18n[_lang] && i18n[_lang][key]) || (i18n['es'] && i18n['es'][key]) || key;
}

function showToast(message, type = "info") {
  try {
    let bg;
    switch (type) {
      case "error":
        bg = "linear-gradient(90deg,#e74c3c,#c0392b)";
        break;
      case "warning":
        bg = "linear-gradient(90deg,#f39c12,#d35400)";
        break;
      case "success":
        bg = "linear-gradient(90deg,#2ecc71,#27ae60)";
        break;
      default:
        bg = "linear-gradient(90deg,#3498db,#2980b9)";
    }

    Toastify({
      text: String(message),
      duration: 4000,
      gravity: "bottom",
      position: "right",
      close: true,
      stopOnFocus: true,
      style: { background: bg, color: "#fff", fontSize: "14px", padding: "8px 14px" },
    }).showToast();
  } catch (e) {
    console.log(message);
  }
}

// Expose language switch helper
function setLanguage(lang) {
  try { localStorage.setItem('app_lang', lang); } catch (e) {}
  window.location && window.location.reload();
}

// Export t and setLanguage to global
window.t = t;
window.setLanguage = setLanguage;
