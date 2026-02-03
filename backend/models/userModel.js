import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const refreshTokenSchema = new mongoose.Schema({
    token: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    refreshTokens: [refreshTokenSchema],

    passwordResetToken: String,
    passwordResetExpires: Date
},
    { timestamps: true }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
};

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
        { id: this._id, role: this.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    this.refreshTokens.push({ token });
    return token;
};

export default mongoose.model("User", userSchema);