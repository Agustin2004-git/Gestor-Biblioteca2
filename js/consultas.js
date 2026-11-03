// Hito 2 · Consultas
//
// Al menos 6 funciones:
//   - filtrar por un criterio
//   - buscar por id
//   - ordenar por dos criterios
//   - comprobar una condición (some o every)
//   - totalizar con reduce
//   - obtener una lista sin repetidos
// Ninguna modifica las listas originales.
// Para leer un dato de una fila, usa tus constantes: libro[L_TITULO], no libro[1].
//

//1.Funcion que convierte un importe de texto en numero
/**
 * Convierte un texto con coma decimal ("2,50") en número.
 * @param {string|number} texto  Valor a convertir
 * @returns {number} El valor como número
 * @throws {Error} Si el valor no es un número válido
 */
function Numero(texto) {
    const limpio = String(texto).trim().replace(",", ".");
    const numero = Number(limpio);
    if (limpio === "" || Number.isNaN(numero)) {
        throw new Error("Importe no válido");
    }
    return numero;
}

//2.Funcion que reciba un id y devuelva una fila o una columna
/**
 * Busca un libro por su id.
 * @param {number} id  Id del libro buscado
 * @returns {Array|undefined} La fila del libro, o undefined si no existe
 */
function buscarPorId(id) {
    return libros.find((libro) => libro[Libro_id] === id);
}

//3.filtrar por un criterio
/**
 * Devuelve los libros de un género.
 * @param {string} genero  Género buscado
 * @returns {Array[]} Libros de ese género
 */
function librosDeGenero(genero) {
    return libros.filter((libro) => libro[Libro_genero] === genero);
}


//4.Funcion que ordena por dos criterios que en este caso va a ser por la primera letra y el año
/**
 * Devuelve los libros ordenados por año y, si empatan, por título.
 * No modifica la lista original (trabaja sobre una copia).
 * @returns {Array[]} Copia ordenada de los libros
 */
function librosOrdenados() {
    return [...libros].sort(
        (a, b) => a[Libro_anio] - b[Libro_anio] || a[Libro_titulo].localeCompare(b[Libro_titulo])
    );
}

//5.compruebo la condicion con some y la funcion comprueba si hay algun libro anterior al año
/**
 * Comprueba si hay algún libro anterior a un año.
 * @param {number} anio  Año límite
 * @returns {boolean} true si al menos un libro es anterior a ese año
 */
function LibroAnterior(anio) {
    return libros.some((libro) => libro[Libro_anio] < anio);
}

//6.Totalizar con reduce esta funcion me va asumar las fianzas de los libros prestados
/**
 * Suma las fianzas de los libros prestados (préstamos sin devolver).
 * @returns {number} Total de fianzas, redondeado a 2 decimales
 */
function totalFianzasPrestados() {
    const total = prestamos.reduce((suma, prestamo) => {
        if (prestamo[Prestamo_devuelto] === false) {
            const libro = buscarPorId(prestamo[Prestamo_libro_id]);
            if (libro !== undefined) {
                return suma + Numero(libro[Libro_fianza]);
            }
        }
        return suma;
    }, 0);
    return Math.round(total * 100) / 100;
}

//7.Obtener una lista sin repetidos esta funcion me va a devolver los autores sin repetir, ordenados y sin vacios
/**
 * @returns {string[]} Autores únicos ordenados alfabéticamente
 */
function autoresUnicos() {
    const autores = [];
    for (let i = 0; i < libros.length; i++) {
        const autor = libros[i][Libro_autor];
        if (autor && !autores.includes(autor)) {
            autores.push(autor);
        }
    }
    return autores.sort((a, b) => a.localeCompare(b));
}









