const express = require('express')
const router = express.Router()

const trangCaNhanController = require('../app/controllers/TrangCaNhanController')

router.use('/', trangCaNhanController.index)

module.exports = router