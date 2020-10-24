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
    res.redirect(`/charities/${charity.id}`);
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

//EDIT
app.get('/charities/:id/edit', (req, res) => {
  models.Charity.findByPk(req.params.id).then((charity) => {
    res.render('charities-edit', { charity: charity });
  }).catch((err) => {
    console.log(err.message);
  })
});

//UPDATE
app.put('/charities/:id', (req, res) => {
  models.Charity.findByPk(req.params.id).then(charity => {
    charity.update(req.body).then(charity => {
      res.redirect(`/charities/${req.params.id}`);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

//DELETE
app.delete('/charities/:id', (req, res) => {
  models.Charity.findByPk(req.params.id).then(charity => {
    charity.destroy();
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
