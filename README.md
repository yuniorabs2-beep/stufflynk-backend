# Stufflynk Backend

Backend oficial de **Stufflynk**, una plataforma para gestionar usuarios, productos, servicios, ofertas y transacciones.  
Construido con **Node.js**, **Express** y **MongoDB Atlas**.

---

## 🚀 Características principales
- Autenticación con JWT (JSON Web Token).
- CRUD completo para usuarios, productos, servicios y transacciones.
- Middleware de seguridad y manejo de errores.
- Organización modular en controladores, modelos y rutas.
- Pruebas con REST Client mediante archivos `.http`.

---

## 📂 Estructura del proyecto

stufflynk-backend/
├── auth/
│   ├── authMiddleware.js
│   └── generateToken.js
├── config/
│   └── db.js
├── controllers/
│   ├── dealController.js
│   ├── serviceController.js
│   ├── userController.js
│   └── security/checkToken.js
├── middleware/
│   └── errorMiddleware.js
├── models/
│   ├── offering.js
│   ├── product.js
│   ├── trade.js
│   └── user.js
├── routes/
│   ├── dealRoutes.js
│   ├── mainRoutes.js
│   ├── productRoutes.js
│   ├── serviceRoutes.js
│   └── userRoutes.js
├── tests/
│   ├── user.http
│   ├── product.http
│   ├── service.http
│   ├── trade.http
│   └── errors.http
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── server.js

---

## ⚙️ Instalación

1. Clonar el repositorio:
   git clone https://github.com/tuusuario/stufflynk-backend.git
   cd stufflynk-backend

2. Instalar dependencias:
   npm install

3. Configurar variables de entorno en `.env`:
   NODE_ENV=development
   PORT=5000
   MONGO_URI=tu_conexion_mongodb
   JWT_SECRET=tu_secreto

4. Ejecutar el servidor:
   npm run dev

---

## 🧪 Pruebas con REST Client

Cada recurso tiene su propio archivo `.http` en la carpeta `tests/` para validar:
- Autenticación y registro de usuarios.
- CRUD de productos y servicios.
- Creación y gestión de transacciones.
- Manejo de errores y respuestas esperadas.

### Ejemplo de prueba en `user.http`
POST http://localhost:5000/api/users
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}

### Ejemplo de prueba en `product.http`
POST http://localhost:5000/api/products
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Laptop Dell",
  "price": 750,
  "description": "Laptop de 15 pulgadas",
  "category": "Electrónica"
}

### Ejemplo de prueba en `service.http`
POST http://localhost:5000/api/services
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "title": "Reparación de celulares",
  "description": "Servicio técnico especializado",
  "price": 1200
}

### Ejemplo de prueba en `trade.http`
POST http://localhost:5000/api/trades
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "offeringId": "id_oferta",
  "userId": "id_usuario",
  "status": "pending"
}

### Ejemplo de prueba en `errors.http`
GET http://localhost:5000/api/products
Authorization: Bearer token_invalido

---

## 📜 Checklist de certificación

- [x] `serviceController.js` creado y modularizado.  
- [x] `productRoutes.js` y `serviceRoutes.js` definidos.  
- [x] `mainRoutes.js` enlazado en `index.js`.  
- [x] `server.js` configurado con Express y conexión a MongoDB.  
- [x] Archivos `.http` para cada recurso y error.  

---

## 👨‍💻 Contribución

1. Crear una rama de desarrollo:
   git checkout -b feature/nueva-funcionalidad

2. Hacer commit de los cambios:
   git commit -m "Agrega nueva funcionalidad"

3. Abrir un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.