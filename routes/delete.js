const express = require('express');
const router = express.Router();
const PageModel = require('../models/page');

router.post('/', async (request, response, next) => {
  try {
    PageModel.deleteOne({ id: request.body.pageID }).then(() => {
      const responseData = {
        message: 'SUCCESS',
        code: 200
      };

      return response.status(200).json(responseData);
    }).catch((error) => {
      const responseData = {
        message: 'ERROR',
        code: 500,
        body: error
      };

      return response.status(500).json(responseData);
    });
  } catch {
    console.error('There was an unknown error while trying to delete a page.');
  }
});

module.exports = router;
