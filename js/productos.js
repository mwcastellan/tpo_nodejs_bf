window.addEventListener("load", () => {
  cargarProductos();
});

// funcion que carga y muestra
const cargarProductos = async () => {
  try {
    let respuesta = await fetch("https://tpodotnetbbapi-production.up.railway.app/api/reporte_01");
    if (respuesta.status == 200) {
      let datos = await respuesta.json();
      let contenedor = "";
      let idcategoria = "";
      let idsubcategoria = "";
      let grupocategoria = 0;
      let gruposubcategoria = 0;

      datos.forEach((producto) => {
        // Categoria
        if (idcategoria != producto.IDCATEGORIA) {
          if (grupocategoria != 0) {
            contenedor += `</section>    `;
            contenedor += `</section>    `;
            gruposubcategoria = 0;
          }
          grupocategoria = 1;
          contenedor += `<section class="Productos_Grupo_General">
          <img src="img/productos/${producto.PATH_CATEGORIA}" alt="Productos"/>
          <h2 class="Productos_Clipped">Productos_Grupo_General</h2>    `;
          idcategoria = producto.IDCATEGORIA;
        }
        // Subcategoria
        if (idsubcategoria != producto.IDSUBCATEGORIA) {
          if (gruposubcategoria != 0) {
            contenedor += `</section>    `;
          }
          gruposubcategoria = 1;
          contenedor += ` <section class="Productos_Grupo_Particular">
                                <img src="img/productos/${producto.PATH_SUBCATEGORIA}" alt="Productos" />
                                <h2 class="Productos_Clipped">Productos_Grupo_Particular</h2>
                             </section>
                             <section class="Productos grid-container">
                                <h2 class="Productos_Clipped">Productos grid-container</h2>    `;
          idsubcategoria = producto.IDSUBCATEGORIA;
        }
        // Productos
        contenedor += `<article class="Producto grid-item">
                            <h4>${producto.DESCRIPCION}</h4>
                            <img src="./img/productos/${producto.NOMBRE_IMAGEN}" alt="Productos" />
                            <p>${producto.PRECIO}</p>
                            <p>${producto.DESCRIPCION_AMPLIA}</p>
                           <a class="Producto_btn" href="">Añadir al carrito</a>
                         </article>    `;
      });
      contenedor += `</section>    `;
      contenedor += `</section>    `;
      document.querySelector(".Contenedor").innerHTML = contenedor;
    } else if (respuesta.status === 404) {
      console.log("error 404 nos vemos en otro lugar");
    }
  } catch (error) {
    console.log(error);
  }
};
