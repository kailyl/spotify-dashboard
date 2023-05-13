const express = require("express");
const path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var routes = require('./routes');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json({
  type: ['application/json', 'text/plain']
}))

app.post("/dates", routes.get_dates);

app.post("/songsOnDay", routes.get_songs_assoc_date);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
