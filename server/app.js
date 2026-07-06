const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

const circulosRoutes = require("./routes/circulosRoutes");
const participantesRoutes = require("./routes/participantesRoutes");

app.use("/circulos", circulosRoutes);
app.use("/circulos", participantesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado`);
});
