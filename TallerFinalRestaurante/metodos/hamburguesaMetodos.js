export function calcularTiempoHamburguesa(hamburguesa, cantidad) {
    let tiempoBase = hamburguesa.tiempoPreparacion * cantidad;

    if (hamburguesa.tamaño === "Grande") {
        tiempoBase += 2 * cantidad;
    }

    if (hamburguesa.ingredientes.length > 4) {
        const ingredientesExtra = hamburguesa.ingredientes.length - 4;
        tiempoBase += ingredientesExtra * 0.5 * cantidad;
    }

    return tiempoBase;
}
