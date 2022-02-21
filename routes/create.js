const express = require('express');
const router = express.Router();
const CardModel = require('../models/card');

router.get('/', (request, response, next) => {
  const templateInfo = {
    title: 'Create Card'
  };

  response.render('create', templateInfo);
});

router.post('/', async (request, response, next) => {
  console.log(request.body);

  try {
    const card = new CardModel({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email
    });

    const savedCard = await card.save();

    if (savedCard) {
      return response.redirect('/create?success=true');
    } else {
      return next(new Error('failed to save card'));
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
