const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('dateYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    welcomeMessage: 'Hai, Welcome to some website',
    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res)=> {
  res.render('about', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'This page error dude'
  })
});

app.get('/project', (req, res) => {
  res.render('project',{
    welcomeMessage: 'This is protofolio page for this project',
    pageTitle: 'Portofolio Page'
  })
});

app.listen(port), () => {
  console.log(`Server is up on port ${port}`);
};
