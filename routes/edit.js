const express = require('express');
const router = express.Router();
const PageModel = require('../models/page');

router.get('/:pageId', async (request, response, next) => {
  const page = await PageModel.find({ id: request.params.pageId });
  const templateInfo = {
    title: 'Edit Page',
    bodyClass: 'body--edit',
    page: page[0]
  };

  response.render('edit', templateInfo);
});

router.post('/', async (request, response, next) => {
  try {
    const query = { id: request.body.id };
    const newData = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      mediaType: request.body.mediaType,
      mediaURL: request.body.mediaURL
    }

    await PageModel.updateOne(query, newData);
  } catch {
    const templateInfo = {
      title: 'Error',
      bodyClass: `body--error`
    };

    response.render('error', templateInfo);
  }
});

module.exports = router;
