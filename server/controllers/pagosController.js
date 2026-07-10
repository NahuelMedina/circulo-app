const services = require("../services");

const registrarPago = (req, res, next) => {
  try {
    const { id } = req.params;

    const { participanteId, monto, metodo } = req.body;

    const circulo = services.circulo.findCirculoById(id);

    const participante = services.participante.findParticipanteById(
      circulo,
      participanteId,
    );

    if (!participante) {
      return res.status(404).json({
        mensaje: "El participante no existe.",
      });
    }

    if (!participante.activo) {
      return res.status(400).json({
        mensaje: "El participante está inactivo.",
      });
    }

    if (circulo.estado !== "activo") {
      return res.status(400).json({
        mensaje: "El círculo aún no comenzó.",
      });
    }

    const ronda = services.ronda.findRondaActual(circulo);

    if (ronda.cerrada) {
      return res.status(400).json({
        mensaje: "La ronda ya fue cerrada.",
      });
    }

    const yaPago = ronda.pagos.some((p) => p.participanteId === participanteId);

    if (yaPago) {
      return res.status(400).json({
        mensaje: "Este participante ya pagó esta ronda.",
      });
    }

    if (monto !== circulo.montoCuota) {
      return res.status(400).json({
        mensaje: "El monto ingresado es incorrecto.",
      });
    }

    if (ronda.pagos.length === 0) {
      ronda.fechaInicio = new Date();
    }

    ronda.pagos.push({
      participanteId,
      monto,
      metodo,
      fechaPago: new Date(),
    });

    res.json({
      mensaje: "Pago registrado.",

      pagosRegistrados: ronda.pagos.length,

      pagosPendientes: circulo.participantes.length - ronda.pagos.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrarPago,
};
