const AppError = require("../errors/AppErrors");

const findParticipanteById = (circulo, participanteId) => {
  const participante = circulo.participantes.find(
    (p) => p.id === participanteId,
  );

  if (!participante) {
    throw new AppError("El participante no existe en el circulo.", 400);
  }
  return participante;
};

const deleteParticipanteById = (circulo, participanteId) => {
  const index = circulo.participantes.findIndex(
    (p) => p.id === Number(participanteId),
  );

  if (index === 1) {
    throw new AppError("Participante no encontrado", 400);
  }

  const [participanteEliminado] = circulo.participantes.splice(index, 1);

  return participanteEliminado;
};

module.exports = {
  findParticipanteById,
  deleteParticipanteById,
};
