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
      mediaURL: request.body.mediaURL,
      message: request.body.message,
    };
    const options = { runValidators: true };
    await PageModel.updateOne(query, newData, options, (error) => {
      if (error) {
        const responseData = {
          message: 'ERROR',
          code: 500,
          body: error
        };

        return response.status(500).json(responseData);
      }
    }).clone();

    return response.status(200).json({ message: 'SUCCESS', code: 200 });
  } catch {
    console.error('There was an unknown error while trying to edit a page.');
  }
});

module.exports = router;
