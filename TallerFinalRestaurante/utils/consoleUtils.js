import { createInterface } from 'readline';

export class ConsoleUtils {
    constructor() {
        this.rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    /**
     * Hacer una pregunta simple
     */
    pregunta(mensaje) {
        return new Promise((resolve) => {
            this.rl.question(mensaje, resolve);
        });
    }

    /**
     * Preguntar un número con validación de rango
     */
    async preguntarNumero(mensaje, min, max) {
        while (true) {
            const respuesta = await this.pregunta(mensaje);
            const numero = parseInt(respuesta);

            if (isNaN(numero)) {
                console.log("❌ Debe ser un número");
                continue;
            }

            if (numero < min || numero > max) {
                console.log(`❌ Debe estar entre ${min} y ${max}`);
                continue;
            }

            return numero;
        }
    }

    /**
     * Preguntar confirmación (s/n)
     */
    async preguntarConfirmacion(mensaje) {
        while (true) {
            const respuesta = await this.pregunta(`${mensaje} (s/n): `);
            const resp = respuesta.toLowerCase().trim();

            if (resp === 's' || resp === 'si') return true;
            if (resp === 'n' || resp === 'no') return false;

            console.log("❌ Responda 's' o 'n'");
        }
    }

    /**
     * Pausa para continuar
     */
    pausa() {
        return this.pregunta("\nPresione Enter para continuar...");
    }

    /**
     * Cerrar interfaz de readline
     */
    cerrar() {
        this.rl.close();
    }
}