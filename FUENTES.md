# Guía de Fuentes - HonlyCraft

## Fuentes Configuradas

### 1. Anton Regular
- **Archivo**: `/fonts/Anton-Regular.ttf`
- **Uso**: Títulos principales, logos
- **Clase CSS**: `font-regular` o `font-regular-custom`

### 2. Poppins Light
- **Archivo**: `/fonts/poppins.light.ttf`
- **Uso**: Texto normal, párrafos
- **Clase CSS**: `font-light` o `font-light-custom`

### 3. Poppins Bold ⚠️ FALTA
- **Archivo**: `/fonts/poppins.bold.ttf` (NO EXISTE)
- **Uso**: Texto destacado, botones, elementos importantes
- **Clase CSS**: `font-bold` o `font-bold-custom`

## Cómo Descargar Poppins Bold

1. Ve a [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
2. Selecciona "Bold" (700)
3. Descarga el archivo TTF
4. Renómbralo a `poppins.bold.ttf`
5. Colócalo en la carpeta `public/fonts/`

## Uso en el Código

```html
<!-- Títulos principales -->
<h1 class="font-regular text-4xl">HonlyCraft</h1>

<!-- Texto normal -->
<p class="font-light text-lg">Descripción del producto</p>

<!-- Texto destacado (cuando tengas la fuente Bold) -->
<button class="font-bold text-xl">Comprar Ahora</button>
```

## Clases de Tailwind Disponibles

- `font-regular` - Anton Regular
- `font-light` - Poppins Light  
- `font-bold` - Poppins Bold (cuando esté disponible)

## Clases CSS Personalizadas

- `.font-regular-custom` - Anton Regular
- `.font-light-custom` - Poppins Light
- `.font-bold-custom` - Poppins Bold (cuando esté disponible)
