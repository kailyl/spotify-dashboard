var AWS = require('aws-sdk');
const { json, response } = require('express');
AWS.config.update({region:'us-east-1'});
var db = new AWS.DynamoDB();  

async function getDates(callback) {
    var params = {
        KeyConditions: {
          "all-dates": {
            ComparisonOperator: 'EQ',
            AttributeValueList: [ { S: "all-dates" } ]
          }
        },
        TableName: "dates"
    };
    db.query(params, function(err, data) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            var response = []
            if (data.Items && data.Items.length === 1) {
                response = data.Items[0].dates.L
            }
            var dates = []
            response.forEach((elem) => {
                dates.push(elem.S)
            })
            dates.reverse()
            callback(null, dates)
        }
    });
}

async function getSongs(date, callback) {
    var params = {
        KeyConditions: {
          "date": {
            ComparisonOperator: 'EQ',
            AttributeValueList: [ { S: date } ]
          }
        },
        TableName: "song-history"
    };
    db.query(params, function(err, data) {
        if (err) {
            console.log(err)
            callback(err, null);
        } else {
            var songs_raw = []
            var averages_raw = []
            if (data.Items && data.Items.length === 1) {
                songs_raw = data.Items[0]["played-songs"].L
                averages_raw = data.Items[0]["averages"].M
            }

            var total_popularity = 0;
            var songs = []

            var artists_freq = {};
            songs_raw.forEach((song) => {
                curr = {}
                song.L.forEach((elem, i) => {
                    if (i === 0) {
                        curr["song_name"] = elem.S
                    } else if (i === 1) {
                        var artists = []
                        elem.L.forEach((artist) => {
                            artists.push(artist.S)
                            if (artist.S in artists_freq) {
                                artists_freq[artist.S] = artists_freq[artist.S] + 1
                            } else {
                                artists_freq[artist.S] = 1
                            }
                        })
                        curr["artists"] = artists
                    } else if (i === 2) {
                        curr["listened_at"] = elem.S
                    } else if (i === 3) {
                        curr["popularity"] = elem.N
                        total_popularity = total_popularity + parseInt(elem.N)
                    } else if (i === 4) {
                        var audio_features = {}
                        audio_features["loudness"] = elem.M["loudness"].S
                        audio_features["acousticness"] = elem.M["acousticness"].S
                        audio_features["liveness"] = elem.M["liveness"].S
                        audio_features["tempo"] = elem.M["tempo"].S
                        audio_features["valence"] = elem.M["valence"].S
                        audio_features["instrumentalness"] = elem.M["instrumentalness"].S
                        audio_features["danceability"] = elem.M["danceability"].S
                        audio_features["speechiness"] = elem.M["speechiness"].S
                        audio_features["energy"] = elem.M["energy"].S
                        curr["audio_features"] = audio_features
                    }
                })
                songs.push(curr)
            })

            var averages = {}
            averages["loudness"] = averages_raw["loudness"].S
            averages["acousticness"] = averages_raw["acousticness"].S
            averages["liveness"] = averages_raw["liveness"].S
            averages["tempo"] = averages_raw["tempo"].S
            averages["valence"] = averages_raw["valence"].S
            averages["instrumentalness"] = averages_raw["instrumentalness"].S
            averages["danceability"] = averages_raw["danceability"].S
            averages["speechiness"] = averages_raw["speechiness"].S
            averages["energy"] = averages_raw["energy"].S
            averages["popularity"] = total_popularity / songs.length

            var inverted = {};
            for (const [key, value] of Object.entries(artists_freq)) {
                inverted[value] = key;
            }
            var keys = Object.keys(inverted);
            var i, len = keys.length; 
            keys = keys.sort((a,b) => a < b); 
            keys = keys.reverse();
            var sortedArtists = [];
            for (i = 0; i < len; i++)
            {
                k = keys[i];
                sortedArtists.push([k, inverted[k]]);
            }
            callback(null, [songs, averages, sortedArtists])
        }
    });
}

var database = { 
    get_dates: getDates, 
    get_songs: getSongs, 
}

module.exports = database