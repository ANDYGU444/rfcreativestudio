# RF Creative Studio · Sitio web

Sitio oficial de **RF Creative Studio**: sitios web, identidad de marca, publicidad digital y redes sociales.
*Ideas que conectan.*

## Estructura

```
rf-creative-studio/
├── index.html      ← todo el sitio: HTML, CSS y JavaScript en un solo archivo
├── favicon.svg     ← ícono de la pestaña del navegador
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

En el inicio, el logo cambia de estilo con cada toque (20 versiones) y vuelve al original después de la última.

- Cada versión es un `<span class="lv ...">` dentro de `#logo-stage`, con dos atributos:
  - `data-in`: clase de la animación de entrada (por ejemplo `i-draw`, `i-pixels` o `i-grow`).
  - `data-out`: clase de la animación de salida (por ejemplo `o-blur`, `o-drop` o `o-melt`).
- Para **agregar una versión**, se crea otro `<span class="lv" data-in="..." data-out="..." data-name="Nombre">` con su SVG. El orden en el HTML es el orden del recorrido.
- El aviso "Toca el logo" desaparece al primer toque y se reemplaza por la frase "Una marca, mil formas de contarla."
- Los IDs internos de los SVG de las versiones llevan el prefijo `x` (`xChr`, `xDots`, etc.) para no chocar entre sí.

## Animaciones y accesibilidad

- **Animaciones de scroll:** se activan con la clase `anim` en `<html>`, que pone el script. Usan `data-r` (`up`, `left`, `right`, `zoom`, `blur`, `tilt`, `flip`, `pop`, `wipe`, `rise`), `data-split` (títulos palabra por palabra) y `data-stagger` (entradas escalonadas).
- **Efectos de cursor:** la inclinación 3D, los botones magnéticos y la luz que sigue al cursor solo se activan en dispositivos con puntero fino (computadora).
- **Movimiento reducido:** si el usuario tiene activado `prefers-reduced-motion`, todo se muestra completo y sin animación.

## Formulario de contacto

No necesita servidor. Arma el texto con lo que escribe la persona y abre `https://wa.me/50662867675?text=...` con el mensaje listo para enviar.
