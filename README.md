# Proyecto 06:

Este proyecto es una aplicación backend desarrollado en Node.js con características como registro de usuarios, inicio de sesión con JWT y manejo de roles.

---

## Características

- Registro de usuarios, con sus respectivas validaciones.
- Inicio de sesión con autenticación(JWT).
- Protección de rutas.
- Documentación de la API con Swagger.

---

## Tecnologías Utilizadas

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB, utilizando Mongoose
- **Herramientas:**
  - bcrypt para encriptar contraseñas
  - jsonwebtoken para manejo de tokens
  - Swagger para documentación
  - Postman para pruebas
  

---

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

1. **Node.js**: [Descargar e instalar](https://nodejs.org/)
2. **MongoDB**: [Descargar e instalar](https://www.mongodb.com/try/download/community)

---

## Instalación

Sigue estos pasos para configurar el proyecto:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/DiegoSalamancaG/Proyecto6

   ```

2. Entra en la carpeta del proyecto:

```bash
cd Proyecto6
```

3. Instalar dependencias:

```bash
npm install
```

4. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

```bash
MONGO_DB
PORT=3000
SECRET_KEY
```

5. Inicia el servidor:

```bash
npm start
```

6. Documentación de la API

- **Swagger**: La documentación está disponible en la ruta `/api-docs` una vez iniciado el servidor.
- **Postman**: Desde Postman puedes importar el archivo `Proyecto_06.postman_collection.json` incluido en el repositorio en la carpeta postman.
