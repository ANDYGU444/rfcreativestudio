# RF Creative Studio · Sitio web

Sitio oficial de **RF Creative Studio**: sitios web, identidad de marca, publicidad digital y redes sociales.
*Ideas que conectan.*

## Estructura

```
rf-creative-studio/
├── index.html      ← todo el sitio: HTML, CSS y JavaScript en un solo archivo
├── favicon.svg     ← ícono de la pestaña del navegador
├── gl/
│   ├── engine.js   ← motor WebGL del logo: 24 estilos animados y transición "charco"
│   ├── N.webp      ← textura de cada estilo (1040×640, mismo encuadre para todos)
│   ├── ascii.png   ← atlas de caracteres del estilo Código ASCII
│   └── 28w.png     ← orden de escritura de la Manuscrita (16 bits en R/G, máscara en B)
├── logos/          ← versiones raster del logo usadas por el modo sin WebGL
├── marca/
│   ├── rf-logo-color.svg   ← logo original (vectorial)
│   ├── rf-logo-blanco.svg  ← una tinta, para fondos oscuros
│   └── rf-logo-negro.svg   ← una tinta, para fondos claros
└── README.md
```

No hay dependencias, `npm` ni paso de compilación. Lo único externo son las fuentes de Google Fonts (Montserrat y Mr Dafoe), que se cargan por `<link>`.

## Verlo en local

Abrir `index.html` en el navegador, o servirlo:

```bash
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

## Publicarlo con GitHub Pages

1. Crear el repositorio y subir los archivos:
   ```bash
   git init
   git add .
   git commit -m "Sitio de RF Creative Studio"
   git branch -M main
   git remote add origin https://github.com/USUARIO/rf-creative-studio.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.
3. En un par de minutos queda en `https://USUARIO.github.io/rf-creative-studio/`.
4. Dominio propio (opcional): agregarlo en **Settings → Pages → Custom domain** y configurar el DNS del proveedor.

## Dónde editar lo más común

| Qué | Dónde en `index.html` |
|---|---|
| Número de WhatsApp | Buscar `50662867675` (enlaces `wa.me`) y la constante `var NUM = "50662867675"` en el script. El número visible es `+506 6286-7675`. |
| Textos de servicios | Sección `id="servicios"` |
| **Proyectos BH y App Pecuaria** | Sección `id="proyectos"`. Los textos entre corchetes `[...]` (con borde punteado, clase `.todo`) son **pendientes de completar**. |
| Roles del equipo | Sección `id="nosotros"` |
| Preguntas frecuentes | Sección `id="preguntas"` (elementos `<details>`) |
| Colores de marca | Bloque `:root` al inicio del `<style>` |

## Cómo funciona el logo interactivo

En el inicio, cada toque cambia el logo al siguiente estilo. Hay **24 estilos animados** y, después del último, vuelve al original.

**Motor WebGL (`gl/engine.js`)**, que es el modo normal:
- Dibuja el logo en un `<canvas>` con shaders. Cada estilo tiene una animación propia **en reposo**: fuego que arde, vidrio que fluye, la pelotita de la Geométrica que rebota, la pluma de la Manuscrita, etc.
- Al tocar, corre la **transición "charco"** (unos 2,3 s): el estilo actual se derrite a su manera, cae a un charco que cambia de material y el estilo nuevo emerge de él.
- Orden del recorrido: el arreglo `ORDER` en `engine.js`. Los índices corresponden a `NAMES` y a los archivos `gl/N.webp`. Para retirar un estilo basta con quitar su número de `ORDER`, y su textura ya no se descarga.
- Se pausa solo cuando el logo no está en pantalla.
- **Un programa pequeño por estilo:** el shader `FS_QUAD` contiene los 24 estilos, pero no se compila entero. Por cada uso se compila una variante con `mode` y `SA` fijados como constantes, y el compilador descarta el código de los demás estilos. Esto evita el programa gigante, que en Windows (DirectX vía ANGLE) era muy pesado. Las variantes del siguiente estilo y de su transición se preparan de antemano, una por cuadro (`warmNext`).
- **Calidad automática:** mide la fluidez real. Si el equipo no alcanza unos 40 cuadros por segundo durante unos 2 segundos seguidos, baja un nivel (hay 4 niveles). Cada nivel reduce la resolución interna del canvas (100 %, 80 %, 65 % y 50 %), y desde el nivel 2 limita el reposo a 30 cuadros por segundo. Las transiciones siempre van a velocidad completa. El nivel se guarda en `sessionStorage` (`rfq`) durante la sesión. Para ver el nivel actual, ejecutar `__rfQ()` en la consola.

**Respaldo sin WebGL:** si el navegador no tiene WebGL2 o el usuario activó `prefers-reduced-motion`, el motor no arranca y se usa el recorrido CSS de `#logo-stage`. Ahí cada versión es un `<span class="lv" data-in="..." data-out="...">`.

- El aviso "Toca el logo" desaparece al primer toque y se reemplaza por la frase "Una marca, mil formas de contarla."

## Animaciones y accesibilidad

- **Animaciones de scroll:** se activan con la clase `anim` en `<html>`, que pone el script. Usan `data-r` (`up`, `left`, `right`, `zoom`, `blur`, `tilt`, `flip`, `pop`, `wipe`, `rise`), `data-split` (títulos palabra por palabra) y `data-stagger` (entradas escalonadas).
- **Efectos de cursor:** la inclinación 3D, los botones magnéticos y la luz que sigue al cursor solo se activan en dispositivos con puntero fino (computadora).
- **Movimiento reducido:** si el usuario tiene activado `prefers-reduced-motion`, todo se muestra completo y sin animación.

## Formulario de contacto

No necesita servidor. Arma el texto con lo que escribe la persona y abre `https://wa.me/50662867675?text=...` con el mensaje listo para enviar.
