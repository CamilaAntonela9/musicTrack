# Componente Web `<music-track>`

---

## Descripción

`<music-track>` es un Web Component personalizado para reproducir pistas de música con una interfaz atractiva y funcional. Está diseñado para integrarse fácilmente en cualquier proyecto web, proporcionando:

- Visualización de la portada del álbum con borde redondeado.  
- Muestra el título de la canción y el nombre del artista.  
- Control de reproducción con botón reproducir/pausar.  
- Barra de progreso dinámica que refleja el avance de la pista.  
- Ícono interactivo de corazón para marcar como favorito, que cambia visualmente al hacer clic.  
- Controles adicionales (aleatorio, repetir, más opciones) listos para extender funcionalidad.  
- Encapsulamiento de estilos y estructura con Shadow DOM para evitar conflictos con el entorno donde se inserta.

El componente está construido con tecnologías modernas de Web Components, utilizando el estándar de Custom Elements y Shadow DOM, y se apoya en el API nativa de audio HTML5 para manejar la reproducción.

---

## Atributos Personalizados

| Atributo  | Descripción                         | Tipo     | Valor por defecto          |
| --------- | ---------------------------------- | -------- | ------------------------- |
| `title`   | Título de la pista musical          | String   | `"Título desconocido"`     |
| `artist`  | Nombre del artista                  | String   | `"Artista desconocido"`    |
| `cover`   | URL o ruta de la imagen de portada | String   | `""` (sin imagen)          |
| `audio`   | URL o ruta del archivo de audio    | String   | `""` (sin audio)           |

El componente observa cambios en estos atributos y actualiza la interfaz automáticamente cuando son modificados.

---

## Funcionalidades

### Reproducción de audio

- El botón de reproducción cambia entre "▶ Reproducir" y "⏸ Pausar" según el estado.  
- La barra de progreso se actualiza en tiempo real durante la reproducción.  
- Al finalizar la pista, el componente resetea el botón y la barra de progreso.  

### Marcador de Favoritos

- El ícono de corazón alterna entre dos estados (no favorito/favorito) al hacer clic.  
- Cambia su apariencia de `fa-regular` a `fa-solid` y su color de blanco a verde (#1db954).  

### Controles adicionales

- Íconos para reproducción aleatoria, repetir pista y opciones extras están visibles pero sin funcionalidad por defecto.  
- Pueden ser extendidos con eventos personalizados para agregar comportamiento avanzado.

### Slot para contenido extra

- Permite insertar contenido adicional como texto, enlaces o imágenes dentro del componente, usando un slot named (ejemplo: `<p slot="extra">`).

---

## Estructura interna y estilos

El componente usa Shadow DOM para encapsular:

- Un header con texto estático "Componente Reproductor".  
- Contenedor de la portada con imagen y el ícono de favorito posicionado.  
- Elementos de texto para título y artista con estilos centrados y colores neutros.  
- Barra de controles con íconos de Font Awesome y efectos hover.  
- Barra de progreso con animación suave de avance.  
- Botón de reproducción estilizado con colores verdes y efectos hover.  
- Elemento `<audio>` oculto para gestionar la reproducción nativa.  

Los estilos están escritos en CSS moderno y cargan los íconos desde la CDN de Font Awesome 6.4.0.

---

## Ejemplo de Uso

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Demo Music Track</title>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />
  <style>
    body {
      margin: 0;
      background-color: #000;
      font-family: 'Segoe UI', Roboto, sans-serif;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      padding: 1rem;
    }
  </style>
</head>
<body>
  <music-track
    title="Buen Día Portación de Rostro"
    artist="Milo J"
    cover="/img/milo.jpg"
    audio="/img/Milo-Buen-Dia.mpeg"
  >
    <p slot="extra">Escúchalo ahora en tu plataforma favorita</p>
  </music-track>

  <script type="module" src="music-track.js"></script>
</body>
</html>
