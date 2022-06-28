//Construimos la clase, un array y sus objetos
class TipoDeReparacion {
  constructor (id, nombre, precio, categoria){
    this.id = parseInt(id)
    this.nombre = nombre
    this.precio = parseInt(precio)
    this.categoria = categoria
  }
}

let opcionesDeReparacion = []
opcionesDeReparacion.push(new TipoDeReparacion(1, "Restauración de portada: $", 600, "Rústica"))
opcionesDeReparacion.push(new TipoDeReparacion(2, "Encolado de lomo: $", 1200, "Rústica"))
opcionesDeReparacion.push(new TipoDeReparacion(3, "Limpieza: $", 300, "Rústica"))
opcionesDeReparacion.push(new TipoDeReparacion(4, "Pegado de páginas: $", 2000, "Rústica"))
opcionesDeReparacion.push(new TipoDeReparacion(5, "Restauración de portada: $", 2000, "Cartoné"))
opcionesDeReparacion.push(new TipoDeReparacion(6, "Encolado de lomo: $", 5000, "Cartoné"))
opcionesDeReparacion.push(new TipoDeReparacion(7, "Limpieza: $", 1500, "Cartoné"))
opcionesDeReparacion.push(new TipoDeReparacion(8, "Pegado de páginas: $", 7000, "Cartoné"))
opcionesDeReparacion.push(new TipoDeReparacion(9, "Restauración de portada: $", 15000, "Cuero"))
opcionesDeReparacion.push(new TipoDeReparacion(10, "Reemplazo de tarlatana: $", 10000, "Cuero"))
opcionesDeReparacion.push(new TipoDeReparacion(11, "Limpieza: $", 8000, "Cuero"))
opcionesDeReparacion.push(new TipoDeReparacion(12, "Restauración de páginas: $", 9000, "Cuero"))

//Cargamos el listado al DOM
for (let i = 0; i < opcionesDeReparacion.length; i++) {
  if (opcionesDeReparacion[i].categoria == "Rústica"){
    ulRustica.innerHTML += `<li class="list-group-item clarisimo d-flex justify-content-between">
    ${opcionesDeReparacion[i].nombre + opcionesDeReparacion[i].precio}
    <button id="${opcionesDeReparacion[i].id}"class="botonEliminador crema"> + </button></li>`
  }
  else if (opcionesDeReparacion[i].categoria == "Cartoné"){
    ulCartone.innerHTML += `<li class="list-group-item clarisimo d-flex justify-content-between">
    ${opcionesDeReparacion[i].nombre + opcionesDeReparacion[i].precio}
    <button id="${opcionesDeReparacion[i].id}" class="botonEliminador crema"> + </button></li>`
  }
  else if (opcionesDeReparacion[i].categoria == "Cuero"){
    ulCuero.innerHTML += `<li class="list-group-item clarisimo d-flex justify-content-between">
    ${opcionesDeReparacion[i].nombre + opcionesDeReparacion[i].precio}
    <button id="${opcionesDeReparacion[i].id}" class="botonEliminador crema"> + </button></li>`
  }
}

//Creamos una función que recorra cada elemento del carrito para meterlo dentro del HTML. A su vez, mantiene actualizado
//el localStorage en función de los items que se encuentren en el carrito
function mirror () {
  let items = "";
  carrito.forEach((item, i) => {
    items += `<li class="d-flex justify-content-between"><p class="textoListaCarrito">${item.categoria} | ${item.nombre} ${item.precio}</p>
    <button class="botonEliminador crema"onclick="botonEliminador(${item.id},${item.precio})"> X </button></li>`;
  })
  if (carrito !=""){
    listaCarrito.innerHTML = items;
  }
  else{
    listaCarrito.innerHTML = carrito;
  }
  textoPrecioFinal.innerHTML = `Precio final: $${precioFinal}`;
  localStorage.setItem("Carrito", JSON.stringify(carrito));
  localStorage.setItem("Precio Final", JSON.stringify(precioFinal));}

//Definición de elementos y carga mediante localStorage si es que está disponible
let carrito = JSON.parse(localStorage.getItem("Carrito"));
let precioFinal = JSON.parse(localStorage.getItem("Precio Final"));
if (carrito == null) {
  carrito = [];
  precioFinal = 0;
}
else {
  mirror()
}

//Función para eliminar elementos del carrito de forma individual
const botonEliminador = (id, precio) => {
  let idx = carrito.findIndex(p => p.id==id);
  let resta = carrito.find(p=>p.precio==precio)
  let eliminarPorId = carrito.splice(idx,1);
  precioFinal = precioFinal - resta.precio
  mirror();
};

//Agregamos funcionalidad a los botones del listado, para que el usuario pueda agregar
//los productos que desee al carrito
for (const item of opcionesDeReparacion) {
  let eventos = document.getElementById(item.id);
  eventos.addEventListener("click", function () {
    if (carrito.length < 12) {
      carrito.push(item);
      precioFinal += item.precio;
      mirror();
    } else {
      alert(
        "Lo sentimos, solo aceptamos hasta 12 productos." +
          " Para compras mayoristas, por favor contáctenos a través de un correo electrónico"
      );
    }
  });
}

//Botón para vaciar el carrito
botonVaciador.addEventListener("click", function () {
  if (carrito != "") {
    carrito = []
    precioFinal = 0
    mirror()
  }
});

//Botón para ordenar de menor a mayor
botonOrdenador.addEventListener("click", function () {
  function comparar(a, b){
    if (a.precio < b.precio){
      return -1;
      if (a.precio>b.precio){
        return 1;
      }
      return 0
    }
  }
  carrito.sort(comparar)
  mirror()
});

//Evitamos que el botón de enviar refresque la página cuando lo presionamos
let formulario = document.getElementById("contact-form");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
});

//Incluimos el localStorage en el botón de enviar para que recuerde los mails que el usuario ingresó
botonDeEnvio.addEventListener("click", function () {
  if (carrito != "") {
    let correo = localStorage.getItem("Correo");
    if (correo == null) {
      localStorage.setItem(
        "Correo",
        prompt(
          "Ingrese el correo electrónico al cual quiere que le mandemos la información"
        )
      );
      correo = localStorage.getItem("Correo");
      alert("Hemos enviado la información a " + correo);
      carrito = [];
      precioFinal = 0;
      mirror();
    } else {
      let cambio = prompt(
        "Enviaremos el método de pago al  correo que usted ha registrado\n" +
          correo +
          "\n¿Está de acuerdo o prefiere cambiar la dirección?\n\nPresione:\n" +
          "1: Para enviar la información a ese correo \n" +
          "2: Para cambiar la dirección"
      );
      while (cambio != 1 && cambio != 2) {
        alert("Por favor, ingrese una opción válida");
        cambio = prompt(
          "Enviaremos el método de pago al  correo que usted ha registrado\n" +
            correo +
            "\n¿Está de acuerdo o prefiere cambiar la dirección?\n\nPresione:\n" +
            "1: Para enviar la información a ese correo \n" +
            "2: Para cambiar la dirección"
        );
      }
      if (cambio == 1) {
        alert("Hemos enviado la información a " + correo);
        carrito = [];
        precioFinal = 0;
        mirror();
      } else if (cambio == 2) {
        localStorage.setItem(
          "Correo",
          prompt(
            "Ingrese el correo electrónico al cual quiere que le mandemos la información"
          )
        );
        correo = localStorage.getItem("Correo");
        alert("Hemos enviado la información a " + correo);
        carrito = [];
        precioFinal = 0;
        mirror();
      }
    }
  } else {
    alert("Lo sentimos, parece que su carrito está vacío");
  }
});
