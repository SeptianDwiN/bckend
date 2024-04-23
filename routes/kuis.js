'use strict'
const express = require('express')
const kuis = require('../controllers/kuis')
// const { verifyToken } = require('../middleware/verify')
const router = express.Router()

router.get(`/api/v1/kuis`,  kuis.index)
router.post(`/api/v1/kuis`, kuis.store)
router.get(`/api/v1/kuis/:id`,  kuis.show)
router.put(`/api/v1/kuis/:id`, kuis.update)
router.delete(`/api/v1/kuis/:id`, kuis.destroy)

module.exports = router