const {transporter}=require('../utils/nodemailer');


async function sendEmail(email,subject,body){
    const mailOptions = {
        from: `Shop Ease <nazir1081ashraf@gmail.com>`,
        to: email,
        subject: subject,
        html: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           return false;
        } else {
            return true;
        }
      });
}

module.exports={
    sendEmail,
}