import { crearMenuInicial, mostrarMenuFormateado, crearProducto, buscarProductoPorIndice } from '../metodos/menuMetodos.js';

export default class MenuService {
    #menu;

    constructor() {
        this.#menu = crearMenuInicial();
    }

    obtenerMenu() {
        return [...this.#menu];
    }

    mostrarMenuFormateado() {
        return mostrarMenuFormateado(this.#menu);
    }

    obtenerProducto(indice) {
        return buscarProductoPorIndice(this.#menu, indice);
    }

    agregarProducto(nombre, precio, tiempo, tipo = 'hamburguesa', extras = []) {
        const nuevoProducto = crearProducto(nombre, precio, tiempo, tipo, extras);
        this.#menu.push(nuevoProducto);
        return `Producto "${nombre}" agregado exitosamente`;
    }

    modificarProducto(indice, nuevoPrecio, nuevoTiempo) {
        const producto = this.obtenerProducto(indice);
        if (nuevoPrecio) producto.precio = nuevoPrecio;
        if (nuevoTiempo) producto.tiempoPreparacion = nuevoTiempo;
        return "Producto modificado exitosamente";
    }

    eliminarProducto(indice) {
        const producto = this.obtenerProducto(indice);
        const nombre = producto.nombre;
        this.#menu.splice(indice, 1);
        return `Producto "${nombre}" eliminado exitosamente`;
    }

    get cantidadProductos() {
        return this.#menu.length;
    }
}
