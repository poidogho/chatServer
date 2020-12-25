const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/keys");
const router = require("./router");
const app = express();

const port = process.env.PORT || config.appPort;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
