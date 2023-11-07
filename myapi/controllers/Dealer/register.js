const { connection } = require('../../utils/database');
const emailer = require('../sendMail');
const strftime = require('strftime');
const logs=require('../logs');

async function registerDealer(req, res) {
    try {
        const now = new Date();
        const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);
        const emailCheckQuery = 'SELECT * FROM Users WHERE Email = ?';
        connection.query(emailCheckQuery, [req.body.email], (emailCheckError, emailCheckResults) => {
            if (emailCheckError) {
                logs.log(emailCheckError,'Dealer','/registerDealer');
                console.error('Error checking for existing email:', emailCheckError);
                throw emailCheckError;
            }

            if (emailCheckResults.length > 0) {
                console.error('User with the given email already exists.');
                return res.status(400).send('User with the given email already exists');
            }

            // Step 2: Insert into Users table
            const user = {
                Email: req.body.email,
                Password: req.body.password,
                CreatedAt: dateCreated,
                UpdatedAt: dateCreated,
                RoleId: 2,
                Active: false,
            };

            connection.query('INSERT INTO Users SET ?', user, (insertError, insertResult) => {
                if (insertError) {
                    logs.log(insertError,'Dealer','/registerDealer');
                    console.error('Error inserting into Users table:', insertError);
                    throw insertError;
                }

                // Step 3: Retrieve UserId
                const userId = insertResult.insertId;

                // Step 4: Insert into Dealer table
                const dealer = {
                    FirstName: req.body.firstname,
                    LastName: req.body.lastname,
                    Picture: null,
                    ProductsAndServices: null,
                    Contact: null,
                    UserId: userId,
                    AddressId: null,
                    AccountId: null,
                    CreatedAt: dateCreated,
                    UpdatedAt: dateCreated,
                    Active: true,
                };

                connection.query('INSERT INTO Dealer SET ?', dealer, (dealerInsertError, dealerInsertResult) => {
                    if (dealerInsertError) {
                        logs.log(dealerInsertError,'Dealer','/registerDealer');
                        console.error('Error inserting into Dealer table:', dealerInsertError);
                        throw dealerInsertError;
                    }

                    console.log('Dealer data inserted successfully!');
                    console.log(dealerInsertResult);

                    const subject = 'Successfully Created Account';
                    const body = `<h3>Dear ${dealer.FirstName}!</h3> <br/> <p>Thanks For Creating Account as Dealer</p>`;

                    // Step 5: Send email
                    async function send() {
                        const responseData = await emailer.sendEmail(user.Email, subject, body);
                    }

                    send();

                    res.redirect("http://localhost:3000/?register=true");
                });
            });
        });
    } catch (error) {
        logs.log(error,'Dealer','/registerDealer');
        console.error("An error occurred: ", error);
        res.redirect("http://localhost:3000/?register=true");
    }
}

module.exports = {
    registerDealer,
};

