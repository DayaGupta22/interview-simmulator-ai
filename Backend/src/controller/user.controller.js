// const User = require('../models/user.models')
// const tokenBlackListModel = require("../models/blacklist.model")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// /**
//  * @post 
//  * @description register a new user expects username email password
//  * @name registeruser
//  * @access public 
//  * @
//  */
// async function registerUser(req, res) {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//         return res.status(400).json({
//             message: "provide the username email and password"
//         })
//     }
//     const Isuser = await User.findOne({
//         $or: [{ username }, { email }]
//     });
//     if (Isuser) {
//         return res.status(400).json({
//             message: "user already exist with  this username or email"
//         })
//     }
//     const hash = await bcrypt.hash(password, 10);
//     const user = await User.create({
//         username,
//         email,
//         password: hash
//     })
//     const token = jwt.sign({
//         id: user._id,
//         username: user.username
//     },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )
//     res.cookie("token", token)
//     return res.status(201).json({
//         message: "user registerd successfully",
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     })
// }
// /**
//  * @post 
//  * @description login  user expects username email password
//  * @name loginuser
//  * @access public 
//  * @
//  */
// async function loginUser(req, res) {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(400).json({
//             message: "user not Found used original details"
//         })
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(400).json({
//             message: "invalid password or emails"
//         })
//     }
//     const token = jwt.sign(
//         {
//             id: user._id,
//             username: user.username
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )
//     res.cookie("token", token)
//     return res.status(200).json({
//         message: 'user logged succesfully',
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     })
// }
// /**
//  * @post 
//  * @description logout user to clear the token on cookies and adding some functionality
//  * @name Logoutuser using token blacklisting
//  * @access private
//  * @
//  */
// async function logoutUser(req, res) {
//     const token = req.cookies.token;
//     if (token) {
//         await tokenBlackListModel.create({ token })
//     }
//     res.clearCookie("token");
//     return res.status(200).json({
//         message: "user logged out successfully"
//     })

// }
// /**
//  * @controller for get the details of user
//  * @route get
//  * @description provide the data about the user 
//  * 
//  */

// async function getMe(req, res) {
//     try {
//         const user = await User.findById(req.user.id);

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found ❌"
//             });
//         }

//         res.status(200).json({
//             message: "User fetched successfully ✅",
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Server error ❌"
//         });
//     }
// };
// module.exports = { registerUser, loginUser, logoutUser, getMe }


const User = require("../models/user.models");
const tokenBlackListModel = require("../models/blacklist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔐 Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: false, // true in production (HTTPS)
  sameSite: "strict",
};

// ================= REGISTER =================
// async function registerUser(req, res) {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({
//         message: "Provide username, email and password",
//       });
//     }

//     const existingUser = await User.findOne({
//       $or: [{ username }, { email }],
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists with this username or email",
//       });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username,
//       email,
//       password: hash,
//     });

//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, cookieOptions);

//     return res.status(201).json({
//       message: "User registered successfully ✅",
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({
//       message: "Server error ❌",
//     });
//   }
// }
async function registerUser(req, res) {
  console.log(req.body);
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "provide username, email and password"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "strict"
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

// ================= LOGIN =================
async function loginUser(req, res) {
  console.log(req.body)
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "User logged in successfully ✅",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Server error ❌",
    });
  }
}

// ================= LOGOUT =================
async function logoutUser(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await tokenBlackListModel.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully ✅",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({
      message: "Server error ❌",
    });
  }
}

// ================= GET ME =================
async function getMe(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized ❌",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully ✅",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    res.status(500).json({
      message: "Server error ❌",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};