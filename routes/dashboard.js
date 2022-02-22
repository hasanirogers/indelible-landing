const express = require('express');
const router = express.Router();
const PageModel = require('../models/page');

router.get('/', async (request, response, next) => {
  const pages = await PageModel.find();

  const templateInfo = {
    title: 'Dashboard',
    pages: pages,
  };

  response.render('dashboard', templateInfo);
});

module.exports = router;
