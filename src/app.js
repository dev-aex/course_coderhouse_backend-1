import express from "express";

const APP = express();
const PORT = 8080;

APP.get("/hola", (req, res) => {
    res.send("Todo bien");
});

APP.listen(PORT, () => {
    console.log(`Ejecutando servidor en: http://localhost:${PORT}`);
});
