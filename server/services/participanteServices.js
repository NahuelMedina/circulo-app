const AppError = require("../errors/AppErrors");
const services = require("./index");
const { v4: uuidv4 } = require("uuid");
const findParticipanteById = (circulo, participanteId) => {
  const participante = circulo.participantes.find(
    (p) => p.id === participanteId,
  );

  if (!participante) {
    throw new AppError("El participante no existe en el circulo.", 400);
  }
  return participante;
};

const deleteParticipanteById = (id, participanteId) => {
  const circulo = services.circulo.findCirculoById(id);
  const index = circulo.participantes.findIndex(
    (p) => p.id === Number(participanteId),
  );

  if (index === 1) {
    throw new AppError("Participante no encontrado", 400);
  }

  const [participanteEliminado] = circulo.participantes.splice(index, 1);

  return participanteEliminado;
};

const addParticipante = (id, body) => {
  const { nombre, telefono } = body;
  const circulo = services.circulo.findCirculoById(id);
  const participante = {
    id: uuidv4(),
    nombre,
    telefono,
    activo: true,
  };

  circulo.participantes.push(participante);

  return participante;
};

module.exports = {
  findParticipanteById,
  deleteParticipanteById,
  addParticipante,
};
