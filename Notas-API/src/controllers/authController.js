export const users = [];

export const registerController = (req, res) => {
    const { email, senha } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).send({ message: 'Email já cadastrado' });
    }
    users.push({ email, senha, notas: [] });
    res.status(201).send({ message: 'Usuário cadastrado' });
};

export const loginController = (req, res) => {
    const { email, senha } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || user.senha !== senha) {
        return res.status(400).send({ message: 'Email ou senha incorreta' });
    }
    req.session.user = email;
    res.status(200).send({ message: 'Login feito' });
};
