var express = require('express');
var router = express.Router();

router.get('/:pageId', function(request, response, next) {
  var templateInfo = {
    title: 'Page',
    pageId: request.params.pageId ? request.params.pageId : 0
  }

  response.render('page', templateInfo);
});

module.exports = router;
