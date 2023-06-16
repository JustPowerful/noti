const prisma = require("../prisma/client");

exports.addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    await prisma.note.create({
      data: {
        title: title,
        content: content,
        authorId: req.userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Successfully create a note.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an error creating a note.",
    });
  }
};

exports.updateNote = async (req, res) => {};

exports.deleteNote = async (req, res) => {};
