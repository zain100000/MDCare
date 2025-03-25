const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { isAuth } = require("../middleware/auth");
// Define routes
router.post('/create-event', isAuth, eventController.createEvent);
router.get('/get-all-events', isAuth, eventController.getAllEvents);
router.get('/get-event-by-id/:id', isAuth, eventController.getEventById);
router.put('/update-event/:id', isAuth, eventController.updateEvent);
router.delete('/delete-event/:id', isAuth, eventController.deleteEvent);

module.exports = router;
