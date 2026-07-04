import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        avatar: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["ACTIVE", "BLOCKED"],
            default: "ACTIVE",
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        refreshToken: {
            type: String,
            default: null,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);
// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", userSchema);
export default User;