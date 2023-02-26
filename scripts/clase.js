class Estudiante {
    constructor(nombre, apellido, matricula, curso, nota) {
        this.id = Date.now();
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.curso = curso;
        this.nota = nota;
    }
}

export { Estudiante };
