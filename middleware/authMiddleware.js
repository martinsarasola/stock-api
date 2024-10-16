const TOKEN_SECRETO = "123456";

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization === TOKEN_SECRETO) {
    next();
  } else {
    res.status(403).send({ mensaje: "Token incorrecto o vacío." });
  }
};

module.exports = authMiddleware;
