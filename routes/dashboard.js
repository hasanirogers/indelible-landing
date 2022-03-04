const express = require('express');
const router = express.Router();
const PageModel = require('../models/page');

router.get('/', async (request, response, next) => {
  const page = request.query.page;
  const limit = request.query.limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedPages = await PageModel.find().limit(limit).skip(startIndex);
  const allPages = await PageModel.find();

  const pages = page && limit ? paginatedPages : allPages;

  const templateInfo = {
    title: 'Dashboard',
    pages: pages,
    url: request.url,
    pagination: {
      limit: limit,
      startIndex: startIndex,
      endIndex: endIndex,
      totalPages: Math.ceil(allPages.length / limit),
      currentPage: page
    },
    bodyClass: 'body--dashboard'
  };

  response.render('dashboard', templateInfo);
});

module.exports = router;
