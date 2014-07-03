var express = require('express');
var router = express.Router();
var request = require('request').defaults({
    encoding: 'utf8',
    jar: false,
    timeout: 10 * 1000,
    json: true
});
var cleanNameRegex = /[^a-z0-9_]/ig;

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/:user1/or/:user2', function(req, res){
    var user1 = req.param('user1').replace(cleanNameRegex, ''),
        user2 = req.param('user2').replace(cleanNameRegex, '');

    res.render('index', {
        title: 'Express',
        user1: user1,
        user2: user2
    });
});

router.get('/randomtweet', function(req, res){
    var x = req.query.x,
        y = req.query.y;

    request({
        uri: 'http://zackblea.ch/x-or-y/api2/tweet?user1=' + x + '&user2=' + y,
        method: 'get'
    }, function(err, response, body){
        res.send(body);
    });
});

module.exports = router;
