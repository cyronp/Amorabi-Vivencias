const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});