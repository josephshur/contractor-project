const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const express = require('express')
const app = express()

const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

const models = require('./db/models');

//INDEX
app.get('/', (req, res) => {
  models.Charity.findAll().then(charities => {
    res.render('charities-index', { charities: charities });
  })
})

//TEST ARRAY OF CHARITIES
var charities = [
  { title: "Placeholder Charity 1", desc: "Description Text", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Placeholder Charity 2", desc: "Description Text", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Placeholder Charity 3", desc: "Description Text", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

//NEW CHARITY
app.get('/charities/new', (req, res) => {
  res.render('charities-new', {})
})

//CREATE
app.post('/charities', (req, res) => {
  models.Charity.create(req.body).then(charity => {
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err)
  });
})

//SHOW
app.get('/charities/:id', (req, res) => {
  models.Charity.findByPk(req.params.id).then((charity) => {
    res.render('charities-show', { charity: charity })
  }).catch((err) => {
    console.log(err.message);
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
