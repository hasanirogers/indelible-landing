const express = require('express');
const router = express.Router();
const CardModel = require('../models/card');

router.get('/', async (request, response, next) => {
  const cards = await CardModel.find();

  const templateInfo = {
    title: 'Dashboard',
    cards: cards,
  };

  response.render('dashboard', templateInfo);
});

module.exports = router;
