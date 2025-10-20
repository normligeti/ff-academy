const userService = require("../services/userService");
const axios = require("axios");

const MOCK_EXTERNAL_URL = "http://localhost:5005/external-api/login";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Forward request to external API (mock for now)
    // const response = await axios.post(MOCK_EXTERNAL_URL, { email, password });
    const response = {
        data: {
            valid: true,
            userId: "abc123",
            email: "test@example.com",
            name: "Very User"
        }
    }

    if (!response.data.valid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const { userId, email: validatedEmail, name } = response.data;

    // Step 2: check in your DB
    let user = await userService.getUserByExternalId(userId);

    // Step 3: if not exists, create
    if (!user) {
        user = await userService.createUser({
            externalId: userId,
            email: validatedEmail,
            name: name
        });
    }

    // Step 4: issue session / token
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const token = 'token'

    res.json({ message: "Login successful", token, user });

  } catch (err) {
    console.error("Login forward error:", err.message);
    res.status(500).json({ message: "Login service unavailable" });
  }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { loginUser, getUsers, createUser, getUser, deleteUser };
