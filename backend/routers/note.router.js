const express = require("express");
const router = express.Router();

const controller = require("../controllers/note.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/add", authMiddleware, controller.addNote);
router.get("/get", authMiddleware, controller.getNotes);
router.put("/update", authMiddleware, controller.updateNote);
router.delete("/delete/:id", authMiddleware, controller.deleteNote);

module.exports = router;
