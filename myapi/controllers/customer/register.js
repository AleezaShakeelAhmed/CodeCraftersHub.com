

const { connection } = require('../../utils/database');
const emailer = require('../sendMail');
const strftime = require('strftime');
const logs=require('../logs');

async function registerCustomer(req, res) {
    try {
        const now = new Date();
        const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);

        // Step 1: Check if the user with the given email already exists
        const emailCheckQuery = 'SELECT * FROM Users WHERE Email = ?';
        connection.query(emailCheckQuery, [req.body.email], (emailCheckError, emailCheckResults) => {
            if (emailCheckError) {
                logs.log(emailCheckError,'Customer','/registerCustomer');
                console.error('Error checking for existing email:', emailCheckError);
                throw emailCheckError;
            }

            if (emailCheckResults.length > 0) {
                // User with the given email already exists, show an alert
                console.error('User with the given email already exists.');
                return res.status(400).send('User with the given email already exists');
            }

            // Step 2: Insert into Users table
            const user = {
                Email: req.body.email,
                Password: req.body.password,
                CreatedAt: dateCreated,
                UpdatedAt: dateCreated,
                RoleId: 3, // Customer role
                Active: true,
            };

            connection.query('INSERT INTO Users SET ?', user, (insertError, insertResult) => {
                if (insertError) {
                    logs.log(insertError,'Customer','/registerCustomer');
                    console.error('Error inserting into Users table:', insertError);
                    throw insertError;
                }

                // Step 3: Retrieve UserId
                const userId = insertResult.insertId;

                // Step 4: Insert into Customer table
                const customer = {
                    FirstName: req.body.firstname,
                    LastName: req.body.lastname,
                    CreatedAt: dateCreated,
                    UpdatedAt: dateCreated,
                    UserId: userId,
                    Active: false, // You may need to adjust this field based on your requirements
                };

                connection.query('INSERT INTO Customer SET ?', customer, (customerInsertError, customerInsertResult) => {
                    if (customerInsertError) {
                        logs.log(customerInsertError,'Customer','/registerCustomer');
                        console.error('Error inserting into Customer table:', customerInsertError);
                        throw customerInsertError;
                    }

                    console.log('Customer data inserted successfully!');
                    console.log(customerInsertResult);

                    const subject = 'Successfully Created Account';
                    const body = `<h3>Dear ${customer.FirstName}!</h3> <br/> <p>Thanks For Creating Account as Customer</p>`;

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
        logs.log(error,'Customer','/registerCustomer');
        console.error("An error occurred: ", error);
        res.redirect("http://localhost:3000/?register=true");
    }
}

module.exports = {
    registerCustomer,
};

