const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.AUTH_JWT_SECRET || "secretx";

const userController = {
    // async getUsers(req, res) {
    //     try {
    //         const users = await userService.getAllUsers();
    //         res.json(users);
    //     } catch (err) {
    //         console.error("getUsers error:", err);
    //         res.status(500).json({ message: "Failed to fetch users" });
    //     }
    // },

    async getUser(req, res) {
        const userId = req.userInfo?.id;

        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // TODO dont return whole user object
            res.json(user);
        } catch (err) {
            console.error("getUser error:", err);
            res.status(500).json({ message: "Failed to fetch user" });
        }
    },

    async login(req, res) {
        try {
            const { email } = req.body;

            console.log('login');
            console.log(req.body);

            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
    
            let user = await userService.findByEmail(email);
    
            if (!user) {
                user = await userService.createUser(req.body); // TODO remove, testing only
                // return res.status(401).json({ message: "User not found" });
            }
    
            //  verify a password here
            // Generate a token or session cookie
            const token = jwt.sign(
                { id: user._id, email: user.email, name: user.name },
                JWT_SECRET,
                { expiresIn: 1000 * 60 * 60 * 16 }
            );

            // // Set HttpOnly cookie
            // res.cookie("auth_token", token, {
            //     httpOnly: true,
            //     secure: false,               //  TODO use true in production (HTTPS), set samesite too
            //     sameSite: "lax",
            //     maxAge: 1000 * 60 * 60 * 16 // 16 hrs
            // });

            // bearer token
            // res.json({ token });
    
            return res.status(200).json({ message: "Login successful", token });
        } catch (err) {
            console.error("login error:", err);
            res.status(500).json({ message: "Failed to login" });
        }
    },

    async logout(req, res) {
        try {
            // Overwrite the cookie with empty value + immediate expiration
            res.cookie("auth_token", "", {
                httpOnly: true,
                secure: false,        // same as login (set to true in prod)
                sameSite: "lax",
                expires: new Date(0)  // destroys cookie immediately
            });
    
            return res.status(200).json({ message: "Logout successful" });
        } catch (err) {
            console.error("logout error:", err);
            res.status(500).json({ message: "Failed to logout" });
        }
    },
    

    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            console.error("createUser error:", err);
            res.status(500).json({ message: "Failed to create user" });
        }
    },

    // async deleteUser(req, res) {
    //     try {
    //         const deleted = await userService.deleteUser(req.params.id);
    //         if (!deleted) {
    //             return res.status(404).json({ message: "User not found" });
    //         }
    //         res.json({ message: "User deleted" });
    //     } catch (err) {
    //         console.error("deleteUser error:", err);
    //         res.status(500).json({ message: "Failed to delete user" });
    //     }
    // },

    // async getUserProgress(req, res) {
    //     try {
    //         const userId = req.params.id;
    //         const progress = await userService.getUserProgress(userId);
    //         if (!progress) {
    //             return res.status(404).json({ message: "User not found" });
    //         }
    //         res.json(progress);
    //     } catch (err) {
    //         console.error("getUserProgress error:", err);
    //         res.status(500).json({ message: "Failed to fetch user progress" });
    //     }
    // },

    // async addOrUpdateProgress(req, res) {
    //     try {
    //         const userId = req.params.id;
    //         const progressData = req.body;
    //         const updatedProgress = await userService.addOrUpdateProgress(userId, progressData);
    //         if (!updatedProgress) {
    //             return res.status(404).json({ message: "User not found" });
    //         }
    //         res.json(updatedProgress);
    //     } catch (err) {
    //         console.error("addOrUpdateProgress error:", err);
    //         res.status(500).json({ message: "Failed to update progress" });
    //     }
    // }

    async setPreferredLanguage(req, res) {
        try {
            const userId = req.userInfo.id;
            const { lang } = req.body;
    
            if (!lang) {
                return res.status(400).json({ message: "Language is required" });
            }
    
            const updated = await userService.setPreferredLanguage(userId, lang);
            if (!updated) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.json({ message: "Preferred language updated" });
    
        } catch (err) {
            console.error("setPreferredLanguage error:", err);
            res.status(500).json({ message: "Failed to update language" });
        }
    }
    
};

module.exports = userController;
