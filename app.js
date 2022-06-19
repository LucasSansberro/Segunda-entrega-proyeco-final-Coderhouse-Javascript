//Construimos la clase y sus objetos
class TipoDeReparacion {
	constructor (portada, lomo, limpieza, pegado){
		this.portada = portada;
		this.lomo = lomo;
		this.limpieza = limpieza;
		this.pegado = pegado;
	}
}

const rusticaObjeto = new TipoDeReparacion (
	{nombre: "Restauración de portada $" , precio: 600},
	{nombre: "Encolado de lomo $" , precio: 1200},
	{nombre: "Limpieza $" , precio: 300},
	{nombre: "Pegado de páginas $" , precio: 2000})

const cartoneObjeto = new TipoDeReparacion (
	{nombre: "Restauración de portada $" , precio: 2000},
	{nombre: "Encolado de lomo $" , precio: 5000},
	{nombre: "Limpieza $" , precio: 1500},
	{nombre: "Pegado de páginas $" , precio: 7000})

const cueroObjeto = new TipoDeReparacion (
	{nombre: "Restauración de portada $" , precio: 15000},
	{nombre: "Reemplazo de tarlatana $" , precio: 10000},
	{nombre: "Limpieza $" , precio: 8000},
	{nombre: "Restauración de páginas $" , precio: 9000})

//Colocamos los datos de los objetos dentro de arrays para facilitar su manipulación en el DOM. De esta
//manera combinamos la facilidad que tienen los objetos para acciones tales como cambiar el precio mediante método
//mientras a su vez mantenemos las funciones del DOM simples, sin tener que manipular propiedades de objeto en ellas
function arrayzador (array, objeto){
	array.push(objeto.portada.nombre + objeto.portada.precio)
	array.push(objeto.lomo.nombre + objeto.lomo.precio)
	array.push(objeto.limpieza.nombre + objeto.limpieza.precio)
	array.push(objeto.pegado.nombre + objeto.pegado.precio)
}
const rustica = [] ; arrayzador(rustica, rusticaObjeto)
const cartone = [] ; arrayzador(cartone, cartoneObjeto)
const cuero = [] ; arrayzador(cuero, cueroObjeto)

let carrito =[]
let precioFinal = 0

//Agregamos las listas de precios al DOM
function liPrecios (array, ul){
	for (const item of array){
		ul.innerHTML += `<li class="list-group-item clarisimo"><button id="${item}" class="botonDeScript"> ${item}</button></li>`
	}}
liPrecios(rustica, ulRustica) ; liPrecios(cartone, ulCartone) ; liPrecios(cuero, ulCuero)

//Agregamos un evento a los botones para que reaccionen al click
function botonAddCarrito (eleccion) {
	for (const item of eleccion){
		let eventos = document.getElementById(item)
		eventos.addEventListener("click", function(){
			if (carrito.length < 12){
				carrito.push(item)
				listaCarrito.innerHTML = carrito.join("</br>")
				precioFinal = precioFinal + Number(item.match(/(\d+)/g))
				textoPrecioFinal.innerHTML = `Precio final: $${precioFinal}`
			}
			else{
				alert("Lo sentimos, solo aceptamos hasta 12 productos. Para compras mayoristas, por favor contáctenos a través de un correo electrónico")
			}
		})
	}
}
botonAddCarrito(rustica) ; botonAddCarrito(cartone) ; botonAddCarrito(cuero)

//Botón para eliminar último en lista
botonEliminar.addEventListener("click", function(){
	if (carrito !="")
	precioFinal = precioFinal - Number(carrito[carrito.length-1].match(/(\d+)/g))
	carrito.pop()
	listaCarrito.innerHTML = carrito.join("</br>")
	textoPrecioFinal.innerHTML = `Precio final: $${precioFinal}`
	})

//Botón para ordenar de menor a mayor
botonOrdenador.addEventListener("click", function(){
	carrito.sort((a, b) => (Number(a.match(/(\d+)/g)) - Number((b.match(/(\d+)/g)))))
	listaCarrito.innerHTML = carrito.join("</br>")
	})

