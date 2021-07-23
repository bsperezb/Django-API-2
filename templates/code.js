// Definicion de variables
const url = "http://127.0.0.1:8000/api/modelviewset/"; //http://127.0.0.1:8000/api/modelviewset/

const contenedor = document.querySelector('tbody');	//este es el lugar donde interpolarmos los datos del cuerpo de la tabla;
let resultados = '';

const modalPersona = new bootstrap.Modal(document.getElementById('modalPersona')) // referencia al modal por id
const formPersona = document.querySelector('form');	//referencia al unico formulario
// obtencion de los campos del cuerpo de la tabla
const nombre = document.getElementById('nombre');
const cedula = document.getElementById('cedula');
const sexo = document.getElementById('sexo');
const email = document.getElementById('email');
const comentario = document.getElementById('comentario');

let opcion = ''; // se va a usar a la hora de guardar

btnCrear.addEventListener('click', ()=>{
	//antes de abrir el modal, limpiamos los campos
	nombre.value = ''
	cedula.value = ''
	sexo.value = ''
	email.value = ''
	comentario.value = ''

	modalPersona.show()
	opcion = 'crear'
})

// Funcion para mostrar lso resultados
const mostrar = (personas) => {
	personas.forEach(persona => {
	resultados +=`
					<tr>
						<td>${persona.nombre}</td>
						<td>${persona.cedula}</td>
						<td>${persona.sexo}</td>
						<td>${persona.mail}</td>
						<td>${persona.comentario}</td>
						<td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a> </td>
					</tr>
					`
	});
	resultados.innerHTML = resultados
}

// Procedimiento mostrar
fetch(url)
	.then(response => response.json)
	.then( data => mostrar(data))
	.catch( error => console.log(error))
