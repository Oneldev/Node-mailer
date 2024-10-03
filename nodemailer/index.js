const config = require('config');

const emailUser = config.get('email.user');
const emailPass = config.get('email.pass');




// Express setup
var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port =  500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/assets")));

// Routing
app.get("/", function(req, response) {
    response.sendFile(path.join(__dirname, "/index.html"));
})

app.post("/send_email", function(req, response) {
    var from = 'esenathanpgjosiwi@gmail.com';
    var to = 'enathdev@gmail.com';
    var subject = 'New Contact Form Submission';
    var FirstName = req.body.fname;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });

    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: "You have received a new message from " + FirstName + ".\n\n" +
                "Email: " + from + "\n\n" +
                "Message: " + message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:'+ info.response);
        }

        response.redirect('/')
    });
})

// Intialize web server
server.listen(port, function(){
    console.log("Starting Server on port: "+ port)
}) 