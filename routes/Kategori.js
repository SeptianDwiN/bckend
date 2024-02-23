'use strict'
const express = require('express')
const kategori = require('../controllers/kategori')
// const { verifyToken } = require('../middleware/verify')
const router = express.Router()

router.get(`/api/v1/kategori`,  kategori.index)
router.post(`/api/v1/kategori`, kategori.store)
router.get(`/api/v1/kategori/:id`,  kategori.show)
router.put(`/api/v1/kategori/:id`, kategori.update)
router.delete(`/api/v1/kategori/:id`, kategori.destroy)

module.exports = router