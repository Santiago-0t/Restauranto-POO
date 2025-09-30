export function calcularTiempoBebida(bebida, cantidad) {
    let tiempoBase = bebida.tiempoPreparacion * cantidad;

    tiempoBase = Math.max(1, tiempoBase / 2);

    if (bebida.temperatura === "Caliente") {
        tiempoBase += 2;
    }

    return tiempoBase;
}
