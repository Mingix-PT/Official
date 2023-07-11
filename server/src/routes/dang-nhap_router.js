const express = require('express')
const router = express.Router()

const dangNhapController = require('../app/controllers/DangNhapController')

router.use('/', dangNhapController.index)

module.exports = router