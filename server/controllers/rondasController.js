const services = require("../services");

const cerrarRonda = (req, res, next) => {
  try {
    const rondaCerrada = services.ronda.cerrarRonda(
      req.params.id,
      req.body.cobradorId,
    );
    if (rondaCerrada.estado === "finalizado") {
      res.json({
        mensaje: "El círculo finalizadó correctamente",
        rondaCerrada,
      });
    }
    res.json({ mensaje: "Ronda cerrada correctamente", rondaCerrada });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  cerrarRonda,
};
