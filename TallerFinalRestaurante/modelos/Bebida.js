import Producto from './Producto.js';
import { calcularTiempoBebida } from '../metodos/bebidaMetodos.js';

// Clase Bebida

export default class Bebida extends Producto {
    #tamaño;
    #temperatura;

    constructor(nombre, precio, tiempoPreparacion, tamaño = "Mediano", temperatura = "Fría") {
        super(nombre, precio, tiempoPreparacion);
        this.#tamaño = tamaño;
        this.#temperatura = temperatura;
    }

    get tamaño() {
        return this.#tamaño;
    }

    get temperatura() {
        return this.#temperatura;
    }

    // Setters con validación
    set tamaño(nuevoTamaño) {
        const validosTamaños = ["Pequeño", "Mediano", "Grande"];
        if (!validosTamaños.includes(nuevoTamaño)) {
            throw new Error('Tamaño debe ser: Pequeño, Mediano o Grande');
        }
        this.#tamaño = nuevoTamaño;
    }

    set temperatura(nuevaTemp) {
        const validasTemps = ["Fría", "Natural", "Caliente"];
        if (!validasTemps.includes(nuevaTemp)) {
            throw new Error('Temperatura debe ser: Fría, Natural o Caliente');
        }
        this.#temperatura = nuevaTemp;
    }

    calcularTiempoTotal(cantidad) {
        return calcularTiempoBebida(this, cantidad);
    }

    mostrarDetalle() {
        return `${this.mostrarInfo()}\nTamaño: ${this.#tamaño}\nTemperatura: ${this.#temperatura}`;
    }
}
