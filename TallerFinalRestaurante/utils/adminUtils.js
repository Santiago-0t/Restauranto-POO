import { ConsoleUtils } from './consoleUtils.js';
import { DisplayUtils } from './displayUtils.js';

export class AdminUtils {
    constructor(restaurante) {
        this.restaurante = restaurante;
        this.console = new ConsoleUtils();
    }

    /**
     * Validar clave de administrador
     */
    async validarAcceso() {
        DisplayUtils.mostrarEncabezado("🔐 MODO ADMINISTRADOR");

        const clave = await this.console.pregunta("Ingrese la clave: ");

        if (!this.restaurante.validarClaveAdmin(clave)) {
            console.log("❌ Clave incorrecta");
            await this.console.pausa();
            return false;
        }

        return true;
    }

    /**
     * Ejecutar bucle de administración
     */
    async ejecutarModoAdmin() {
        let continuarAdmin = true;

        while (continuarAdmin) {
            DisplayUtils.mostrarMenuAdmin();
            const opcion = await this.console.preguntarNumero("Opción: ", 1, 4);

            try {
                switch (opcion) {
                    case 1:
                        await this.agregarProducto();
                        break;
                    case 2:
                        await this.modificarProducto();
                        break;
                    case 3:
                        await this.eliminarProducto();
                        break;
                    case 4:
                        continuarAdmin = false;
                        break;
                }
            } catch (error) {
                console.log("❌ Error:", error.message);
                await this.console.pausa();
            }
        }
    }

    /**
     * Agregar nuevo producto
     */
    async agregarProducto() {
        DisplayUtils.mostrarEncabezado("➕ AGREGAR PRODUCTO");

        const nombre = await this.console.pregunta("Nombre: ");
        const precio = parseFloat(await this.console.pregunta("Precio: $"));
        const tiempo = parseInt(await this.console.pregunta("Tiempo (min): "));

        console.log("Tipos disponibles: hamburguesa, bebida, acompañante");
        const tipo = await this.console.pregunta("Tipo: ");

        const mensaje = this.restaurante.agregarProductoMenu(nombre, precio, tiempo, tipo);
        console.log(`\n✅ ${mensaje}`);
        await this.console.pausa();
    }

    /**
     * Modificar producto existente
     */
    async modificarProducto() {
        DisplayUtils.mostrarEncabezado("✏️ MODIFICAR PRODUCTO");
        console.log(this.restaurante.obtenerMenu());

        const indice = await this.console.preguntarNumero(
            "Producto a modificar: ", 
            1, 
            this.restaurante.cantidadProductosMenu
        );

        const precioStr = await this.console.pregunta("Nuevo precio (Enter para mantener): ");
        const tiempoStr = await this.console.pregunta("Nuevo tiempo (Enter para mantener): ");

        const precio = precioStr ? parseFloat(precioStr) : null;
        const tiempo = tiempoStr ? parseInt(tiempoStr) : null;

        const mensaje = this.restaurante.modificarProductoMenu(indice - 1, precio, tiempo);
        console.log(`\n✅ ${mensaje}`);
        await this.console.pausa();
    }

    /**
     * Eliminar producto
     */
    async eliminarProducto() {
        DisplayUtils.mostrarEncabezado("🗑️ ELIMINAR PRODUCTO");
        console.log(this.restaurante.obtenerMenu());

        const indice = await this.console.preguntarNumero(
            "Producto a eliminar: ", 
            1, 
            this.restaurante.cantidadProductosMenu
        );

        const confirmar = await this.console.preguntarConfirmacion("¿Está seguro?");

        if (confirmar) {
            const mensaje = this.restaurante.eliminarProductoMenu(indice - 1);
            console.log(`\n✅ ${mensaje}`);
        } else {
            console.log("\n❌ Eliminación cancelada");
        }

        await this.console.pausa();
    }

    /**
     * Cerrar utilidades de consola
     */
    cerrar() {
        this.console.cerrar();
    }
}
