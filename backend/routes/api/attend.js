const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Attend = mongoose.model("Attend");

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    const attend = await Attend.find({eventId: id})

    res.json(attend)
})

router.post("/", async (req, res, next) => {
    const attend = new Attend({userId: req.body.userId, eventId: req.body.eventId})

    await attend.save()
})

module.exports = router;