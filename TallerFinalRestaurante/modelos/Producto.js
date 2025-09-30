// Clase Producto

export default class Producto {
    #nombre;
    #precio;
    #tiempoPreparacion;

    constructor(nombre, precio, tiempoPreparacion) {
        this.nombre = nombre;
        this.precio = precio;
        this.tiempoPreparacion = tiempoPreparacion;
    }

    get nombre() {
        return this.#nombre;
    }

    get precio() {
        return this.#precio;
    }

    get tiempoPreparacion() {
        return this.#tiempoPreparacion;
    }

    set nombre(nuevoNombre) {
        if (!nuevoNombre || nuevoNombre.trim() === '') {
            throw new Error('El nombre no puede estar vacío');
        }
        this.#nombre = nuevoNombre.trim();
    }

    set precio(nuevoPrecio) {
        if (nuevoPrecio <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }
        this.#precio = nuevoPrecio;
    }

    set tiempoPreparacion(nuevoTiempo) {
        if (nuevoTiempo <= 0) {
            throw new Error('El tiempo debe ser mayor a 0');
        }
        this.#tiempoPreparacion = nuevoTiempo;
    }

    calcularTiempoTotal(cantidad) {
        return this.#tiempoPreparacion * cantidad;
    }

    mostrarInfo() {
        return `${this.#nombre} - $${this.#precio} - ${this.#tiempoPreparacion} min`;
    }
}
