require('dotenv').config();

function authMiddleware(req, res, next) {
  // Se obtiene el token desde los headers
  const token = req.headers['x-api-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      error: 'Acceso no autorizado: falta el token de autenticación'
    });
  }

  // Comparamos con el token definido en el .env
  if (token !== process.env.API_TOKEN) {
    return res.status(403).json({
      error: 'Token inválido o no autorizado'
    });
  }
  
  next();
}

module.exports = { authMiddleware };