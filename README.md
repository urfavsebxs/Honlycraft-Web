# HonlyCraft Web

Una aplicación web moderna para el servidor de Minecraft HonlyCraft, construida con Astro, React y MongoDB.

## 🚀 Características

- **Tienda de productos**: Sistema de compras con carrito de compras
- **Panel de administración**: Gestión de descuentos y productos
- **Sistema de autenticación**: Login con roles (admin, moderator, user)
- **Dashboard de jugadores**: Estadísticas y skins de Minecraft
- **API de Minecraft**: Integración con la API de Mojang para obtener datos de jugadores
- **Diseño responsivo**: Interfaz moderna con Tailwind CSS

## 🛠️ Tecnologías

- **Frontend**: Astro 5.x, React 19.x, Tailwind CSS 4.x
- **Backend**: Node.js, Express, MongoDB
- **Autenticación**: JWT, bcryptjs
- **Base de datos**: MongoDB con Mongoose

## 📋 Requisitos previos

- Node.js 18+ 
- MongoDB (local o Atlas)
- pnpm (recomendado) o npm

## ⚙️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Honlycraft-Web
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/honlycraft
   
   # JWT Secret
   JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
   
   # Server Configuration
   PORT=3000
   ```

4. **Configurar MongoDB**
   
   Asegúrate de que MongoDB esté ejecutándose. Puedes usar:
   - MongoDB local: `mongod`
   - MongoDB Atlas: Usa la URI de conexión de tu cluster

5. **Poblar la base de datos (opcional)**
   ```bash
   node seed.js
   ```
   
   Esto creará usuarios de ejemplo:
   - **admin** / admin123 (rol: admin)
   - **moderator** / mod123 (rol: moderator)  
   - **user** / user123 (rol: user)

## 🚀 Ejecución

### Desarrollo
```bash
pnpm dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`

### Producción
```bash
pnpm build
pnpm preview
# o
npm run build
npm run preview
```

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── LoginComponent.jsx
│   ├── StoreComponent.jsx
│   ├── AdminPanel.jsx
│   └── MinecraftSkin.astro
├── layouts/            # Layouts de Astro
│   └── Layout.astro
├── lib/                # Utilidades de base de datos
│   └── mongodb.js
├── models/             # Modelos de MongoDB
│   ├── User.js
│   ├── Player.js
│   └── Stats.js
├── pages/              # Páginas y API routes
│   ├── api/            # Endpoints de API
│   │   ├── auth/
│   │   ├── player.js
│   │   └── stats.js
│   ├── dashboard.astro
│   ├── login.astro
│   ├── store.astro
│   └── index.astro
├── sections/           # Secciones de páginas
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Store.astro
│   └── Dashboard.astro
├── styles/             # Estilos globales
│   └── global.css
└── utils/              # Utilidades
    ├── auth.js
    └── minecraftAPI.js
```

## 🔐 Sistema de autenticación

El sistema incluye tres roles:
- **admin**: Acceso completo al panel de administración
- **moderator**: Acceso limitado a funciones de moderación
- **user**: Usuario estándar

### Endpoints de autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

## 🛒 Sistema de tienda

- **Productos**: Rangos, llaves de supervivencia, protecciones
- **Carrito**: Gestión de productos en el carrito
- **Descuentos**: Sistema de precios con descuentos
- **Panel admin**: Gestión de descuentos

## 🎮 Integración con Minecraft

- **API de Mojang**: Obtención de UUIDs y datos de jugadores
- **Skins**: Renderizado de skins de Minecraft
- **Estadísticas**: Sistema de kills, deaths, wins

## 🐛 Solución de problemas

### Error de conexión a MongoDB
- Verifica que MongoDB esté ejecutándose
- Revisa la URI de conexión en `.env`
- Asegúrate de que la base de datos exista

### Error de JWT
- Verifica que `JWT_SECRET` esté definido en `.env`
- Asegúrate de que el secret sea lo suficientemente seguro

### Problemas con la API de Minecraft
- La API de Mojang puede tener limitaciones de rate
- Los jugadores offline no tendrán UUID oficial

## 📝 Notas de desarrollo

- El proyecto usa Astro con integración de React
- Los componentes React se cargan con `client:load`
- La base de datos se conecta automáticamente en las API routes
- Los modelos incluyen validaciones y middleware de Mongoose

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.