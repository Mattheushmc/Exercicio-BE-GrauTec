const express = require("express");
const router = express.Router();


let users = [
    { id: 1, name: "Ana Silva", email: "ana@email.com" },
    { id: 2, name: "Carlos Souza", email: "carlos@email.com" },
    { id: 3, name: "Mariana Lima", email: "mariana@email.com" }
];

router.get("/", (req, res) => {
    const name = req.query.name?.toLowerCase();
    if (name) {
        const filtrados = users.filter(u => u.name.toLowerCase().includes(name));
        return res.json(filtrados);
    }
    res.json(users);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
});

router.post("/", (req, res) => {
    const { id, name, email } = req.body;

    if (!id || typeof id !== "number") {
        return res.status(400).json({ error: "ID é obrigatório e deve ser numérico" });
    }
    if (!name || name.length < 3) {
        return res.status(400).json({ error: "Nome é obrigatório e deve ter no mínimo 3 letras" });
    }
    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Email é obrigatório e deve ser válido" });
    }

    const novoUser = { id, name, email };
    users.push(novoUser);

    res.status(201).json(novoUser);
});

module.exports = router;
