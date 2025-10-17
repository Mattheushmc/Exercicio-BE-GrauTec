let users = [];

exports.createUser = async (req, res, next) => {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            return res.status(422).json({ message: "Nome e email são obrigatórios." });
        }

        const emailExiste = users.find((u) => u.email === email);
        if (emailExiste) {
            return res.status(400).json({ message: "Email já cadastrado." });
        }

        const newUser = {
            id: users.length + 1,
            nome,
            email,
        };

        users.push(newUser);
        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = users.find((u) => u.id === Number(id));

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
