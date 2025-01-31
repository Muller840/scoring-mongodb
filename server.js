const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<usuario>:<contraseña>@<tu-cluster>.mongodb.net/clientes', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const clienteSchema = new mongoose.Schema({
    ciCliente: String,
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    salario: Number,
    estadoCivil: String,
    nombreConyuge: String,
    salarioConyuge: Number
});

const Cliente = mongoose.model('Cliente', clienteSchema);

app.post('/api/clientes', async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).send(cliente);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
