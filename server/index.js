const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const db = require('../database/index.js')

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.use(express.static(path.join(__dirname, '/../client/public')))

app.get('/products/product/:tcin', (req, res) => { // search specific TCIN
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

app.get('/products/:name', (req, res) => { // pattern match by name
  const name = req.params.name;
  db.productsByName(name, (err, products) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(products);
    }
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
}) 