const express = require('express');
const router = express.Router();
const PageModel = require('../models/page');

router.get('/', async (request, response, next) => {
  const page = parseInt(request.query.page);
  const limit = parseInt(request.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedPages = await PageModel.find().limit(limit).skip(startIndex);
  const allPages = await PageModel.find();

  const total = Math.ceil(allPages.length / limit);
  const pageData = page && limit ? paginatedPages : allPages;

  const templateInfo = {
    title: 'Dashboard',
    pages: pageData,
    url: request.url,
    pagination: {
      limit: limit,
      startIndex: startIndex,
      endIndex: endIndex,
      totalPages: total,
      currentPage: page,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < total ? page + 1 : null
    },
    bodyClass: 'body--dashboard'
  };

  response.render('dashboard', templateInfo);
});

module.exports = router;
