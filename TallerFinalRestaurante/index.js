import RestauranteService from './servicios/RestauranteService.js';
import { ConsoleUtils } from './utils/consoleUtils.js';
import { AdminUtils } from './utils/adminUtils.js';
import { DisplayUtils } from './utils/displayUtils.js';

class SistemaRestaurante {
    constructor() {
        this.restaurante = new RestauranteService();
        this.console = new ConsoleUtils();
        this.admin = new AdminUtils(this.restaurante);
    }

    async ejecutar() {
        DisplayUtils.mostrarBienvenida();

        let continuar = true;
        while (continuar) {
            try {
                DisplayUtils.mostrarMenuPrincipal();
                const opcion = await this.console.preguntarNumero("Seleccione una opción: ", 1, 5);

                switch (opcion) {
                    case 1:
                        await this.hacerPedido();
                        break;
                    case 2:
                        await this.verEstadoPedidos();
                        break;
                    case 3:
                        await this.pagarCuenta();
                        break;
                    case 4:
                        if (await this.admin.validarAcceso()) {
                            await this.admin.ejecutarModoAdmin();
                        }
                        break;
                    case 5:
                        continuar = false;
                        DisplayUtils.mostrarDespedida();
                        break;
                }
            } catch (error) {
                console.log("\n❌ Error:", error.message);
                await this.console.pausa();
            }
        }

        this.console.cerrar();
        this.admin.cerrar();
    }

    async hacerPedido() {
        DisplayUtils.mostrarEncabezado("🍔 HACER UN PEDIDO");

        // Mostrar menú
        console.log(this.restaurante.obtenerMenu());

        // Obtener datos del pedido usando utils
        const mesa = await this.console.preguntarNumero("Número de mesa (1-4): ", 1, 4);
        const producto = await this.console.preguntarNumero(
            "Número del producto: ", 
            1, 
            this.restaurante.cantidadProductosMenu
        );
        const cantidad = await this.console.preguntarNumero("Cantidad: ", 1);

        // Registrar pedido usando el servicio
        const resultado = this.restaurante.hacerPedido(mesa, producto - 1, cantidad);

        // Mostrar confirmación usando utils
        DisplayUtils.mostrarConfirmacionPedido(resultado);
        await this.console.pausa();
    }

    async verEstadoPedidos() {
        DisplayUtils.mostrarEncabezado("👨‍🍳 ESTADO DE PREPARACIÓN");

        const estadoMesas = this.restaurante.obtenerEstadoMesas();
        DisplayUtils.mostrarEstadoPedidos(estadoMesas);

        await this.console.pausa();
    }

    async pagarCuenta() {
        DisplayUtils.mostrarEncabezado("💳 PAGAR LA CUENTA");

        const mesa = await this.console.preguntarNumero("Mesa a pagar (1-4): ", 1, 4);

        try {
            const resultado = this.restaurante.pagarCuenta(mesa);

            DisplayUtils.mostrarDetalleCuenta(resultado);

            const confirmar = await this.console.preguntarConfirmacion(
                `\n¿Confirma el pago de $${resultado.total}?`
            );

            if (confirmar) {
                console.log(`\n✅ ${resultado.mensaje}`);
            } else {
                console.log("\n❌ Pago cancelado");
            }
        } catch (error) {
            console.log(`\n❌ ${error.message}`);
        }

        await this.console.pausa();
    }
}

// Ejecutar la aplicación
const sistema = new SistemaRestaurante();
sistema.ejecutar().catch(console.error);
