// metodo on de jquery - mapea la fila
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};



//MOSTRAR PRODUCTOS EN LA LISTA DE AGREGADOS
const mostrarOrdenProductos = (producto) => {
  let filas = "";
  $("#tbody").empty();
  columnas = `<tr class="text-center text-white">
        <th>REFERENCIA</th>
        <th>MARCA</th>
        <th>CATEGORIA</th>
        <th>DESCRIPCION</th>
        <th>PRECIO</th>
        <th>QUITAR</th>
        <th>CANTIDAD</th>
      </tr>`;
  filas = "";
  for (let item of producto) {
    filas += "<tr > ";
    filas += `<td class="text-center text-white bg-secondary">` + item.reference;
    filas += `<td class="text-center text-white bg-secondary">` + item.brand;
    filas += `<td class="text-center text-white bg-secondary">` + item.category;
    filas += `<td class="text-center text-white bg-secondary">` + item.description;
    filas +=  `<td class="text-center text-white bg-secondary">` + item.price;
    filas += ` <td class="text-center text-white "><a class="btnBorrarOrden btn btn-danger">Quitar</a></td>`;
    filas += ` <td class="text-center text-white "><input type="number" id="inputPedido"></td></tr>`;
  }
  $("#tbody").append(columnas + filas);
};

// EJECUTA TODOS LOS DATOS PARA REALIZAR UN PEDIDO
function llenarObjeto() {
  let userData = sessionStorage.getItem("SALESMAN");
  let prodEnCompra = sessionStorage.getItem("PRODUCTOS");
  
  console.log(JSON.parse(prodEnCompra));
  console.log(JSON.parse(userData));

  //localStorage.setItem("ORDEN-COMPRA",JSON.stringify(myData))
}

//llenarObjeto();

function realizarPedido() {
  recuperarQuantity();
  let userData = sessionStorage.getItem("SALESMAN");
  let prodEnCompra = sessionStorage.getItem("PRODUCTOS");
  let cantidad = sessionStorage.getItem("CANTIDAD")
  let nuevaCantidad = JSON.parse(cantidad);
  let nuevaCompra = JSON.parse(prodEnCompra);
  let asesor = JSON.parse(userData);
  objetoProductos = Object.assign({}, nuevaCompra);
  let myData = {
    registerDay: fecha,
    salesMan: asesor,
    products: objetoProductos,
    quantities:nuevaCantidad
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://localhost:8085/api/order/new",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: dataToSend,
    success: function (json) {
      alertify
      .alert("El codigo de de tu pedido es: " +json.id, function(){
      alertify.message("Pedido No: "+json.id+" creado correctamente");
  });
      alertify.success("El pedido de productos se creo correctamente!");
    },
  });
}


// CAPTURA EL VALOR DE REFERENCIA Y CANTIDAD DEL INPUT
on(document, "keyup", "#inputPedido", (e) => {
  let fila = e.target.parentNode.parentNode;
  let indetificador = fila.firstElementChild.innerHTML;
  let input = fila.children[6].querySelector("#inputPedido").value;
  let inputParse = parseInt(input); // se realiza el parseo a entero
  sessionStorage.setItem(`${indetificador}`, inputParse);
});

//RECUPERAR quantity

function recuperarQuantity() {
  let llave = [];
  let valor = [];
  let union =[];
  objeto = {};
  for (i = 0; i < localStorage.length ; i++) {
    llave[i] = localStorage.key(i); // se obtiene el nobre de cada llave

    //VALOR ES UN ARRAY QUE TENDRA DE TAMAÑAO NO UN ENTERO SINO LA CANTIDAD DE LLAVES ENCONTRADAS
    valor[llave[i]] = parseInt(sessionStorage.getItem(llave[i])); // se obtiene el valor de cada llave parsean a int
    //console.log(llave)
    console.log(valor)
    objeto = Object.assign({},valor)
    console.log(objeto)
    sessionStorage.setItem("CANTIDAD",JSON.stringify(objeto))
  }
}




// OBTIENE LOS PRODUCTOS AGREGADOS EN UNION Y LOS RENDERIZA EN LA LISTA
function obtenerAlmacenamiento() {
  let llave = [];
  let union = []
  let array =[]
  let nombreIndex = []
  let objeto ={}
  for (i = 0; i < localStorage.length; i++) {
    llave[i] = localStorage.key(i);
    $.ajax({
      url: "http://localhost:8085/api/auto/" + llave[i],
      type: "GET",
      dataType: "json",
      success: function (json) {
        union.push(json);
        mostrarOrdenProductos(union);

       nombreIndex[json.reference] = json
       objeto = Object.assign({},nombreIndex)
       sessionStorage.setItem("PRODUCTOS",JSON.stringify(objeto))
       
      },
    });
  }
  // OBTENER EL SALESMAN
  let identidad = parseInt(sessionStorage.getItem("ID"));
  $.ajax({
    url: "http://localhost:8085/api/user/" + identidad,
    type: "GET",
    dataType: "json",
    success: function (salesMan) {
      sessionStorage.setItem("SALESMAN", JSON.stringify(salesMan)); // salesMan
    },
  });
}

// QUITAR UN PRODUCTO DE LA ORDEN
on(document, "click", ".btnBorrarOrden", (e) => {
  const fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  console.log(id);
  alertify.confirm(
    "Desea eliminar del Carrito el producto seleccionado?",
    function () {
      localStorage.removeItem(id);
      alertify.success("Operacion completada!");
      retardar();
    },
    function () {
      alertify.error("Operacion cancelada.");
    }
  );
});

function admin(a) {
  obtenerUsuario(a);
}

// cerrar sesion del usuario
function cerrarSesion() {
  alertify.confirm(
    "Se terminara la sesion actual. Desea continuar?",
    function () {
      sessionStorage.removeItem("ROL");
      alertify.success("Vuelve pronto!");
      retardar();
    },
    function () {
      alertify.error("Operacion cancelada.");
    }
  );
}

//mostrar usuarios en el header
function obtenerUsuario(b) {
  $("#nombreUser").html(sessionStorage.getItem("NOMBRE"));
  $("#rolUser").html(sessionStorage.getItem("ROL"));
  $("#sesionRol").html(sessionStorage.getItem("ROL"));
  $("#sesionZona").html(sessionStorage.getItem("ZONA"));
  $("#sesionTel").html(sessionStorage.getItem("TELEFONO"));
  $("#sesionDir").html(sessionStorage.getItem("DIRECCION"));
  $("#sesionCorreo").html(sessionStorage.getItem("CORREO"));
  $("#sesionNombre").html(sessionStorage.getItem("NOMBRE"));
  let nombre = document.getElementById("NOMBRE");
}

// funcion para retardar el cargado de la pagina
function retardar() {
  function retrasarCarga() {
    location.reload();
  }
  setTimeout(retrasarCarga, 2000);
}
