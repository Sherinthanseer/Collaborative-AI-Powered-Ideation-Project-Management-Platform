const express = require('express')
const { login, registration } = require('../controllers/authController')

const router = express.Router()

router.post("/login",login)
router.post("/register",registration)


module.exports = router