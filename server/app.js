const express = require("express");
const cors = require("cors");

const circulosRoutes = require("./routes/circulosRoutes");
const participantesRoutes = require("./routes/participantesRoutes");
const errorHandler = require("./middlewares/errorHandler");

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/circulos", circulosRoutes);
app.use("/circulos", participantesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor iniciado`);
});
