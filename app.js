//Construimos la clase y una función para armonizar la introducción de los objetos dentro del array.
//Por la misma razón, utilizamos variables.
class TipoDeReparacion {
	constructor (id, nombre, precio, tipoDeLibro){
		this.id = parseInt(id)
		this.nombre = nombre
		this.precio = parseInt(precio)
		this.tipoDeLibro = tipoDeLibro
	}
}

function pushearArrayPrincipal (id, nombre, precio, tipoDeLibro){	
	opcionesDeReparacion.push(new TipoDeReparacion(id,  nombre, precio, tipoDeLibro))
}

const restauracion = "Restauración de portada: $"
const encolado = "Encolado de lomo: $"
const limpieza = "Limpieza: $"
const pegado = "Pegado de páginas: $"
const tarlatana = "Reemplazo de tarlatana: $"
const restauracionPaginas = "Restauración de páginas: $" 

const opcionesDeReparacion = []
pushearArrayPrincipal(1, restauracion, 600, "Rústica")
pushearArrayPrincipal(2, encolado, 1200, "Rústica")
pushearArrayPrincipal(3, limpieza, 300, "Rústica")
pushearArrayPrincipal(4, pegado, 2000, "Rústica")
pushearArrayPrincipal(5, restauracion, 2000, "Cartoné")
pushearArrayPrincipal(6, encolado, 5000, "Cartoné")
pushearArrayPrincipal(7, limpieza, 1500, "Cartoné")
pushearArrayPrincipal(8, pegado, 7000, "Cartoné")
pushearArrayPrincipal(9, restauracion, 15000, "Cuero")
pushearArrayPrincipal(10, tarlatana, 10000, "Cuero")
pushearArrayPrincipal(11, limpieza, 8000, "Cuero")
pushearArrayPrincipal(12, restauracionPaginas, 9000, "Cuero")

//Cargamos el listado al DOM
for (let i = 0; i < opcionesDeReparacion.length; i++) {
	if (opcionesDeReparacion[i].tipoDeLibro == "Rústica"){
		ulRustica.innerHTML += `<li class="list-group-item clarisimo"><button id="${opcionesDeReparacion[i].id}"
		class="botonDeScript"> ${opcionesDeReparacion[i].nombre + opcionesDeReparacion[i].precio}</button></li>`
	}
	else if (opcionesDeReparacion[i].tipoDeLibro == "Cartoné"){
		ulCartone.innerHTML += `<li class="list-group-item clarisimo"><button id="${opcionesDeReparacion[i].id}"
		class="botonDeScript"> ${opcionesDeReparacion[i].nombre + opcionesDeReparacion[i].precio}</button></li>`
	}
	else if (opcionesDeReparacion[i].tipoDeLibro == "Cuero"){
		ulCuero.innerHTML += `<li class="list-group-item clarisimo"><button id="${opcionesDeReparacion[i].id}"
		class="botonDeScript"> ${opcionesDeReparacion[i].nombre + opcionesDeReparacion[i].precio}</button></li>`
	}
}

//Definición de elementos y carga mediante Storage si es que está disponible
let carrito = JSON.parse(sessionStorage.getItem("Carrito"))
let precioFinal = JSON.parse(sessionStorage.getItem("Precio Final"))
if (carrito == null){
	carrito = []
	precioFinal = 0
}
else {
	listaCarrito.innerHTML = carrito.join("</br>")
	textoPrecioFinal.innerHTML = `Precio final: $${precioFinal}`
}

//Creamos una función que nos ahorrará repetir instrucciones cuando operemos sobre el DOM
function mirror() {
	listaCarrito.innerHTML = carrito.join("</br>")
	textoPrecioFinal.innerHTML = `Precio final: $${precioFinal}`
	sessionStorage.setItem("Carrito", JSON.stringify(carrito))
	sessionStorage.setItem("Precio Final", JSON.stringify(precioFinal))
}

//Agregamos funcionalidad a los botones en el paso anterior
for (const item of opcionesDeReparacion){
	let eventos = document.getElementById(item.id)
	eventos.addEventListener("click", function(){
		if (carrito.length < 12){
			carrito.push(item.nombre + item.precio)
			precioFinal += item.precio
			mirror()
			}
			else{
				alert("Lo sentimos, solo aceptamos hasta 12 productos."
				+ " Para compras mayoristas, por favor contáctenos a través de un correo electrónico")
			}
	})
}

//Botón para eliminar último en lista
botonEliminar.addEventListener("click", function(){
	if (carrito !=""){
		precioFinal = precioFinal - Number(carrito[carrito.length-1].match(/(\d+)/g))
		carrito.pop()
		mirror()
	}
})

//Botón para ordenar de menor a mayor
botonOrdenador.addEventListener("click", function(){
	carrito.sort((a, b) => (Number(a.match(/(\d+)/g)) - Number((b.match(/(\d+)/g)))))
	listaCarrito.innerHTML = carrito.join("</br>")
	sessionStorage.setItem("Carrito", JSON.stringify(carrito))
})

//Evitamos que el botón de enviar refresque la página cuando lo presionamos
let formulario = document.getElementById("contact-form")
formulario.addEventListener("submit", function(e){
	e.preventDefault ();
})

//Incluimos el localStorage en el botón de enviar para que recuerde los mails que el usuario ingresó
botonDeEnvio.addEventListener("click", function(){
	if (carrito != ""){
		let correo = localStorage.getItem("Correo");
		if (correo == null) {
			localStorage.setItem("Correo", prompt("Ingrese el correo electrónico al cual quiere que le mandemos la información"));
			correo = localStorage.getItem("Correo");
			alert("Hemos enviado la información a "+ correo);
			carrito = []
			precioFinal = 0
			mirror()
		}
		else {
			let cambio = prompt("Enviaremos el método de pago al  correo que usted ha registrado\n"
			+ correo + "\n¿Está de acuerdo o prefiere cambiar la dirección?\n\nPresione:\n"
			+ "1: Para enviar la información a ese correo \n" + "2: Para cambiar la dirección")
			while ( cambio != 1 && cambio != 2 ) {
				alert("Por favor, ingrese una opción válida");
				cambio = prompt("Enviaremos el método de pago al  correo que usted ha registrado\n"
				+ correo + "\n¿Está de acuerdo o prefiere cambiar la dirección?\n\nPresione:\n"
				+ "1: Para enviar la información a ese correo \n" + "2: Para cambiar la dirección");
			}
			if(cambio == 1){
				alert("Hemos enviado la información a " + correo);
				carrito = []
				precioFinal = 0
				mirror()
			}
			else if (cambio == 2){
				localStorage.setItem("Correo", prompt("Ingrese el correo electrónico al cual quiere que le mandemos la información"));
				correo = localStorage.getItem("Correo");
				alert("Hemos enviado la información a "+ correo);
				carrito = []
				precioFinal = 0
				mirror()

			}
		}
	}
	else{
		alert("Lo sentimos, parece que su carrito está vacío")
	}
})