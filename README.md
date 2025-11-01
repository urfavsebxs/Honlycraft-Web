# HonlyCraft Web ✨

![HonlyCraft](public/logo.png)

Una web moderna para el servidor de Minecraft **HonlyCraft** — construida con Astro, React y MongoDB. Este repositorio contiene la web pública, el panel de administración y APIs para estadísticas y skins de jugadores.

---

## 🚀 Destacado

- 🎮 Tienda integrada (rangos, llaves, protecciones)
- 🛒 Carrito y sistema de descuentos
- 🧑‍💼 Panel de administración para gestionar productos y promociones
- 🔐 Autenticación con roles (admin / moderator / user)
- 📊 Dashboard de jugadores con estadísticas y render de skins
- 🌐 Integración con la API de Mojang para UUIDs y datos de jugadores
- 📱 Diseño responsivo con Tailwind CSS

---

## 🧰 Tecnologías

- Frontend: **Astro 5.x**, **React 19.x**, **Tailwind CSS 4.x**
- Backend: **Node.js**, **Express**
- Base de datos: **MongoDB** + **Mongoose**
- Autenticación: **JWT**, **bcryptjs**
- Tests / scripts: Node.js scripts para seed y utilidades

---

## � Requisitos previos

- Node.js 18+
- MongoDB (local o Atlas)
- pnpm (recomendado) o npm

---

## ⚙️ Instalación rápida

Clona el repositorio e instala dependencias:

```bash
git clone <url-del-repositorio>
cd Honlycraft-Web
pnpm install    # o `npm install`
```

Crear un archivo `.env` en la raíz con las variables mínimas:

```env
MONGODB_URI=mongodb://localhost:27017/honlycraft
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
PORT=3000
```

Opcional: poblar datos de ejemplo

```bash
node seed.js
# Usuarios de ejemplo: admin/admin123, moderator/mod123, user/user123
```

---

## ▶️ Ejecutar en desarrollo

```bash
pnpm dev
# o
npm run dev
```

La web por defecto estará disponible en `http://localhost:4321` (según la configuración de Astro en el proyecto).

### Producción (build & preview)

```bash
pnpm build
pnpm preview
# o
npm run build
npm run preview
```

---

## 📁 Estructura principal

Foco en las carpetas más relevantes del proyecto:

```
src/
├─ components/       # Componentes React (Login, Store, Admin...)
├─ layouts/          # Layouts de Astro
├─ lib/              # Conexión MongoDB y utilidades
├─ models/           # Modelos Mongoose (User, Player, Stats)
├─ pages/            # Páginas y API routes
│  ├─ api/
│  │  ├─ auth/       # login, logout
│  │  ├─ player.js
│  │  └─ stats.js
├─ sections/         # Secciones reutilizables (Header, Footer...)
└─ utils/            # auth.js, middleware, minecraftAPI.js
```

---

## 🔐 Autenticación & Roles

Se implementan roles para controlar accesos en el frontend y API:

- `admin` — acceso completo al panel de administración
- `moderator` — acceso a herramientas de moderación
- `user` — acceso estándar

Endpoints principales:

- `POST /api/auth/login`  — iniciar sesión (devuelve JWT)
- `POST /api/auth/logout` — cerrar sesión

---

## 🛒 Tienda

- Productos: rangos, llaves, protecciones
- Carrito con persistencia de sesión
- Sistema de descuentos y precios dinámicos
- Panel admin para crear/editar productos y cupones

---

## 🎮 Minecraft: Skins & Stats

- Se consulta la API de Mojang para obtener UUIDs y metadata
- Render de skins (componentes específicos para mostrar skins)
- Estadísticas: kills, deaths, wins — almacenadas en MongoDB

---

## 🐛 Solución de problemas (rápido)

- Error de conexión a MongoDB:
  - Asegúrate que `MONGODB_URI` en `.env` sea correcta y que Mongo esté corriendo.
- Error de JWT:
  - Comprueba `JWT_SECRET` en `.env`.
- Problemas con la API de Mojang:
  - La API puede limitar por rate; considera cachear respuestas.

---

## ✅ Buenas prácticas y notas de desarrollo

- Los componentes React se cargan con `client:load` en Astro cuando es necesario.
- La conexión a MongoDB se gestiona desde `src/lib/mongodb.js` y se reutiliza en API routes.
- Modelos Mongoose incluyen validaciones básicas.

---

## 🤝 Cómo contribuir

1. Haz fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/NuevoFeature`
3. Haz commits claros y atómicos
4. Push a tu rama y abre un Pull Request

Recomendaciones: escribe tests pequeños para nuevas funcionalidades y sigue el estilo del proyecto.

---

## 📬 Contacto y créditos

- Autor: Sebxs940
- Repositorio: https://github.com/Sebxs940/Honlycraft-Web
- Si quieres sugerir mejoras o reportar bugs, abre un issue con título claro y pasos para reproducir.

---

## � Licencia

Este proyecto está licenciado bajo la **MIT License** — ver `LICENSE` para detalles.

---

Gracias por visitar HonlyCraft Web — si quieres, puedo también:

- Añadir badges de CI / coverage
- Generar un `CONTRIBUTING.md` más detallado
- Añadir ejemplos rápidos de uso de la API

Di qué prefieres y continúo con los siguientes pasos 🚀