const express = require('express');
const router = express.Router();
const PageModel = require('../models/page');

router.get('/', (request, response, next) => {
  const templateInfo = {
    title: 'Create Page',
    bodyClass: 'body--create'
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
      mediaURL: request.body.mediaURL,
      message: request.body.message,
    });

    const savedPage = await page.save();

    if (savedPage) {
      return response.status(200).json({ message: 'SUCCESS', code: 200 });
    } else {
      return response.status(500).json({ message: 'ERROR', code: 500 });
    }
  } catch (error) {
    const responseData = {
      message: 'ERROR',
      code: 500,
      body: error
    };

    return response.status(500).json(responseData);
  }
});

module.exports = router;
