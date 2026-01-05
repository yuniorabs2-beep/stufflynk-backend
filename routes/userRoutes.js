const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");

const { protect, admin } = require("../auth/authMiddleware");
const { validateUser } = require("../middleware/validatorMiddleware");

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
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 201:
 * description: Usuario registrado exitosamente
 * 400:
 * description: Error de validación o usuario ya existe
 */
router.post("/register", validateUser, registerUser);

/**
 * @swagger
 * /api/users/login:
 * post:
 * summary: Iniciar sesión
 * description: Retorna un Token JWT para usar en rutas protegidas
 * tags: [Usuarios]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Login exitoso, retorna el Token
 * 401:
 * description: Credenciales inválidas
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
 * description: Lista de usuarios
 * 401:
 * description: No autorizado (falta token)
 * 403:
 * description: Prohibido (no es administrador)
 */
router.get("/", protect, admin, getUsers);

module.exports = router;