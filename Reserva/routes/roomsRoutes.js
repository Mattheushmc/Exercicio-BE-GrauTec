const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');
const bookingsController = require('../controllers/bookingsController');
const { authMiddleware, requireRole } = require('../middlewares/auth');
const validateRoomsQuery = require('../middlewares/validateRoomsQuery');

router.get('/', authMiddleware, validateRoomsQuery, roomsController.getRooms);
router.post('/', authMiddleware, requireRole('admin'), roomsController.createRoom);

router.post('/:id/bookings', authMiddleware, bookingsController.createBooking);

module.exports = router;
