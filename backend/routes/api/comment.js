const express = require("express");
const router = express.Router();
require("../../models/Comment");
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

// Create a new comment
router.post("/", async (req, res) => {
  try {
    const { userId, eventId, body } = req.body;
    const newComment = new Comment({
      userId,
      eventId,
      body,
    });
    let comment = await newComment.save();
    // const comment = await Comment.create({ userId, eventId, body });
    return res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
  //   const newComment = new Comment(req.body);

  //   newComment
  //     .save()
  //     .then((comment) => res.json(comment))
  //     .catch((err) =>
  //       res.status(500).json({ error: "Failed to create comment" })
  //     );
});

// Update a comment
router.put("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      id,
      { body },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const comments = await Comment.find({ eventId: eventId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

module.exports = router;
