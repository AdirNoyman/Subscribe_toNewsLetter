//jshint esversion: 6

const bodyParser = require('body-parser');
const express    = require('express');
const request    = require('request');
const app        = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get('/', (req, res) => res.sendFile(__dirname + "/signup.html"));

app.post('/', (req, res) => {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;


var data = {

    members: [

        {email_address: email,
         status: "subscribed",
         merge_fields: {
            FNAME: firstName,
            LNAME: lastName},
         }
        
    ]
}

var jsonData = JSON.stringify(data);

    var options = {

        url: 'https://us20.api.mailchimp.com/3.0/lists/ca5d9d96f7',
        method: "POST",
        headers: {

            "Authorization": "adiros1 fab8af5e5eac84e67452cc0b1ead16f2-us20"
        },
        // body: jsonData

    }

    request(options, (error, response, body) => {
        

        if (error) {

            res.sendFile(__dirname + "/failure.html");

        } else {

            if (response.statusCode === 200) {

                res.sendFile(__dirname + "/success.html");

            } else {

                res.sendFile(__dirname + "/failure.html");
                
            }
        }

    });

});

app.post('/failure', (req, res) => res.redirect('/'));

// Starting server listen on port 3000
app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"));

// mailchimpApiKey: fab8af5e5eac84e67452cc0b1ead16f2-us20
// list id: ca5d9d96f7