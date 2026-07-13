const { ESTADO_RONDA, ESTADO_CIRCULO } = require("../constants");
const AppError = require("../errors/AppErrors");
const services = require("./index");
const findRondaActual = (circulo) => {
  const ronda = circulo.ronda.find((r) => r.numero === circulo.rondaActual);
  verificarVencimiento(ronda);
  if (!ronda) {
    throw new AppError("La ronda no existe.", 400);
  }

  return ronda;
};

const verificarVencimiento = (ronda) => {
  if (ronda.estado !== ESTADO_RONDA.ABIERTA) {
    return;
  }

  const hoy = new Date();

  if (hoy > ronda.fechaLimite) {
    ronda.estado = ESTADO_RONDA.VENCIDA;
  }
};

const calcularFechaLimite = (diaVencimiento) => {
  const hoy = new Date();

  let fecha = new Date(hoy.getFullYear(), hoy.getMonth(), diaVencimiento);

  if (fecha < hoy) {
    fecha = new Date(hoy.getFullYear(), hoy.getMonth() + 1, diaVencimiento);
  }

  return fecha;
};

const cerrarRonda = (id, cobradorId) => {
  const circulo = services.circulo.findCirculoById(id);

  const ronda = services.ronda.findRondaActual(circulo);

  if (ronda.pagos.length !== circulo.participantes.length) {
    throw new AppError("Faltan participantes por pagar", 400);
  }

  if (ronda.estado === ESTADO_RONDA.CERRADA) {
    throw new AppError("La ronda ya está cerrada", 400);
  }

  const cobrador = circulo.participantes.find((p) => p.id === cobradorId);

  if (!cobrador) {
    throw new AppError("El cobrador no pertenece al círculo", 404);
  }

  const pago = ronda.pagos.find((p) => p.participanteId === cobradorId);

  if (!pago) {
    throw new AppError("El cobrador no pagó esta ronda", 400);
  }

  ronda.cobrador = cobradorId;
  ronda.estado = ESTADO_RONDA.CERRADA;
  ronda.fechaCierre = new Date();

  if (circulo.rondaActual < circulo.rondas.length) {
    circulo.rondaActual++;
    const siguienteRonda = services.ronda.findRondaActual(circulo);
    if (siguienteRonda) {
      siguienteRonda.estado = ESTADO_RONDA.ABIERTA;
      siguienteRonda.fechaInicio = new Date();
      siguienteRonda.fechaLimite = circulo.configuracion.diaVencimiento;
    }
    return {
      rondaCerrada: ronda.numero,
      proximaRonda: circulo.rondaActual,
      estado: circulo.estado,
    };
  } else {
    circulo.estado = ESTADO_CIRCULO.FINALIZADO;
    circulo.fechaFin = new Date();
    return {
      estado: circulo.estado,
    };
  }
};

module.exports = {
  findRondaActual,
  verificarVencimiento,
  calcularFechaLimite,
  cerrarRonda,
};
