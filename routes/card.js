var express = require('express');
var router = express.Router();

router.get('/:cardId', function(request, response, next) {
  var templateInfo = {
    title: 'Cards',
    cardId: request.params.cardId ? request.params.cardId : 0
  }

  response.render('card', templateInfo);
});

module.exports = router;
