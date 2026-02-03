import User from '../models/userModel.js';
import crypto from 'crypto';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.staus(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.create({ name, email, password });

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Registered successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken
        });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken
        });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -refreshTokens");
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token" });
        }

        const user = await User.findOne({ "refreshTokens.token": refreshToken });
        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newRefreshToken = user.generateRefreshToken();
        const newAccessToken = user.generateAccessToken();

        await User.updateOne(
            { _id: user._id },
            { $pull: { refreshTokens: { token: refreshToken } } }
        );

        await User.updateOne(
            { _id: user._id },
            { $push: { refreshTokens: { token: newRefreshToken } } }
        );

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ accessToken: newAccessToken });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        // const hashedToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

        await User.updateOne({ _id: req.user.id }, { $pull: { refreshTokens: { token: refreshToken } } });

        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        const token = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");

        user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`

        res.status(200).json({ resetLink });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Token expired or invalid" });
        }

        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.refreshTokens = [];

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}