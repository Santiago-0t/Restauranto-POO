import Producto from './Producto.js';
import { calcularTiempoHamburguesa } from '../metodos/hamburguesaMetodos.js';

// Clase Hamburguesa

export default class Hamburguesa extends Producto {
    #ingredientes;
    #tamaño;

    constructor(nombre, precio, tiempoPreparacion, ingredientes = [], tamaño = "Mediana") {
        super(nombre, precio, tiempoPreparacion);
        this.#ingredientes = [...ingredientes];
        this.#tamaño = tamaño;
    }


    get ingredientes() {
        return [...this.#ingredientes];
    }

    get tamaño() {
        return this.#tamaño;
    }


    set tamaño(nuevoTamaño) {
        const validosTamaños = ["Pequeña", "Mediana", "Grande"];
        if (!validosTamaños.includes(nuevoTamaño)) {
            throw new Error('Tamaño debe ser: Pequeña, Mediana o Grande');
        }
        this.#tamaño = nuevoTamaño;
    }

    calcularTiempoTotal(cantidad) {
        return calcularTiempoHamburguesa(this, cantidad);
    }

    agregarIngrediente(ingrediente) {
        if (!this.#ingredientes.includes(ingrediente)) {
            this.#ingredientes.push(ingrediente);
        }
    }

    mostrarDetalle() {
        return `${this.mostrarInfo()}\nIngredientes: ${this.#ingredientes.join(', ')}\nTamaño: ${this.#tamaño}`;
    }
}
