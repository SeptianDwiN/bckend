'use strict'
const express = require('express')
const solusi = require('../controllers/solusi')
// const { verifyToken } = require('../middleware/verify')
const router = express.Router()

router.get(`/api/v1/solusi`,  solusi.index)
router.post(`/api/v1/solusi`, solusi.store)
router.get(`/api/v1/solusi/:id`,  solusi.show)
router.put(`/api/v1/solusi/:id`, solusi.update)
router.delete(`/api/v1/solusi/:id`, solusi.destroy)

module.exports = router