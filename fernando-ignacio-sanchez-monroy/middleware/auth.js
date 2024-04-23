const jwt = require('jsonwebtoken');
const { getAccessTokenByToken } = require('../models/accessToken');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    const accessToken = await getAccessTokenByToken(token);

    if (!accessToken) {
      return res.status(401).json({ message: 'Token de acceso inválido' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token de acceso expirado' });
    } else {
      return res.status(401).json({ message: 'Token de acceso inválido' });
    }
  }
};

module.exports = {
  authenticateToken,
};