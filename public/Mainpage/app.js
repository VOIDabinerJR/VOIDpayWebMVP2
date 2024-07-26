const express = require('express');
const path = require('path');

const app = express();

// Definir a pasta 'public' para servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
