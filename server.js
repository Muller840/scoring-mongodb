const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb+srv://<usuario>:<contraseña>@<tu-cluster>.mongodb.net/clientes', { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema del cliente
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

// Ruta para registrar clientes
app.post('/api/clientes', async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).send(cliente);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
