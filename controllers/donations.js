//controllers/donations.js

module.exports = (app, models) => {
  //NEW
  app.get('/charities/:charityId/donations/new', (req, res) => {
    models.Charity.findByPk(req.params.charityId).then(charity => {
      res.render('donations-new', { charity: charity });
    });
  });

  //CREATE
  app.post('/charities/:charityId/donations', (req, res) => {
    req.body.CharityId = req.params.charityId;
    models.Donation.create(req.body).then(rsvp => {
      res.redirect(`/charities/${req.params.charityId}`);
    }).catch((err) => {
        console.log(err)
    });
  });

}
