const services = require("../services");

// Agregar Participante
const agregarParticipante = (req, res, next) => {
  try {
    const participante = services.participante.addParticipante(
      req.params.id,
      req.body,
    );
    res
      .status(201)
      .json({ mensaje: "Participante agregado exitosamente.", participante });
  } catch (error) {
    next(error);
  }
};

// Obtener participantes
const obtenerParticipantes = (req, res, next) => {
  try {
    const circulo = services.circulo.findCirculoById(req.params.id);

    res.json(circulo.participantes);
  } catch (error) {
    next(error);
  }
};

// Eliminar participante
const eliminarParticipante = (req, res, next) => {
  try {
    const participante = services.participante.deleteParticipanteById(
      req.params.id,
      req.params.participanteId,
    );

    res.json({ mensaje: "Participante eliminado", participante });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  agregarParticipante,
  obtenerParticipantes,
  eliminarParticipante,
};
