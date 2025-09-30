// Clase Mesa

export default class Mesa {
    #numero;
    #pedidos;
    #ocupada;

    constructor(numero) {
        this.#numero = numero;
        this.#pedidos = [];
        this.#ocupada = false;
    }

    get numero() {
        return this.#numero;
    }

    get ocupada() {
        return this.#ocupada;
    }

    get pedidos() {
        return [...this.#pedidos];
    }

    get totalCuenta() {
        return this.#pedidos.reduce((total, pedido) => {
            return total + (pedido.producto.precio * pedido.cantidad);
        }, 0);
    }

    get cantidadPedidos() {
        return this.#pedidos.length;
    }

    get estadoMesa() {
        if (this.#pedidos.length === 0) {
            return "Libre";
        }

        const todosListos = this.#pedidos.every(pedido => pedido.estado === "Listo");
        return todosListos ? "Listo para pagar" : "Ocupada";
    }

    agregarPedido(producto, cantidad) {
        const pedido = {
            producto: producto,
            cantidad: cantidad,
            estado: "Preparando",
            tiempoRestante: producto.calcularTiempoTotal(cantidad)
        };

        this.#pedidos.push(pedido);
        this.#ocupada = true;
    }

    obtenerDetalleCuenta() {
        let detalle = `Mesa ${this.#numero}:\n`;
        detalle += "=".repeat(30) + "\n";

        this.#pedidos.forEach((pedido, index) => {
            const subtotal = pedido.producto.precio * pedido.cantidad;
            detalle += `${index + 1}. ${pedido.producto.nombre} x${pedido.cantidad} - $${subtotal}\n`;
        });

        detalle += "=".repeat(30) + "\n";
        detalle += `TOTAL: $${this.totalCuenta}`;
        return detalle;
    }

    limpiarMesa() {
        this.#pedidos = [];
        this.#ocupada = false;
    }
}
