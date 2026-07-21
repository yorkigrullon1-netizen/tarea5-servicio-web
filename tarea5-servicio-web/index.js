const express = require("express");
const axios = require("axios");
const cors = require("cors");

console.log("ESTE ES MI INDEX");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_URL = "http://www.raydelto.org/agenda.php";

// Página principal
app.get("/", (req, res) => {
    res.send(`
        <h1>Servicio Web Agenda</h1>
        <p>El servidor está funcionando correctamente.</p>

        <h3>Endpoints disponibles:</h3>
        <ul>
            <li><a href="/contactos">GET /contactos</a></li>
            <li>POST /contactos</li>
        </ul>
    `);
});

// Listar contactos
app.get("/contactos", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error obteniendo contactos",
            error: error.message
        });
    }
});

// Guardar contacto
app.post("/contactos", async (req, res) => {

    const { nombre, apellido, telefono } = req.body;

    if (!nombre || !apellido || !telefono) {
        return res.status(400).json({
            mensaje: "Debe enviar nombre, apellido y telefono."
        });
    }

    try {

        const response = await axios.post(API_URL, {
            nombre,
            apellido,
            telefono
        });

        res.json({
            mensaje: "Contacto almacenado correctamente",
            respuesta: response.data
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error guardando contacto",
            error: error.message
        });

    }

});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});