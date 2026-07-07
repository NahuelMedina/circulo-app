const services = require("../services");
const { v4: uuidv4 } = require("uuid");

// Agregar Participante
const agregarParticipante = (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono } = req.body;

    const circulo = services.circulo.findCirculoById(id);

    const participante = {
      id: uuidv4(),
      nombre,
      telefono,
      activo: true,
    };

    circulo.participantes.push(participante);

    res.status(201).json(participante);
  } catch (error) {
    next(error);
  }
};

// Obtener participantes
const obtenerParticipantes = (req, res) => {
  try {
    const { id } = req.params;

    const circulo = services.circulo.findCirculoById(id);

    res.json(circulo.participantes);
  } catch (error) {
    next(error);
  }
};

// Eliminar participante
const eliminarParticipante = (req, res) => {
  try {
    const { id, participanteId } = req.params;

    const circulo = services.circulo.findCirculoById(id);
    const participante = services.participante.deleteParticipanteById(
      circulo,
      participanteId,
    );

    res.json({
      mensaje: "Participante eliminado",
      participante,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  agregarParticipante,
  obtenerParticipantes,
  eliminarParticipante,
};
