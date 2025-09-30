import Mesa from '../modelos/Mesa.js';
import MenuService from './MenuService.js';
import { validarMesa, validarCantidad, validarClaveAdmin } from '../metodos/validaciones.js';

export default class RestauranteService {
    #mesas;
    #menuService;

    constructor() {
        this.#mesas = [
            new Mesa(1),
            new Mesa(2),
            new Mesa(3),
            new Mesa(4)
        ];

        this.#menuService = new MenuService();
    }

    // ==================== MÉTODOS PÚBLICOS ====================

    hacerPedido(numeroMesa, indiceProducto, cantidad) {
        validarMesa(numeroMesa);
        validarCantidad(cantidad);

        const mesa = this.#buscarMesa(numeroMesa);
        const producto = this.#menuService.obtenerProducto(indiceProducto);

        mesa.agregarPedido(producto, cantidad);

        return {
            mesa: numeroMesa,
            producto: producto.nombre,
            cantidad: cantidad,
            subtotal: producto.precio * cantidad,
            tiempoEstimado: producto.calcularTiempoTotal(cantidad)
        };
    }

    obtenerEstadoMesas() {
        return this.#mesas.map(mesa => ({
            numero: mesa.numero,
            estado: mesa.estadoMesa,
            cantidadPedidos: mesa.cantidadPedidos,
            totalCuenta: mesa.totalCuenta,
            pedidos: mesa.pedidos.map(pedido => ({
                producto: pedido.producto.nombre,
                cantidad: pedido.cantidad,
                estado: pedido.estado,
                tiempoRestante: pedido.tiempoRestante
            }))
        }));
    }

    pagarCuenta(numeroMesa) {
        validarMesa(numeroMesa);
        const mesa = this.#buscarMesa(numeroMesa);

        if (mesa.cantidadPedidos === 0) {
            throw new Error('La mesa no tiene cuenta pendiente');
        }

        const detalleCuenta = mesa.obtenerDetalleCuenta();
        const total = mesa.totalCuenta;

        mesa.limpiarMesa();

        return {
            detalle: detalleCuenta,
            total: total,
            mensaje: `Mesa ${numeroMesa} liberada exitosamente`
        };
    }

    // ==================== MÉTODOS PARA ADMINISTRACIÓN ====================

    obtenerMenu() {
        return this.#menuService.mostrarMenuFormateado();
    }

    agregarProductoMenu(nombre, precio, tiempo, tipo = 'hamburguesa', extras = []) {
        return this.#menuService.agregarProducto(nombre, precio, tiempo, tipo, extras);
    }

    modificarProductoMenu(indice, nuevoPrecio, nuevoTiempo) {
        return this.#menuService.modificarProducto(indice, nuevoPrecio, nuevoTiempo);
    }

    eliminarProductoMenu(indice) {
        return this.#menuService.eliminarProducto(indice);
    }

    get cantidadProductosMenu() {
        return this.#menuService.cantidadProductos;
    }

    validarClaveAdmin(clave) {
        return validarClaveAdmin(clave);
    }

    // ==================== MÉTODOS PRIVADOS ====================

    #buscarMesa(numero) {
        return this.#mesas.find(mesa => mesa.numero === numero);
    }
}
