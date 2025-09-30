import Producto from './Producto.js';

//! Clase Acompañante 

export default class Acompañante extends Producto {
    #salsasDisponibles;

    constructor(nombre, precio, tiempoPreparacion, salsasDisponibles = []) {
        super(nombre, precio, tiempoPreparacion);
        this.#salsasDisponibles = [...salsasDisponibles];
    }

    get salsasDisponibles() {
        return [...this.#salsasDisponibles];
    }

    agregarSalsa(salsa) {
        if (!this.#salsasDisponibles.includes(salsa)) {
            this.#salsasDisponibles.push(salsa);
        }
    }

    mostrarDetalle() {
        const salsas = this.#salsasDisponibles.length > 0 ? 
            `Salsas: ${this.#salsasDisponibles.join(', ')}` : 
            'Sin salsas';
        return `${this.mostrarInfo()}\n${salsas}`;
    }
}
