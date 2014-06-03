var express = require('express');
var router = express.Router();
var request = require('request').defaults({
    encoding: 'utf8',
    jar: false,
    timeout: 10 * 1000,
    json: true
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/randomtweet', function(req, res){
    var x = req.query.x,
        y = req.query.y;

    request({
        uri: 'http://zackblea.ch/x-or-y/api/get-tweet?user1=' + x + '&user2=' + y,
        method: 'get'
    }, function(err, response, body){
        res.send(body);
    });
});

module.exports = router;
