const Pet = require('../models/Pet');

module.exports = {
  async getPets(req, res) {
    const pets = await Pet.findAll();
    res.json(pets);
  },

  async createPet(req, res) {
    const { name, type, age } = req.body;
    const pet = await Pet.create({ name, type, age });
    res.status(201).json(pet);
  },

  async deletePet(req, res) {
    const { id } = req.params;
    const deleted = await Pet.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Pet não encontrado" });
    }

    res.json({ message: "Pet removido com sucesso" });
  }
};