const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // verify required fields
  if (!username || !email || !password) {
    return res.status(403).json({
      success: false,
      message: "Please fill all the required fields!",
    });
  }

  // verify email and username if exists
  const emailExists = await prisma.user.findMany({
    where: {
      email: email,
    },
  });
  const usernameExists = await prisma.user.findMany({
    where: {
      username: username,
    },
  });

  if (usernameExists.length > 0)
    return res.status(409).json({
      success: false,
      message: "Username already exists!",
    });

  if (emailExists.length > 0) {
    return res.status(409).json({
      success: false,
      message: "Email already exists!",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
    res.status(200).json({
      success: true,
      message: "You're successfully registered, please login.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "There was a registering problem in the server please contact the admin.",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(401).json({
      success: false,
      message: "Please fill the required fields!",
    });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User with this email was not found!",
    });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIME,
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_REFRESH_SECRET
    );

    await prisma.authRefresh.create({
      data: {
        userId: user.id,
        refreshToken: refreshToken,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Successfully logged in.",
      token,
      refreshToken,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Password is incorrect.",
    });
  }
};

// Copied it from my other project
// There's a potential that there's a bug
// Please check later
exports.refresh = async (req, res) => {
  const token = req.headers["x-access-token"];
  const refreshToken = req.headers["x-refresh-token"];
  jwt.verify(token, process.env.JWT_SECRET, async function (error, decoded) {
    if (error) {
      const exists = await prisma.authRefresh.findFirst({
        where: {
          refreshToken,
        },
      });
      if (exists) {
        jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET,
          async (error, decoded) => {
            if (error) {
              return res.status(401).json({
                success: false,
                message: "You're not authorized: refresh token expired.",
              });
            }
            const user = await prisma.user.findFirst({
              where: {
                id: exists.userId,
              },
            });
            const newToken = jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_TIME,
              }
            );
            return res.json({
              success: true,
              token: newToken,
            });
          }
        );
      } else {
        return res.status(403).json({
          success: false,
          message: "User not authorized: old refresh token.",
        });
      }
    } else {
      return res.json({
        success: true,
        token: token,
      });
    }
  });
};
