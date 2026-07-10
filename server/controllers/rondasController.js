const services = require("../services");

const cerrarRonda = (req, res, next) => {
  try {
    const { id } = req.params;
    const { cobradorId } = req.body;

    const circulo = services.circulo.findCirculoById(id);

    const ronda = services.ronda.findRondaActual(circulo);

    if (ronda.pagos.length !== circulo.participantes.length) {
      return res.status(400).json({
        mensaje: "Faltan participantes por pagar",
      });
    }

    if (ronda.cerrada) {
      return res.status(400).json({
        mensaje: "La ronda ya está cerrada",
      });
    }

    const cobrador = circulo.participantes.find((p) => p.id === cobradorId);

    if (!cobrador) {
      return res.status(404).json({
        mensaje: "El cobrador no pertenece al círculo",
      });
    }

    const pago = ronda.pagos.find((p) => p.participanteId === cobradorId);

    if (!pago) {
      return res.status(400).json({
        mensaje: "El cobrador no pagó esta ronda.",
      });
    }

    ronda.cobrador = cobradorId;
    ronda.cerrada = true;
    ronda.fechaCierre = new Date();

    if (circulo.rondaActual < circulo.rondas.length) {
      circulo.rondaActual++;
      res.json({
        mensaje: "Ronda cerrada correctamente",
        rondaCerrada: ronda.numero,
        proximaRonda: circulo.rondaActual,
        estado: circulo.estado,
      });
    } else {
      circulo.estado = "finalizado";
      circulo.fechaFin = new Date();
      res.json({
        mensaje: "El círculo finalizadó correctamente",
        estado: circulo.estado,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  cerrarRonda,
};
