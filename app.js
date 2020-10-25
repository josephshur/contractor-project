const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const express = require('express')
const methodOverride = require('method-override')

const app = express()

const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

const models = require('./db/models');

require('./controllers/charities')(app, models);
require('./controllers/donations')(app, models);

//TEST ARRAY OF CHARITIES
var charities = [
  { title: "Placeholder Charity 1", desc: "Description Text", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Placeholder Charity 2", desc: "Description Text", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Placeholder Charity 3", desc: "Description Text", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
