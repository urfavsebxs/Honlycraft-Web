# Imagen base con Node 25
FROM node:25-alpine

# Instala pnpm globalmente
RUN npm install -g pnpm

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY pnpm-lock.yaml package.json ./

# Instala dependencias (sin cache)
RUN pnpm install

# Copia el resto del código
COPY . .

# Expone el puerto que usa Astro en desarrollo
EXPOSE 4321

# Comando por defecto: modo desarrollo
CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]
