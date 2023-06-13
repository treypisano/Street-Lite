const express = require("express");
const router = express.Router();
require("../../models/Event");
const mongoose = require("mongoose");
const Event = mongoose.model("Event");

// Create an event
router.post("/", (req, res) => {
  const newEvent = new Event(req.body);
  newEvent
    .save()
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Get all events
router.get("/", (req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Get a single event by ID
router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Update an event by ID
router.put("/:id", (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Delete an event by ID
router.delete("/:id", (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

module.exports = router;
