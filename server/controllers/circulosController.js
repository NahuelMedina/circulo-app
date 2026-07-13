const circulos = require("../data/circulos");
const services = require("../services");

// Obtener todos
const obtenerCirculos = (req, res) => {
  res.json(circulos);
};

// Obtener uno
const obtenerCirculo = (req, res, next) => {
  try {
    const circulo = services.circulo.findCirculoById(req.params.id);

    res.json(circulo);
  } catch (error) {
    next(error);
  }
};

// Crear
const crearCirculo = (req, res, next) => {
  try {
    const nuevoCirculo = services.circulo.createCirculo(req.body);
    res.status(201).json({
      mensaje: "El círculo fue iniciado correctamente.",
      nuevoCirculo,
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar
const eliminarCirculo = (req, res, next) => {
  try {
    const circulo = services.circulo.deleteCirculoById(req.params.id);

    res.json({ mensaje: "Circulo eliminado correctamente.", circulo });
  } catch (error) {
    next(error);
  }
};

const iniciarCirculo = (req, res, next) => {
  try {
    const circuloIniciado = services.circulo.startCirculo(req.params.id);
    res.json({ mensaje: "Círculo iniciado con exito.", circuloIniciado });
  } catch (error) {
    next(error);
  }
};

const actualizarDiaVencimiento = (req, res, next) => {
  try {
    const circulo = services.circulo.updateDiaVencimiento(
      req.params.id,
      req.body.diaVencimiento,
    );

    res.json({
      mensaje: "Día de vencimiento actualizado correctamente",
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
  actualizarDiaVencimiento,
};
