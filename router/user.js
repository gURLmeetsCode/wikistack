const express = require('express');
const client = require('../models');

const userList = require('../views/userList')
const userPages = require('../views/userPages')

const router = express.Router()


router.get('/', (req, res) => {
  res.send(userList())
});

router.get('/:num', (req, res) => {
  res.send()
})

router.post('/',  (req, res) => {
  // const data = await User.create({
  //   name
  // })
})

router.put('/:num', (req, res) => {

})

router.delete('/:num', (req, res) => {
  
})



module.exports = router
