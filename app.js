import {
    crearEstudiante,
    cargarEstudiantes,
    cambiarEstudiante,
    inputs,
} from "./scripts/funciones.js";
import { estudianteEditar } from "./scripts/tabla.js";

const boton = document.querySelector(".btn");

document.addEventListener("DOMContentLoaded", function (e) {
    cargarEstudiantes();
});

boton.addEventListener("click", function (e) {
    //No permitirá ejecutar las funciones en el boton si la nota es mayor a 100 te arrojara una alerta y vaciara el input
    //de notas para que lo introduzcas nuevamente
    if (Number(inputs[3].value) > 100) {
        e.preventDefault();
        alert("No pueden existir notas mayores a 100");
        //Deja el input vacío
        inputs[3].value = "";
        return;
    }

    //Verifica si estamos publicando datos usando de referencia el id actual del boton, en este caso,
    // el boton esta en modo "Publicar", así que al presionarlo, si todo va bien, ejecutará las funciones propias de publicar
    if (e.target.id === "noEditando") {
        //Desactiva el comportamiento por default del boton para posteriormente poder vaciar todos los campos al presionar el boton
        e.preventDefault();
        //Crea el estudiante
        crearEstudiante();
        //Al terminar de ejecutar todo, recarga la pagina para limpiar el formulario correctamente,
        // los resultados y los datos no se perderan ya que estan guardados en localSotrage
        location.reload();
    }

    //Al presionar "Editar" en alguna de las filas de las tablas, el id del boton pasara a ser "editando"
    //y por tanto entrará en "Modo edición", ejecutando las funciones propias de este modo al presionarlo
    if (e.target.id === "editando") {
        e.preventDefault();
        cambiarEstudiante(estudianteEditar);
        boton.textContent = "Publicar";
        boton.id = "noEditando";
        location.reload();
    }
});
