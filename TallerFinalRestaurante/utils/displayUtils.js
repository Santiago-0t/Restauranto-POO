export class DisplayUtils {
    /**
     * Limpiar pantalla
     */
    static limpiarPantalla() {
        console.clear();
    }

    /**
     * Mostrar el menú principal
     */
    static mostrarMenuPrincipal() {
        console.clear();
        console.log("\n" + "=".repeat(35));
        console.log("   🍽️  SISTEMA DE PEDIDOS  🍽️");
        console.log("=".repeat(35));
        console.log("1. Hacer un pedido");
        console.log("2. Ver estado de preparación");
        console.log("3. Pagar la cuenta");
        console.log("4. Modo administrador");
        console.log("5. Salir del sistema");
        console.log("=".repeat(35));
    }

    /**
     * Mostrar encabezado de sección
     */
    static mostrarEncabezado(titulo, longitud = 20) {
        console.log(`\n${titulo}`);
        console.log("-".repeat(longitud));
    }

    /**
     * Mostrar mensaje de bienvenida
     */
    static mostrarBienvenida() {
        console.log("\n🍽️ ¡BIENVENIDO AL SISTEMA DE PEDIDOS! 🍽️");
        console.log("Sistema universitario con utils separados - ES Modules\n");
    }

    /**
     * Mostrar mensaje de despedida
     */
    static mostrarDespedida() {
        console.log("\n👋 ¡Gracias por usar el sistema!");
    }

    /**
     * Mostrar confirmación de pedido
     */
    static mostrarConfirmacionPedido(resultado) {
        console.log("\n✅ PEDIDO REGISTRADO:");
        console.log(`Mesa: ${resultado.mesa}`);
        console.log(`Producto: ${resultado.producto}`);
        console.log(`Cantidad: ${resultado.cantidad}`);
        console.log(`Subtotal: $${resultado.subtotal}`);
        console.log(`Tiempo estimado: ${resultado.tiempoEstimado} min`);
    }

    /**
     * Mostrar estado de preparación
     */
    static mostrarEstadoPedidos(estadoMesas) {
        const hayPedidos = estadoMesas.some(mesa => mesa.cantidadPedidos > 0);

        if (!hayPedidos) {
            console.log("📋 No hay pedidos en preparación");
        } else {
            estadoMesas.forEach(mesa => {
                if (mesa.cantidadPedidos > 0) {
                    console.log(`\n📍 Mesa ${mesa.numero} - ${mesa.estado}`);
                    console.log(`   Pedidos: ${mesa.cantidadPedidos}`);
                    console.log(`   Total: $${mesa.totalCuenta}`);

                    mesa.pedidos.forEach((pedido, i) => {
                        console.log(`   ${i + 1}. ${pedido.producto} x${pedido.cantidad} - ${pedido.estado}`);
                        if (pedido.estado === "Preparando") {
                            console.log(`      ⏱️ ${pedido.tiempoRestante} min restantes`);
                        }
                    });
                }
            });
        }
    }

    /**
     * Mostrar detalle de cuenta
     */
    static mostrarDetalleCuenta(resultado) {
        console.log("\n🧾 DETALLE DE LA CUENTA:");
        console.log(resultado.detalle);
    }

    /**
     * Mostrar menú de administración
     */
    static mostrarMenuAdmin() {
        console.log("\n=== ADMINISTRACIÓN ===");
        console.log("1. Agregar producto");
        console.log("2. Modificar producto");
        console.log("3. Eliminar producto");
        console.log("4. Volver al menú principal");
    }
}
