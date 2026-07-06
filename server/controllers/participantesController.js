const circulos = require("../data/circulos");
const { v4: uuidv4 } = require("uuid");
// Agregar Participante
const agregarParticipante = (req, res) => {
  const { id } = req.params;
  const { nombre, telefono } = req.body;

  const circulo = circulos.find((c) => c.id === id);

  if (!circulo) {
    return res.status(404).json({
      mensaje: "Círculo no encontrado",
    });
  }

  const participante = {
    id: uuidv4(),
    nombre,
    telefono,
    activo: true,
  };

  circulo.participantes.push(participante);

  res.status(201).json(participante);
};

// Obtener participantes
const obtenerParticipantes = (req, res) => {
  const { id } = req.params;

  const circulo = circulos.find((c) => c.id === Number(id));

  if (!circulo) {
    return res.status(404).json({
      mensaje: "Círculo no encontrado",
    });
  }

  res.json(circulo.participantes);
};

// Eliminar participante
const eliminarParticipante = (req, res) => {
  const { id, participanteId } = req.params;

  const circulo = circulos.find((c) => c.id === Number(id));

  if (!circulo) {
    return res.status(404).json({
      mensaje: "Círculo no encontrado",
    });
  }

  const index = circulo.participantes.findIndex(
    (p) => p.id === Number(participanteId),
  );

  if (index === 1) {
    return res.status(404).json({
      mensaje: "Participante no encontrado",
    });
  }

  circulo.participantes.splice(index, 1);

  res.json({
    mensaje: "Participante eliminado",
  });
};

module.exports = {
  agregarParticipante,
  obtenerParticipantes,
  eliminarParticipante,
};
