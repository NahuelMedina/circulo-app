const circulos = require("../data/circulos");
const AppError = require("../errors/AppErrors");

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

module.exports = {
  findCirculoById,
  deleteCirculoById,
};
