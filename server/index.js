const express = require("express");
var bodyParser = require('body-parser');
var routes = require('./routes');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/dates", routes.get_dates);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});