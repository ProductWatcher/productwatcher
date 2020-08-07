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

app.get('/', (req, res) => {
  db.test((err, users) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(users);
    }
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})