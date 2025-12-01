const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/', petController.getPets);
router.post('/', petController.createPet);
router.delete('/:id', petController.deletePet);

module.exports = router;
