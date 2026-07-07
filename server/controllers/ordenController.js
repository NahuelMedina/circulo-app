const services = require("../services");
const definirOrdenManual = (req, res) => {
  try {
    const { id } = req.params;
    const { orden } = req.body;

    if (orden.length === 0) {
      return res.status(400).json({
        mensaje: "Debe indicar un orden de cobro.",
      });
    }
    const circulo = services.circulo.findCirculoById(id);

    if (circulo.estado !== "configuracion") {
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

    res.json({
      mensaje: "Orden guardado correctamente.",
      orden,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  definirOrdenManual,
};
