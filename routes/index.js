'use strict'
const express = require('express')
const employe = require('./employeRoutes')  
const auth = require('./authRoutes')
const kategori =require('./Kategori')
const solusi =require('./solusi')
const kuis =require('./kuis')
const router = express()

router.get(`/api/v1/`, (_req, res) => {
  res.json({
    "message": "Welcome to restfullapi"
  })
})

router.use(employe)
router.use(auth)
router.use(kategori)
router.use(solusi)
router.use(kuis)
module.exports = router 