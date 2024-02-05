const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'soonodemailer@gmail.com',
    pass: 'wqzo heth phko jucc'
  }
});

const mailOptions = {
  from: 'soonodemailer@gmail.com',
  to: 'yeounsoo123@gmail.com',
  subject: 'verification ta reservation',
  text: 'vous avez bien reserve!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});