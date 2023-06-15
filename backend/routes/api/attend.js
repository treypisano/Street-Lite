const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Attend = mongoose.model("Attend");

router.get("/:id", async (req, res, next) => {
    Attend.find({postId: req.id})
        .then(events => res.json(events))
        .catch((err) => res.status(400).json({ error: err.message }));
})

router.post("/", async (req, res, next) => {
    
})

module.exports = router;