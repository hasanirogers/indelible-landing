const express = require('express');
const router = express.Router();
const PageModel = require('../models/page');

router.get('/', (request, response, next) => {
  const templateInfo = {
    title: 'Create Page'
  };

  response.render('create', templateInfo);
});

router.post('/', async (request, response, next) => {
  try {
    const page = new PageModel({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      mediaType: request.body.mediaType,
      mediaURL: request.body.mediaURL
    });

    const savedPage = await page.save();

    if (savedPage) {
      return response.redirect('/create?success=true');
    } else {
      return next(new Error('failed to save page'));
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
