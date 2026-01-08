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
 */
router.post("/register", validateUser, registerUser);

/**
 * @swagger
 * /api/users/login:
 * post:
 * summary: Iniciar sesión
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
 * description: Login exitoso
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
 */
router.get("/", protect, admin, getUsers);

module.exports = router;