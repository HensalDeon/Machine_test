import UserModel from "../model/userModel.js";
import { comparePassword, hashPassword } from "../config/security.js";

// Registering a new User
export const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new UserModel({ username, password: hashedPassword, email });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// login User
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
