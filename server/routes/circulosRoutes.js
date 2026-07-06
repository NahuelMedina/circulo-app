const express = require("express");
const router = express.Router();

const controllers = require("../controllers");

router.get("/", controllers.circulos.obtenerCirculos);

router.get("/:id", controllers.circulos.obtenerCirculo);

router.post("/", controllers.circulos.crearCirculo);

router.post("/:id/rondas", controllers.circulos.crearRonda);

router.post("/:id/rondas/:numeroRonda/pagos", controllers.pagos.registrarPago);

router.post("/:id/orden/manual", controllers.orden.definirOrdenManual);

router.patch("/:id/rondas/:numeroRonda/cerrar", controllers.rondas.cerrarRonda);

router.delete("/:id", controllers.circulos.eliminarCirculo);

module.exports = router;
