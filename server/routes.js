var db = require("./models")

var getSpotifyDates = function(req, res) {
    db.get_dates(function(err, data) {
        if (err) {
            res.status(400).send({
                message: err
            });
        } else {
            res.json({message: data});
        }
    })
}

var getSongs = function(req, res) {
    var date = req.body.day
    db.get_songs(date, function(err, data) {
        if (err) {
            res.status(400).send({
                message: err
            });
        } else {
            res.json({message: data});
        }
    })
}

var routes = { 
    get_dates: getSpotifyDates,
    get_songs_assoc_date: getSongs,
}
  
module.exports = routes;