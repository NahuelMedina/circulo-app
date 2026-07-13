const services = require("../services");
const definirOrdenManual = (req, res, next) => {
  try {
    const ordenDefinido = services.circulo.defineOrdenManual(
      req.params.id,
      req.body.orden,
    );

    res.json({ mensaje: "Orden guardado correctamente.", ordenDefinido });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  definirOrdenManual,
};
