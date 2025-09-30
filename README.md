# 🍽️ Sistema de Pedidos

## 🎯 Características Principales

✅ **ES Modules** (`"type": "module"`)  
✅ **Utils separados** - Toda la UI fuera del archivo principal  
✅ **Métodos auxiliares** independientes  
✅ **4 Pilares de POO** completamente implementados  
✅ **Código súper limpio** y **altamente modular**  
✅ **index.js minimalista** - Solo 120 líneas  

## 🏗️ Arquitectura Ultra-Modular

```
Final Restaurante Utils/
├── package.json          # "type": "module"
├── index.js              # ¡Solo 120 líneas! Súper limpio
├── test.js               # Pruebas completas
│
├── modelos/              # Clases POO (5 archivos)
│   ├── Producto.js       # Clase base con encapsulación
│   ├── Hamburguesa.js    # Herencia + polimorfismo
│   ├── Bebida.js         # Herencia + polimorfismo
│   ├── Acompañante.js    # Herencia
│   └── Mesa.js           # Gestión de estado
│
├── servicios/            # Lógica de negocio (2 archivos)
│   ├── MenuService.js    # Gestión del menú
│   └── RestauranteService.js  # Servicio principal (abstracción)
│
├── metodos/              # Métodos auxiliares (4 archivos)
│   ├── hamburguesaMetodos.js  # Polimorfismo para hamburguesas
│   ├── bebidaMetodos.js       # Polimorfismo para bebidas
│   ├── validaciones.js        # Funciones de validación
│   └── menuMetodos.js         # Utilidades del menú
│
└── utils/                # Utilidades de UI (2 archivos)
    ├── consoleUtils.js   # Entrada/salida de consola
    └── adminUtils.js     # Lógica completa de administración
```

## 🚀 Instalación y Uso

### Prerrequisitos
- **Node.js** >= 16.0.0

### Ejecutar
```bash
cd "Final Restaurante Utils"
npm start        # o: node index.js
npm test         # o: node test.js
```

## 💡 Ventajas del Diseño con Utils

### **Antes (index.js extenso):**
```javascript
// index.js tenía 300+ líneas con:
- Toda la lógica de consola mezclada
- Funciones de administración largas
- Mensajes y validaciones inline
- Código repetitivo y difícil de mantener
```

### **Ahora (index.js ultra-limpio):**
```javascript
// index.js solo tiene 120 líneas:
import { ConsoleUtils, DisplayUtils } from './utils/consoleUtils.js';
import { AdminUtils } from './utils/adminUtils.js';

class SistemaRestaurante {
    async hacerPedido() {
        DisplayUtils.mostrarEncabezado("🍔 HACER PEDIDO");
        const mesa = await this.console.preguntarNumero("Mesa: ", 1, 4);
        // Súper limpio y legible
    }
}
```

### **Separación Perfecta:**
- **`index.js`** → Solo flujo principal (120 líneas)
- **`utils/consoleUtils.js`** → Toda la interacción con usuario
- **`utils/adminUtils.js`** → Toda la lógica de administración
- **`metodos/`** → Funciones auxiliares especializadas

## 📚 Implementación Completa de POO

### 1. 🔒 **Encapsulación**
```javascript
// En modelos/Producto.js
export default class Producto {
    #nombre;    // ✅ PRIVADA
    #precio;    // ✅ PRIVADA

    set precio(nuevoPrecio) {
        if (nuevoPrecio <= 0) {     // ✅ VALIDACIÓN
            throw new Error('El precio debe ser mayor a 0');
        }
        this.#precio = nuevoPrecio;
    }
}
```

### 2. 🧬 **Herencia**
```javascript
// En modelos/Hamburguesa.js
import Producto from './Producto.js';

export default class Hamburguesa extends Producto {
    constructor(nombre, precio, tiempo, ingredientes, tamaño) {
        super(nombre, precio, tiempo);  // ✅ HERENCIA
        this.#ingredientes = ingredientes;
    }
}
```

### 3. 🔄 **Polimorfismo**
```javascript
// Métodos separados en metodos/hamburguesaMetodos.js
export function calcularTiempoHamburguesa(hamburguesa, cantidad) {
    let tiempo = hamburguesa.tiempoPreparacion * cantidad;
    if (hamburguesa.tamaño === "Grande") tiempo += 2;  // ✅ ESPECÍFICO
    return tiempo;
}

// En metodos/bebidaMetodos.js
export function calcularTiempoBebida(bebida, cantidad) {
    let tiempo = bebida.tiempoPreparacion * cantidad;
    return Math.max(1, tiempo / 2);  // ✅ COMPORTAMIENTO DIFERENTE
}
```

### 4. 🎭 **Abstracción**
```javascript
// En servicios/RestauranteService.js
export default class RestauranteService {
    hacerPedido(mesa, producto, cantidad) {
        // ✅ INTERFAZ SIMPLE
        this.#validarMesa(mesa);         // Complejidad oculta
        this.#buscarMesa(mesa);          // Complejidad oculta
        // Usuario no ve los detalles internos
    }
}
```

## 🛠️ Utils Completamente Separados

### **ConsoleUtils** - Manejo de entrada
```javascript
export class ConsoleUtils {
    async preguntarNumero(mensaje, min, max) { /* Validación automática */ }
    async preguntarConfirmacion(mensaje) { /* s/n con validación */ }
    pausa() { /* Enter para continuar */ }
}
```

### **DisplayUtils** - Manejo de salida
```javascript
export class DisplayUtils {
    static mostrarMenuPrincipal() { /* Menú formateado */ }
    static mostrarConfirmacionPedido(resultado) { /* Pedido formateado */ }
    static mostrarEstadoPedidos(estado) { /* Estado formateado */ }
}
```

### **AdminUtils** - Administración completa
```javascript
export class AdminUtils {
    async validarAcceso() { /* Validar clave admin */ }
    async ejecutarModoAdmin() { /* Bucle completo de admin */ }
    async agregarProducto() { /* Funcionalidad completa */ }
    async modificarProducto() { /* Funcionalidad completa */ }
}
```

## 📋 Funcionalidades del Sistema

### Menú Principal
1. **Hacer un pedido** → Usa `ConsoleUtils` + `DisplayUtils`
2. **Ver estado** → Usa `DisplayUtils.mostrarEstadoPedidos()`
3. **Pagar cuenta** → Usa `DisplayUtils.mostrarDetalleCuenta()`
4. **Modo admin** → Usa `AdminUtils` completamente separado
5. **Salir** → Usa `DisplayUtils.mostrarDespedida()`

## 🧪 Pruebas Completas

```bash
node test.js
```

Verifica:
- ✅ Encapsulación con propiedades privadas
- ✅ Herencia con ES modules
- ✅ Polimorfismo con métodos separados
- ✅ Abstracción con servicios
- ✅ Utils funcionando correctamente
- ✅ ES Modules completos

## 🏆 Comparación de Versiones

| Aspecto | Versión Anterior | Versión con Utils |
|---------|------------------|-------------------|
| **index.js** | 300+ líneas | 120 líneas |
| **Separación UI** | ❌ Mezclada | ✅ Totalmente separada |
| **Reutilización** | ❌ Limitada | ✅ Utils reutilizables |
| **Mantenibilidad** | ⚠️ Media | ✅ Excelente |
| **Legibilidad** | ⚠️ Compleja | ✅ Súper clara |
| **Testing** | ⚠️ Difícil | ✅ Fácil |

## 💡 Beneficios para Estudiante

### **Académicamente:**
- 📖 **Demuestra dominio** de separación de responsabilidades
- 🎯 **Implementa POO** de forma clara y visible
- 📚 **Usa JavaScript moderno** (ES Modules)
- 🧪 **Fácil de probar** y verificar

### **Profesionalmente:**
- 🔧 **Código mantenible** - Cambios localizados
- 🔄 **Reutilizable** - Utils se pueden usar en otros proyectos  
- 📖 **Legible** - Cada archivo tiene propósito claro
- 🐛 **Debuggeable** - Errores fáciles de localizar

## 🎓 Perfecto para Proyecto Universitario

- ✅ **No parece sobre-ingenierizado** - Estructura lógica y necesaria
- ✅ **Fácil de explicar** - Cada carpeta tiene propósito claro
- ✅ **Cumple todos los requerimientos** - 4 pilares POO visibles
- ✅ **Demuestra buenas prácticas** - Sin ser pretencioso
- ✅ **Código limpio** - Fácil de revisar por profesor

---

**Sistema modular con utils separados - Demuestra dominio completo de POO y buenas prácticas**
