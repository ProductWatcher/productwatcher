const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('../database/index.js')

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/products/product/:tcin', (req, res) => {
  const tcin = req.params.tcin
  db.getByTCIN(tcin, (err, product) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(product)
      res.status(200).send(product);
    }
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
}) 