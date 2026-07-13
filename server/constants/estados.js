const ESTADO_CIRCULO = {
  CONFIGURACION: "configuracion",
  ACTIVO: "activo",
  FINALIZADO: "finalizado",
};

const ESTADO_RONDA = {
  CONFIGURADA: "configurada",
  ABIERTA: "abierta",
  VENCIDA: "vencida",
  CERRADA: "cerrada",
};

const ESTADO_PAGO = {
  PAGADO: "pagado",
  DEUDA: "deuda",
  PRORROGA: "prorroga",
  CONDONADO: "condonado",
};

module.exports = {
  ESTADO_CIRCULO,
  ESTADO_RONDA,
  ESTADO_PAGO,
};
