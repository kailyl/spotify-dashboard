var AWS = require('aws-sdk');
const { json } = require('express');
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
            console.log(err)
            callback(err);
        } else {
            console.log(data)
            // if (data.Items && data.Items.length > 0) {
            //     data.Items.forEach((elem) => {
            //         if (res.length < 5) {
            //             res.push([elem.username, elem.full_name])
            //         }
            //     })
            // }
            // callback(null, res)
            callback("yay")
        }
    });
}

var database = { 
    get_dates: getDates, 
}

module.exports = database