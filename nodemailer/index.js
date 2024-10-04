
const config = require('config');
const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const emailUser = config.get('email.user');
const emailPass = config.get('email.pass');
const port = config.get('server.port');


const app = express();
const server = http.Server(app);


app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/assets")));
app.use(cors()); 

// Routing
app.get("/", function(req, response) {
    response.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/send_email", function(req, response) {
    var from = 'esenathanpgjosiwi@gmail.com';
    var to = 'enathdev@gmail.com';
    var subject = 'New Contact Form Submission';
    var FirstName = req.body.fname;
    var LastName = req.body.lname;
    var message = req.body.message;
    var userEmail = req.body.email;
    var phoneNo = req.body.phone;
    var services = req.body.service;

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
        text: "You have received a new message from " + FirstName + LastName + ".\n\n" +
                "Email: " + userEmail + "\n\n" +
                "Phone No: " + phoneNo + "\n\n" +
                "Service: " + services + "\n\n" +
                "Message: " + message
    };
    
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //         console.log(error);
    //         response.status(500).json({ error: 'There was an error sending the email' });
    //     } else {
    //         console.log('Email sent:'+ info.response);
    //         response.status(200).json({ message: 'Email sent successfully' });
    //     }
    // });
});

// Initialize web server
server.listen(port, function(){
    console.log("Starting Server on port: "+ port);
});

