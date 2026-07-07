const AppError = require("../errors/AppErrors");

const findRondaActual = (circulo) => {
  const ronda = circulo.ronda.find((r) => r.numero === circulo.rondaActual);

  if (!ronda) {
    throw new AppError("La ronda no existe.", 400);
  }

  return ronda;
};

module.exports = {
  findRondaActual,
};
