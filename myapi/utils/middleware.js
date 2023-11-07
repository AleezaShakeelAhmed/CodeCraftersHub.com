const jwt = require('jsonwebtoken');


const secretKey = '1234567890qwertyuiopasdfghjklzxcvbnm';
const customerSecretKey = 'sjhfdskfhkj34324khk32h4kh3k24hk32h4k32j'; 

function authenticateToken(req, res, next) {
  const token = req.query.token;
  const role = req.query.role;
  console.log(role);
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if(role==2){
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden' });
      }
      else{
        return res.status(201).json({ message: 'verified' });
      }
    });
  }
  else if(role==3){
    jwt.verify(token, customerSecretKey, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden' });
      }
      else{
        return res.status(201).json({ message: 'verified' });
      }
    });
  }
}

function authorizeRole(allowedRoles) {
  return (req, res, next) => {
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRole,
};
