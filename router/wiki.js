const express = require('express');
const { Page } = require('../models');
const addPage = require('../views/addPage');
const editPage = require('../views/editPage');
const layout = require('../views/layout')
const main = require('../views/main')
const wikipage = require('../views/wikipage')

const router = express.Router()

router.get('/',  async (req, res) => {
  try{
    const allPages = await Page.findAll()
    res.send(main(allPages))
  }
  catch(err){next(err)}
});

router.get('/add', (req, res) => {
  res.send(addPage())
})

// page to find an instance by slug
router.get('/:slug', async (req, res, next) => {
  try{
    const findingSlug = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    res.send(wikipage(findingSlug))

  }catch(err){next(err)}
});




router.post('/', async (req, res, next) => {
  const title = req.body.title;
  // const content = req.body.content;
  const page = new Page({
    title: title
    // content: content
  })
  try{
    await page.save();
    res.redirect(`/wiki/${page.slug}`)
  }catch(err) {next(err)}
})




module.exports = router
