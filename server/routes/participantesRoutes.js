const express = require("express");
const router = express.Router();

const controllers = require("../controllers");

router.get(
  "/:id/participantes",
  controllers.participantes.obtenerParticipantes,
);

router.post(
  "/:id/participantes",
  controllers.participantes.agregarParticipante,
);

router.delete(
  "/:id/participantes/:participanteId",
  controllers.participantes.eliminarParticipante,
);

module.exports = router;
