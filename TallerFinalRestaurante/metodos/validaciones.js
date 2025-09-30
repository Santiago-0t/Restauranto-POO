export function validarMesa(numero) {
    if (!Number.isInteger(numero) || numero < 1 || numero > 4) {
        throw new Error('El número de mesa debe ser 1, 2, 3 o 4');
    }
}

export function validarCantidad(cantidad) {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new Error('La cantidad debe ser un número entero mayor a 0');
    }
}

export function validarPrecio(precio) {
    if (typeof precio !== 'number' || precio <= 0) {
        throw new Error('El precio debe ser un número mayor a 0');
    }
}

export function validarTiempo(tiempo) {
    if (typeof tiempo !== 'number' || tiempo <= 0) {
        throw new Error('El tiempo debe ser un número mayor a 0');
    }
}

export function validarNombreProducto(nombre) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        throw new Error('El nombre del producto no puede estar vacío');
    }
}

export function validarClaveAdmin(clave) {
    return clave === 'admin';
}
