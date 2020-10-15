const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('./public/'));

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
const htmlRoutes = require('./controllers/html-routes');
const apiRoutes = require('./controllers/api-routes')

app.use(htmlRoutes)
app.use(apiRoutes)

app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});