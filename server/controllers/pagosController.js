const circulos = require("../data/circulos");

const registrarPago = (req, res) => {
  const { id, numeroRonda } = req.params;
  const { participanteId, monto } = req.body;

  const participante = circulo.participantes.find(
    (p) => p.id === participanteId,
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

  const yaPago = ronda.pagos.find((p) => p.participanteId === participanteId);

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

  if (ronda.cerrada) {
    return res.status(400).json({
      mensaje: "La ronda ya fue cerrada.",
    });
  }
  const circulo = circulos.find((c) => c.id === Number(id));

  if (!circulo) {
    return res.status(404).json({
      mensaje: "No existe el círculo",
    });
  }

  const ronda = circulo.rondas.find((r) => r.numero === Number(numeroRonda));

  if (!ronda) {
    return res.status(404).json({
      mensaje: "No existe la ronda",
    });
  }

  ronda.pagos.push({
    participanteId,
    monto,
    fechaPago: new Date(),
  });

  res.status(201).json(ronda);
};

module.exports = {
  registrarPago,
};
