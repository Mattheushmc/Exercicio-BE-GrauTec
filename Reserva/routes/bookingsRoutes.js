const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { authMiddleware, requireRole } = require('../middlewares/auth');

router.get('/', authMiddleware, requireRole('admin'), bookingsController.listBookings);
router.delete('/:id', authMiddleware, requireRole('admin'), bookingsController.deleteBooking);

module.exports = router;
