import {
    eliminarEstudiante,
    cargarEstudiantes,
    guardarEstudiante,
    editarEstudiante,
    calcularPromedio,
} from "./funciones.js";

import Swal from "sweetalert2";

let estudianteEditar;
export { estudianteEditar };

const tablaBody = document.querySelector("#tableBody");

//Funcion para limpiar todo el tbody, que utilizaremos antes de hacerles los appendChild
function limpiarTabla() {
    while (tablaBody.firstChild) {
        tablaBody.removeChild(tablaBody.firstChild);
    }
}

//Función para mostrar el promedio guardado en localStorage
export function mostrarPromedio() {
    //Obteniendo la llave "promedio", que es donde esta guardado el promedio en el localStorage
    const promedioMostrado = JSON.parse(localStorage.getItem("promedio"));
    //Seleccionando la columna a la que queremos que muestre el promedio
    const columnaPromedio = document.querySelector("#columnaPromedio");

    //Dandole el textContent que tendrá el valor del promedio guardado en localStorage, al ser textContent
    //lo irá cambiando cada vez que se ejecute en caso de que el promedio cambie, asi que no hay necesidad de limpiar
    //el elemento
    columnaPromedio.textContent = promedioMostrado;
}

export function mostrarTabla(arrayEstudiantes = []) {
    //Limpiando el tbody antes de agregar todos los elementos
    limpiarTabla();
    //Por cada objeto con los datos del estudiante guardados en el array, ejecutará el siguiente bloque de instrucciones
    //en el que creara todo lo necesario para mostrar los datos en una tabla HTML
    arrayEstudiantes.forEach((estudiante) => {
        const fila = document.createElement("tr");

        //Creando las columnas de los datos de los estudiantes
        const columnaNombre = document.createElement("td");
        columnaNombre.textContent = estudiante.nombre;
        const columnaApellido = document.createElement("td");
        columnaApellido.textContent = estudiante.apellido;
        const columnaMatricula = document.createElement("td");
        columnaMatricula.textContent = estudiante.matricula;
        const columnaCurso = document.createElement("td");
        columnaCurso.textContent = estudiante.curso;
        const columnaNota = document.createElement("td");
        columnaNota.textContent = estudiante.nota;

        //Creando la columna editar, el elemento a, y el elemento strong para resaltarlo
        const columnaEditar = document.createElement("td");
        const linkEditar = document.createElement("a");
        linkEditar.href = "#";
        const etiquetaEditar = document.createElement("strong");
        etiquetaEditar.textContent = "Editar";
        etiquetaEditar.classList.add("text-info", "text-decoration-none");

        //Estructurando todo lo relacionado a la columna Editar
        linkEditar.appendChild(etiquetaEditar);
        linkEditar.onclick = () => {
            editarEstudiante(estudiante.id);
            //Iguala la variable declarada al id del estudiante, para posteriormente poder utilizarlo
            //para identificar exactamente el index del estudiante que editamos al presionar el boton en modo Edicion
            estudianteEditar = estudiante.id;
        };
        columnaEditar.appendChild(linkEditar);

        //Creando la columna eliminar, el elemento a
        const columnaEliminar = document.createElement("td");
        const linkEliminar = document.createElement("a");
        linkEliminar.href = "#";
        linkEliminar.textContent = "Eliminar";
        linkEliminar.classList.add("text-danger", "text-decoration-none");
        //Agregandole eventos a través de onclick, ya que addEvenetListener no funcionaría con elementos creados dinamicamente
        linkEliminar.onclick = (e) => {
            e.preventDefault();
            Swal.fire({
                title: "¿Estas seguro/a que deseas eliminar esta fila?",
                text: "AVISO: ¡No podrás recuperar la fila una vez eliminada!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#fff",
                cancelButtonColor: "#0DCAF0",
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarEstudiante(estudiante.id); //Eliminará al estudiante del array de estudiantes a través del .filter() y el id
                    guardarEstudiante(); //Convierte el array de estudiantes en string y lo guarda en localStorage
                    calcularPromedio(); //Calcula el promedio en base a las notas de los estudiantes almacenados
                    cargarEstudiantes(); //Carga los estudiantes en la tabla HTML tomando los datos del localStorage e igualandolos a nuestro array estudiantes
                    Swal.fire(
                        "¡Eliminada!",
                        "Tu fila ha sido eliminada con éxito",
                        "success"
                    );
                }
            });
        };

        //Estructurando todo lo relacionado a la columna Eliminar
        columnaEliminar.appendChild(linkEliminar);

        //Creando un array para introducir los elementos creados ahí y evitar la repetición de código
        const filaEstudiante = [
            columnaNombre,
            columnaApellido,
            columnaMatricula,
            columnaCurso,
            columnaNota,
            columnaEditar,
            columnaEliminar,
        ];

        //Por cada elemento en el array filaEstudiante lo agregaremos cada uno a una columna de la misma fila
        filaEstudiante.forEach((dato) => fila.appendChild(dato));
        //Agregando la fila ya llena con los elementos al tbody
        tablaBody.appendChild(fila);
    });
    //Mostrando el promedio en el tfooter al terminar la iteración, para que solo se muestre una vez
    //Al mostrar el promedio usando .textContent y no .innerHTML o .appendChild no es necesario limpiar previamente
    mostrarPromedio();
}
