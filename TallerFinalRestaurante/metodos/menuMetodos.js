import Hamburguesa from '../modelos/Hamburguesa.js';
import Bebida from '../modelos/Bebida.js';
import Acompañante from '../modelos/Acompañante.js';

//! Métodos auxiliares para el manejo del menú
 
export function crearMenuInicial() {
    return [
        new Hamburguesa("Hamburguesa Clásica", 12000, 8, ["Carne", "Lechuga", "Tomate", "Queso"], "Mediana"),
        new Hamburguesa("Hamburguesa Doble", 18000, 12, ["Doble Carne", "Lechuga", "Tomate", "Queso", "Pepinillos"], "Grande"),
        new Hamburguesa("Hamburguesa BBQ", 15000, 10, ["Carne", "Salsa BBQ", "Cebolla", "Queso"], "Mediana"),

        new Bebida("Coca Cola", 3000, 2, "Mediano", "Fría"),
        new Bebida("Sprite", 3000, 2, "Mediano", "Fría"),
        new Bebida("Jugo de Naranja", 4000, 3, "Mediano", "Natural"),
        new Bebida("Agua", 2000, 1, "Mediano", "Natural"),
        new Bebida("Café", 2500, 3, "Pequeño", "Caliente"),

        new Acompañante("Papas Fritas", 5000, 6, ["Ketchup", "Mayonesa", "BBQ"]),
        new Acompañante("Aros de Cebolla", 6000, 8, ["Ranch", "BBQ"]),
        new Acompañante("Nuggets", 8000, 7, ["Ketchup", "BBQ", "Mostaza Miel"])
    ];
}

export function mostrarMenuFormateado(menu) {
    let texto = "\n=== MENÚ DEL RESTAURANTE ===\n";
    menu.forEach((producto, index) => {
        texto += `${index + 1}. ${producto.mostrarInfo()}\n`;
    });
    return texto;
}

export function crearProducto(nombre, precio, tiempo, tipo, extras = []) {
    switch(tipo.toLowerCase()) {
        case 'hamburguesa':
            return new Hamburguesa(nombre, precio, tiempo, extras, "Mediana");
        case 'bebida':
            return new Bebida(nombre, precio, tiempo, "Mediano", "Natural");
        case 'acompañante':
            return new Acompañante(nombre, precio, tiempo, extras);
        default:
            throw new Error('Tipo de producto no válido');
    }
}

export function buscarProductoPorIndice(menu, indice) {
    if (indice < 0 || indice >= menu.length) {
        throw new Error('Producto no encontrado');
    }
    return menu[indice];
}
