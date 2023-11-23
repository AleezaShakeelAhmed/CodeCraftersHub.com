const strftime = require("strftime");
const { connection } = require("../../utils/database");
const emailer = require('../sendMail');
const logs=require('../logs');

async function reply(req, response) {
  try{
  const email = req.body.email;
  const subject = req.body.subject;
  const reply = req.body.message;
  const id = req.body.id;

  connection.query(
    `UPDATE CustomerSupport SET Active=1 WHERE CustomerSupportId=${id}`,
    (err, res) => {
      if (err) {
        logs.log(err,'Dealer','/dealerReply');
      }
      else {
        async function send() {
          const responseData = await emailer.sendEmail(email, subject, reply);
          response.status(200).json({ message: "added" });
        }
        send();
      }
    }
  );
}
catch(err){
  logs.log(err,'Dealer','/dealerReply');
}
}

module.exports = {
  reply,
};