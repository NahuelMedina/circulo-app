const registrarPago = (req, res, next) => {
  try {
    const resultadoPago = services.pago.recordPago(req.params.id, req.body);

    res.json({ mensaje: "Pago registrado.", resultadoPago });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrarPago,
};
