const circulos = require("../data/circulos");
const services = require("../services");
const { v4: uuidv4 } = require("uuid");
// Obtener todos
const obtenerCirculos = (req, res) => {
  res.json(circulos);
};

// Obtener uno
const obtenerCirculo = (req, res, next) => {
  try {
    const { id } = req.params;

    const circulo = services.circulo.findCirculoById(id);

    res.json(circulo);
  } catch (error) {
    next(error);
  }
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
const eliminarCirculo = (req, res, next) => {
  try {
    const { id } = req.params;
    const circulo = services.circulo.deleteCirculoById(id);

    res.json({
      mensaje: "Eliminado correctamente",
      circulo,
    });
  } catch (error) {
    next(error);
  }
};

const crearRonda = (req, res, next) => {
  try {
    const { id } = req.params;

    const circulo = services.circulo.findCirculoById(id);

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
  } catch (error) {
    next(error);
  }
};

const iniciarCirculo = (req, res, next) => {
  try {
    const { id } = req.params;

    const circulo = services.circulo.findCirculoById(id);

    if (circulo.estado !== "configuracion") {
      return res.status(400).json({
        mensaje: "El circulo ya fue iniciado",
      });
    }

    if (circulo.participantes.length < 3) {
      return res.status(400).json({
        mensaje: "Debe haber al menos 3 participantes en el círculo",
      });
    }

    if (circulo.ordenCobro.length === 0) {
      return res.status(400).json({
        mensaje: "Debe definir el orden de cobro antes de iniciar.",
      });
    }

    if (circulo.ordenCobro.length !== circulo.participantes.length) {
      return res.status(400).json({
        mensaje: "El orden de cobro es erroneo",
      });
    }

    const rondas = circulo.ordenCobro.map((cobradorId, index) => {
      return {
        numero: index + 1,

        cobradorId,

        pagos: [],

        cerrada: false,

        fechaInicio: null,

        fechaCierre: null,
      };
    });

    circulo.rondas = rondas;

    circulo.estado = "activo";

    circulo.rondaActual = 1;

    circulo.fechaInicio = new Date();

    res.json({
      mensaje: "El círculo fue iniciado correctamente.",
      circulo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerCirculos,
  obtenerCirculo,
  crearCirculo,
  iniciarCirculo,
  eliminarCirculo,
  crearRonda,
};
