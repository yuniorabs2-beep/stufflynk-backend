# Stufflynk Backend 🚀
**Plataforma integral para la gestión de usuarios, productos, servicios y transacciones.**

Backend robusto construido con **Node.js**, **Express** y **MongoDB Atlas**, diseñado bajo una arquitectura modular y segura.

---

## 🛠️ Tecnologías y Herramientas
* **Node.js & Express**: Servidor y routing.
* **MongoDB Atlas**: Base de datos NoSQL en la nube.
* **Mongoose**: Modelado de datos y validaciones.
* **JWT (JSON Web Token)**: Autenticación y protección de rutas.
* **Bcryptjs**: Encriptación de seguridad para credenciales.
* **Swagger UI**: Documentación interactiva y pruebas de API.

---

## 📖 Documentación Interactiva
¡No más comandos complejos! Puedes probar todos los endpoints, realizar registros, logins y gestionar productos directamente desde el navegador:

👉 **URL de Swagger:** `http://localhost:5000/api-docs`

> **Nota:** Para las rutas protegidas, usa el botón **"Authorize"** pegando el token generado en el login (formato: `Bearer <token>`).

---

## 📂 Estructura del Proyecto Actualizada
```text
stufflynk/
├── config/             # Configuración de DB (db.js)
├── controllers/        # Lógica de negocio (user, product, service, deal)
├── middleware/         # Auth, Admin y validaciones (Corregido)
├── models/             # Esquemas de Mongoose (User, Product, Service, etc.)
├── routes/             # Definición de rutas y documentación Swagger
├── server.js           # Punto de entrada de la aplicación
└── .env                # Variables de entorno (Privado)