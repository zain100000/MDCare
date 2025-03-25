const Event = require('../models/event');

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { name, details, date, time, venue } = req.body;
        const event = new Event({ name, details, date, time, venue });
        await event.save();
        res.status(201).json({ success: true, message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating event', error });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching events', error });
    }
};

// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, event });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching event', error });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    try {
        const { name, details, date, time, venue } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { name, details, date, time, venue },
            { new: true, runValidators: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating event', error });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting event', error });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};
