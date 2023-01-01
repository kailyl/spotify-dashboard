var db = require("./models")

var getSpotifyDates = function(req, res) {
    db.get_dates(function(data){
        res.json({ message: data });
    })
}

var routes = { 
    get_dates: getSpotifyDates,
}
  
module.exports = routes;