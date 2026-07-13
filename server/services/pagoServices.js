const { ESTADO_RONDA, ESTADO_CIRCULO, ESTADO_PAGO } = require("../constants");
const AppError = require("../errors/AppErrors");
const services = require("./index");
const recordPago = (id, body) => {
  const { participanteId, monto, metodo } = body;
  const circulo = services.circulo.findCirculoById(id);

  const participante = services.participante.findParticipanteById(
    circulo,
    participanteId,
  );

  if (!participante) {
    throw new AppError("El participante no existe.", 404);
  }

  if (!participante.activo) {
    throw new AppError("El participante está inactivo.", 400);
  }

  if (circulo.estado !== ESTADO_CIRCULO.ACTIVO) {
    throw new AppError("El círculo aún no comenzó.", 400);
  }

  const ronda = services.ronda.findRondaActual(circulo);

  if (ronda.estado === ESTADO_RONDA.CERRADA) {
    throw new AppError("La ronda ya fue cerrada.", 400);
  }

  if (ronda.estado === ESTADO_RONDA.VENCIDA) {
    throw new AppError("La ronda está vencida.", 400);
  }

  const yaPago = ronda.pagos.some((p) => p.participanteId === participanteId);

  if (yaPago) {
    throw new AppError("Este participante ya pagó esta ronda.", 400);
  }

  if (monto !== circulo.configuracion.montoCuota) {
    throw new AppError("El monto ingresado es incorrecto.", 400);
  }

  if (!circulo.configuracion.metodosDePago.includes(metodo)) {
    throw new AppError("El metodo de pago es incorrecto.", 400);
  }
  ronda.pagos.push({
    id: uuidv4(),
    participanteId,
    monto,
    metodo,
    fechaPago: new Date(),
    estado: ESTADO_PAGO.PAGADO,
    observaciones: null,
  });

  const pagoExitoso = {
    pagosRegistrados: ronda.pagos.length,

    pagosPendientes: circulo.participantes.length - ronda.pagos.length,
  };

  return pagoExitoso;
};

module.exports = {
  recordPago,
};
