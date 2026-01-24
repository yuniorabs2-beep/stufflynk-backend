const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");

const { protect, admin } = require("../auth/authMiddleware");
const { validateUser } = require("../middleware/validationMiddleware");

/**
 * @swagger
 * tags:
 * name: Usuarios
 * description: Gestión de autenticación y perfiles
 */

/**
 * @swagger
 * /api/users/register:
 * post:
 * summary: Registrar un nuevo usuario
 * tags: [Usuarios]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - email
 * - password
 * properties:
 * name:
 * type: string
 * example: Juan Perez
 * email:
 * type: string
 * example: juan@example.com
 * password:
 * type: string
 * example: 123456
 * role:
 * type: string
 * example: user
 * responses:
 * 201:
 * description: Usuario registrado exitosamente
 * 400:
 * description: Error en los datos enviados
 */
router.post("/register", validateUser, registerUser);

/**
 * @swagger
 * /api/users/login:
 * post:
 * summary: Iniciar sesión / Obtener Token
 * tags: [Usuarios]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * example: juan@example.com
 * password:
 * type: string
 * example: 123456
 * responses:
 * 200:
 * description: Login exitoso
 * 401:
 * description: Credenciales incorrectas
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users:
 * get:
 * summary: Listar todos los usuarios (Solo Admin)
 * tags: [Usuarios]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de usuarios obtenida
 */
router.get("/", protect, admin, getUsers);

module.exports = router;