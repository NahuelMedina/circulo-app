const { ESTADO_CIRCULO, ESTADO_RONDA } = require("../constants");
const circulos = require("../data/circulos");
const AppError = require("../errors/AppErrors");
const services = require("./index");
{
  ESTADO_CIRCULO;
}
const { v4: uuidv4 } = require("uuid");
const findCirculoById = (id) => {
  const circulo = circulos.find((c) => c.id === id);

  if (!circulo) {
    throw new AppError("El círculo no existe.", 404);
  }

  return circulo;
};

const deleteCirculoById = (id) => {
  const index = circulos.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new AppError("No existe el círculo.", 404);
  }

  const [circuloEliminado] = circulos.splice(index, 1);

  return circuloEliminado;
};

const getResumen = (id) => {
  const circulo = findCirculoById(id);
};

const updateDiaVencimiento = (id, diaVencimiento) => {
  const circulo = findCirculoById(id);

  if (circulo.estado !== ESTADO_CIRCULO.CONFIGURACION) {
    throw new AppError(
      "No se puede modificar el día de vencimiento una vez iniciado el círculo",
      400,
    );
  }

  if (diaVencimiento < 1 || diaVencimiento > 28) {
    throw new AppError("El día de vencimiento debe estar entre 1 y 28", 400);
  }

  circulo.configuracion.diaVencimiento = diaVencimiento;

  return circulo;
};

const createCirculo = (body) => {
  const { nombre, montoCuota, diaVencimiento } = body;

  if (diaVencimiento < 1 || diaVencimiento > 28) {
    throw new AppError("El día de vencimiento debe estar entre 1 y 28.", 400);
  }

  const nuevoCirculo = {
    id: uuidv4(),
    nombre,
    configuracion: {
      montoCuota,
      diaVencimiento,
      metodosDePago: ["efectivo", "transferencia", "mercado_pago"],
    },
    estado: ESTADO_CIRCULO.CONFIGURACION,
    participantes: [],
    ordenCobro: [],
    rondaActual: null,
    rondas: [],
  };

  circulos.push(nuevoCirculo);

  return nuevoCirculo;
};

const startCirculo = (id) => {
  const circulo = findCirculoById(id);

  if (circulo.estado !== ESTADO_CIRCULO.CONFIGURACION) {
    throw new AppError("El circulo ya fue iniciado", 400);
  }

  if (circulo.participantes.length < 3) {
    throw new AppError(
      "Debe haber al menos 3 participantes en el círculo",
      400,
    );
  }

  if (circulo.ordenCobro.length === 0) {
    throw new AppError("Debe definir el orden de cobro antes de iniciar.", 400);
  }

  if (circulo.ordenCobro.length !== circulo.participantes.length) {
    throw new AppError("El orden de cobro es erroneo", 400);
  }

  const rondas = circulo.ordenCobro.map((cobradorId, index) => {
    return {
      numero: index + 1,
      cobradorId,
      pagos: [],
      estado: ESTADO_RONDA.CONFIGURADA,
      fechaInicio: null,
      fechaLimite: null,
      fechaCierre: null,
    };
  });

  rondas[0].estado = ESTADO_RONDA.ABIERTA;
  rondas[0].fechaInicio = new Date();
  rondas[0].fechaLimite = services.ronda.calcularFechaLimite(
    circulo.configuracion.diaVencimiento,
  );
  circulo.rondaActual = 1;
  circulo.rondas = rondas;

  return circulo;
};

const defineOrdenManual = (id, orden) => {
  if (orden.length === 0) {
    return res.status(400).json({
      mensaje: "Debe indicar un orden de cobro.",
    });
  }
  const circulo = findCirculoById(id);

  if (circulo.estado !== ESTADO_CIRCULO.CONFIGURACION) {
    return res.status(400).json({
      mensaje: "No se puede modificar el orden.",
    });
  }

  if (orden.length !== circulo.participantes.length) {
    return res.status(400).json({
      mensaje: "El orden está incompleto.",
    });
  }

  const participantesIds = new Set(circulo.participantes.map((p) => p.id));
  const todosExisten = orden.every((id) => participantesIds.has(id));

  if (!todosExisten) {
    return res.status(400).json({
      mensaje: "Hay participantes inválidos.",
    });
  }

  const sinDuplicados = new Set(orden);

  if (sinDuplicados.size !== orden.length) {
    return res.status(400).json({
      mensaje: "Hay participantes repetidos.",
    });
  }

  circulo.ordenCobro = orden;

  return orden;
};

module.exports = {
  findCirculoById,
  deleteCirculoById,
  updateDiaVencimiento,
  createCirculo,
  startCirculo,
  defineOrdenManual,
};
