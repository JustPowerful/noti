const prisma = require("../prisma/client");

exports.getUserData = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        email: true,
        id: true,
        username: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "Successfully fetched the user data.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was a server problem when fetching user data.",
    });
  }
};
