const circulos = require("../data/circulos");

const cerrarRonda = (req, res) => {
  const { id, numeroRonda } = req.params;
  const { cobradorId } = req.body;

  const circulo = circulos.find((c) => c.id === id);

  if (!circulo) {
    return res.status(404).json({
      mensaje: "El circulo no existe",
    });
  }
  const ronda = circulo.rondas.find((r) => r.numero === Number(numeroRonda));

  if (!ronda) {
    return res.status(404).json({
      mensaje: "La ronda no existe",
    });
  }

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

  res.json({
    mensaje: "Ronda cerrada correctamente",
    ronda,
  });
};

module.exports = {
  cerrarRonda,
};
