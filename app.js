const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT ||3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();

})
app.set('view engine', 'hbs');

app.use(express.static(__dirname +'/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n',(err)=>{
    if(err){
      console.log('error occured!');
    }
  })
  next();
})

app.get('/', (request, response)=>{
  response.render('home.hbs', {
    pageTitle: 'The Home Page'
  });
});

app.get('/about', (request, response)=>{
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


app.listen(port, ()=>{
  console.log(`now listening at port ${port}`);
});
