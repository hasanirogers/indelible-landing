const express = require('express');
const router = express.Router();
const PageModel = require('../models/page');

router.get('/:pageId', async (request, response, next) => {
  const page = await PageModel.find({ id: request.params.pageId });
  const templateInfo = {
    title: 'Error',
    bodyClass: `body--error`
  };

  if (page.length > 0) {
    const mediaType = page[0].mediaType;

    templateInfo.title = `${page[0].firstName}'s ${mediaType} by Indelible Impressions & Designs.`;
    templateInfo.page = page[0];
    templateInfo.bodyClass = 'body--landing';

    response.render('page', templateInfo);
  } else {
    response.render('error', templateInfo);
  }
});

module.exports = router;
