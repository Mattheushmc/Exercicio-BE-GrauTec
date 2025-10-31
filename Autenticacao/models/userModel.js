const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const users = [];

async function createUser(username, password, role = 'user') {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: uuidv4(), username, passwordHash, role };
    users.push(user);
    return user;
}

function findUserByUsername(username) {
    return users.find(u => u.username === username);
}

function findUserById(id) {
    return users.find(u => u.id === id);
}

module.exports = { users, createUser, findUserByUsername, findUserById };
