var express = require('express');

var config = require('./config');
var htmlify = require('./build/htmlify');
var db = require('./build/how2db');
var path = require('path');
var moment = require('moment');

const PORT = config.server.port;
const STATIC_ROOT = config.assetDirpath;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(STATIC_ROOT));

app.get('/how2/*.html', function (req, res) {
  try {
    var templateData = db.Get(req.params[0]);
    if (!templateData) {
      res.sendStatus(404);
      return;
    }
    templateData.content = htmlify(templateData.body);
    templateData.date = moment(templateData.date).format('D MMM YYYY, hh:mm a');
    templateData.categoryPath = '/search?q=' + templateData.category.replace('/', '%20');

    res.render('how2', templateData);
  } catch (err) {
    res.send(err);
  }
});

app.get('/search', function (req, res) {
  var q = req.query.q;
  let results;
  if (q) {
    results = db.GetAllWithMatchingTags(q.split(' '));
  } else {
    results = db.GetAll();
  }
  results = results.map(function (val) {
    return {
      path: '/how2/' + val.id + '.html',
      text: val.category + ' | ' + val.title
    };
  });
  res.render('list', {
    title: 'How 2',
    search: q,
    results: results
  });
});

app.get('/', function (req, res) {
  res.render('index', {
    title: 'How 2',
    search: ''
  });
});

function start () {
  app.listen(PORT, function () {
    console.log('Documentation express server listening on port ' + PORT);
  });
}

module.exports = {
  start: start
};
