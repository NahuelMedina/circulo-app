const circulos = require("../data/circulos");
const { v4: uuidv4 } = require("uuid");
// Obtener todos
const obtenerCirculos = (req, res) => {
  res.json(circulos);
};

// Obtener uno
const obtenerCirculo = (req, res) => {
  const { id } = req.params;

  const circulo = circulos.find((c) => c.id === id);

  if (!circulo) {
    return res.status(404).json({
      mensaje: "Círculo no encontrado",
    });
  }

  res.json(circulo);
};

// Crear
const crearCirculo = (req, res) => {
  const { nombre, montoCuota } = req.body;

  const nuevoCirculo = {
    id: uuidv4(),
    nombre,
    montoCuota,
    estado: "configuracion",
    participantes: [],
    ordenCobro: [],
    rondaActual: 1,
    rondas: [],
  };

  circulos.push(nuevoCirculo);

  res.status(201).json(nuevoCirculo);
};

// Eliminar
const eliminarCirculo = (req, res) => {
  const { id } = req.params;

  const index = circulos.findIndex((c) => c.id === Number(id));

  if (index === -1) {
    return res.status(404).json({
      mensaje: "No existe",
    });
  }

  circulos.splice(index, 1);

  res.json({
    mensaje: "Eliminado correctamente",
  });
};

const crearRonda = (req, res) => {
  const { id } = req.params;

  const circulo = circulos.find((c) => c.id === id);

  if (!circulo) {
    return res.status(404).json({
      mensaje: "Círculo no encontrado",
    });
  }

  if (!circulo.rondas) {
    circulo.rondas = [];
  }

  const ronda = {
    numero: circulo.rondas.length + 1,
    fechaInicio: new Date(),
    fechaCierre: null,
    pagos: [],
    cobrador: null,
    cerrada: false,
  };

  circulo.rondas.push(ronda);

  res.status(201).json(ronda);
};

module.exports = {
  obtenerCirculos,
  obtenerCirculo,
  crearCirculo,
  eliminarCirculo,
  crearRonda,
};
