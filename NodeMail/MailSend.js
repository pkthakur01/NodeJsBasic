var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'munnabhai.4746@gmail.com',
    pass: '9135896494'
  }
});

var mailOptions = {
  from: 'munnabhai.4746@gmail.com',
  to: 'prakah.kumar@mca.christuniversity.in',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 