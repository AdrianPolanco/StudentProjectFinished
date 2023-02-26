import { Estudiante } from "./clase.js";
import { mostrarTabla, estudianteEditar } from "./tabla.js";

//Selecciona los elementos relevantes: INPUTS, FORMS Y SELECTOR
const inputs = document.querySelectorAll("#form-section input");
export { inputs };
const form = document.querySelector("form");
const selector = document.querySelector("select");
let checkObj;

let estudiantes = [];

export function cargarEstudiantes() {
    const estudiantesObtenidos = localStorage.getItem("estudiantes");
    const estudiantesCargados = JSON.parse(estudiantesObtenidos) || [];
    estudiantes = estudiantesCargados;
    mostrarTabla(estudiantes);
}

export function guardarEstudiante() {
    const estudiantesLocalStorage = JSON.stringify(estudiantes);
    localStorage.setItem("estudiantes", estudiantesLocalStorage);
}

export function eliminarEstudiante(id) {
    return (estudiantes = estudiantes.filter(
        (estudiante) => estudiante.id !== id
    ));
}

export function calcularPromedio() {
    let estudiantesPromedio = JSON.parse(localStorage.getItem("estudiantes"));
    let sumaPromedio = estudiantesPromedio.reduce(
        (total, item) => total + Number(item.nota),
        0
    );
    let promedioFinal = JSON.stringify(
        Math.round(sumaPromedio / estudiantesPromedio.length)
    );

    localStorage.setItem("promedio", promedioFinal);
}

export function editarEstudiante(id) {
    const botonEditar = document.querySelector(".btn");

    let arrayEditar = JSON.parse(localStorage.getItem("estudiantes"));

    let modificar = arrayEditar.find((estudiante) => estudiante.id === id);

    inputs[0].value = modificar.nombre;
    inputs[1].value = modificar.apellido;
    inputs[2].value = modificar.matricula;
    inputs[3].value = modificar.nota;
    selector.value = modificar.curso;

    botonEditar.textContent = "Editar";
    botonEditar.id = "editando";
}

export function cambiarEstudiante(estudianteEditado) {
    if (estudianteEditado !== "") {
        checkObj = {
            id: estudianteEditado,
            nombre: inputs[0].value,
            apellido: inputs[1].value,
            matricula: inputs[2].value,
            nota: inputs[3].value,
            curso: selector.value,
        };

        estudiantes = estudiantes.map((estudiante) =>
            estudiante.id !== checkObj.id ? estudiante : checkObj
        );

        guardarEstudiante();
        calcularPromedio();
        cargarEstudiantes();
    }
}

export function crearEstudiante() {
    //Crea un array con los valores de los inputs
    const inputsValues = [
        inputs[0].value,
        inputs[1].value,
        inputs[2].value,
        inputs[3].value,
        selector.value,
    ];

    //Valida si hay algún input o select vacío
    const check = inputsValues.some(
        (valor) => valor === "" || valor === "No-value" || valor === " "
    );

    //Si hay algún campo o select vacio, acabará la función y no agregará el estudiante al array
    if (check) {
        return;
    }

    //En caso de que el check devuelva false, procederá a crear la nueva clase de estudiante con los valores del input
    //y el select

    const nuevoEstudiante = new Estudiante(
        inputs[0].value,
        inputs[1].value,
        inputs[2].value,
        selector.value,
        Number(inputs[3].value)
    );

    //Agrega el nuevo estudiante al array de estudiantes y resetea el formulario
    estudiantes = [...estudiantes, nuevoEstudiante];

    guardarEstudiante();
    calcularPromedio();
    mostrarTabla(estudiantes);
}
