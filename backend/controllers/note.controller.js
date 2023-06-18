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

exports.getNotes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const PAGE_SIZE = 16;
  let COUNT = await prisma.note.aggregate({
    where: {
      authorId: req.userId,
    },
    _count: true,
  });
  COUNT = COUNT._count;
  const NUMBER_OF_PAGES = Math.ceil(COUNT / PAGE_SIZE);
  const nextPage = page < NUMBER_OF_PAGES ? Number(page) + 1 : null; // the next page number
  const prevPage = page > 1 ? Number(page) - 1 : null; // previous page number

  try {
    const notes = await prisma.note.findMany({
      where: {
        authorId: req.userId,
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    res.status(200).json({
      success: true,
      notes: notes,
      prevPage: prevPage,
      nextPage: nextPage,
      totalPages: Number(NUMBER_OF_PAGES),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "The server had a problem fetching the notes, please contact the admin.",
    });
  }
};

exports.updateNote = async (req, res) => {};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.note.deleteMany({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      message: "Successfully deleted a note.",
    });
  } catch (error) {
    throw error;
    res.status(500).json({
      success: false,
      message: "There was a problem when deleting the note.",
    });
  }
};
