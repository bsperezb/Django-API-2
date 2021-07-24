// Definicion de variables
const url = "http://127.0.0.1:8000/api/modelviewset/"; //http://127.0.0.1:8000/api/modelviewset/

const contenedor = document.querySelector("tbody"); //este es el lugar donde interpolarmos los datos del cuerpo de la tabla;
let resultados = "";

const modalPersona = new bootstrap.Modal(
  document.getElementById("modalPersona")
); // referencia al modal por id
const formPersona = document.querySelector("form"); //referencia al unico formulario
// obtencion de los campos del cuerpo de la tabla
const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const sexo = document.getElementById("sexo");
const email = document.getElementById("email");
const comentario = document.getElementById("comentario");

let opcion = ""; // se va a usar a la hora de guardar

btnCrear.addEventListener("click", () => {
  //antes de abrir el modal, limpiamos los campos
  nombre.value = "";
  cedula.value = "";
  sexo.value = "";
  email.value = "";
  comentario.value = "";

  modalPersona.show();
  opcion = "crear";
});

// Funcion para mostrar lso resultados
const mostrar = (personas) => {
  personas.forEach((persona) => {
    resultados += `
					<tr>
						<td>${persona.nombre}</td>
						<td>${persona.cedula}</td>
						<td>${persona.sexo}</td>
						<td>${persona.email}</td>
						<td>${persona.comentario}</td>
						<td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a> </td>
					</tr>
					`;
  });
  contenedor.innerHTML = resultados;
};

// PROCEDIMIENTOS FETCH PARA EL CRUD
// Procedimiento mostrar
fetch(url)
  .then((response) => response.json())
  .then((data) => mostrar(data))
  .catch((error) => console.log(error));

// emualar metodo on de jquery----------------------------

const on = (element, event, selector, handler) => {
  // si en la pagina (element) se realiza click(event) sobre el botón(selector) ejecutar la fucnion(handler(e)
  //console.log(element)		//captura todo el elemneto, pagina
  //console.log(event);			//pasamos el evento clic
  //console.log(selector);		//nombre del botón
  //console.log(handler);		//funciones del usuario
  // target => referencia al elemento durante el evento(click enn este caso).. closet => devuelve el asendiente mas cercano al selector actual o el propio elemento actual, que coincide con el selctor proporcionado por parametros,( si no existe devuelve null)
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

//obtener token--------------------------------
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");
//--------------------------------------

on(document, "click", ".btnBorrar", (e) => {
  //console.log('BORRADO')
  // capturamos id del botón
  const fila = e.target.parentNode.parentNode;
  const cedula = fila.children[1].innerHTML; //elemento.childen[x] regresa el elemnto x .innerHTML regresa el texto de ese elmento
  //alertify ventana emergente de confirmacion.
  alertify.confirm("This is a confirm dialog.",
    function () {
      // agregar funcion si se confirma el borrado
      fetch(url+cedula, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": csrftoken,
		  "Content-Type": "application/json",
        },
      })
      //.then(res => res.json())
      .then( () => location.reload());
    },
    function () {
      alertify.error("Cancel");
    }
  )
});
