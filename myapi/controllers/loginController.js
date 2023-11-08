const jwt = require('jsonwebtoken');
const { connection } = require('../utils/database');
const logs=require('./logs');

const secretKey = '1234567890qwertyuiopasdfghjklzxcvbnm'; 
const customerSecretKey = 'sjhfdskfhkj34324khk32h4kh3k24hk32h4k32j'; 

function generateToken(user,role) {
  console.log(user.Role);
  const payload = {
    role: user.Role,
    id: user.Id,
  };
  if(role==2){
    return jwt.sign(payload, secretKey);
  }
  else if(role==3){
    return jwt.sign(payload, customerSecretKey);
  }
} 

function login(req, res) {
  try{
  const { email, password} = req.body;
  console.log(email, password); 

  connection.query(
    `SELECT * FROM Users WHERE email='${email}' AND password='${password}'`,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      else{
        const Role = result[0].RoleId;
      const user=result[0];
    
      const token = generateToken(user,Role);

      return res.json({
        message: 'Login successful',
        role: Role,
        token:token,
        UserId: user.UserId,
      });
      }
    }
  );
}catch(err){
  logs.log(err,'Both','/login');
}
}

module.exports = {
  login,
};
