//charities.js

module.exports = function (app, models) {

    //INDEX
    app.get('/', (req, res) => {
        models.Charity.findAll({ order: [['createdAt', 'DESC']] }).then(charities => {
            res.render('charities-index', { charities: charities });
        })
    })

    //NEW
    app.get('/charities/new', (req, res) => {
      res.render('charities-new', {});
    })

    //LOGIN
    app.get('/login', (req, res) => {
      res.render('login', {});
    })

    //HELP
    app.get('/help', (req, res) => {
      res.render('help', {});
    })

    //SIGNUP
    app.get('/signup', (req, res) => {
      res.render('signup', {});
    })

    //THANK YOU
    app.get('/thankyou', (req, res) => {
      res.render('thank-you', {});
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
    })
}
