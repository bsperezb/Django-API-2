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

//------------------lista desplegable sexo,--------------------------



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
//-------------evento del boton crear-------------------------

btnCrear.addEventListener("click", () => {
  //antes de abrir el modal, limpiamos los campos
  nombre.value = "";
  cedula.value = "";
  sexo.value = "";
  email.value = "";
  comentario.value = "";

  modalPersona.show();  // mostrar formulario modal
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

// emualar metodo on de jquery (oñade eventos a los elementos [e])----------------------------

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
//  Procendimineto Editar (arrojar elemento de la fila editar en el formulario)

let cedulaForm = 0
on(document, "click", ".btnEditar", (e) => {
  const fila = e.target.parentNode.parentNode
  cedulaForm = fila.children[1].innerHTML
  const nombreForm = fila.children[0].innerHTML
  const sexoForm = fila.children[2].innerHTML
  const emailForm = fila.children[3].innerHTML
  const comentarioForm = fila.children[4].innerHTML

  nombre.value = nombreForm
  cedula.value = cedulaForm
  sexo.value = sexoForm
  email.value = emailForm
  comentario.value = comentarioForm
  opcion = 'editar'
  modalPersona.show();  // mostrar formulario modal
})

formPersona.addEventListener('submit', (e) => {
  e.preventDefault() // si el venteo (en este caso submit) es cancelable, será cancelado.
  //----------------------------- Ecento crear-------------
  if(opcion == 'crear'){
    fetch(url,{
      method:"POST",
      headers: {
      "X-CSRFToken": csrftoken,
      //'Accept': 'application/json, text/plain, */*',
      "Content-Type": "application/json"
      //"Content-Type":"text/plain"

      },
      body: JSON.stringify({
        nombre:nombre.value,
        cedula:cedula.value,
        sexo:sexo.value,
        email:email.value,
        comentario:comentario.value
      })
    })
    
    .then(res => res.json() )
    .then(data => {
      const nuevaPersona = []
      nuevaPersona.push(data)
      mostrar(nuevaPersona)
    })
    .then( res => console.log('Success POST'))
  }
  //------------------------- evento Editar--------------
  if(opcion == 'editar'){
    // continua normal si es la misma cedula o key
    fetch(url+cedulaForm+'/',{
      method:"PUT",
      headers: {
      "X-CSRFToken": csrftoken,
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre:nombre.value,
        cedula:cedula.value,
        sexo:sexo.value,
        email:email.value,
        comentario:comentario.value
      })
    })
    .then(response => response.json() )
    .then(() => {
    //si se cambio la cedula que es la key 
    let newCedulaForm = cedula.value
    if(newCedulaForm != cedulaForm){
      fetch(url+cedulaForm, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": csrftoken,
		  "Content-Type": "application/json",
        },
      })
    .then(() => location.reload() )
    }
    })
  }
  modalPersona.hide()
})


