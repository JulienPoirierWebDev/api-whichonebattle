"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const node_crypto_1 = require("node:crypto");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please fill a valid email address",
        ],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required"],
    },
    salt: String,
});
UserSchema.virtual("password")
    .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
})
    .get(function () {
    return this._password;
});
UserSchema.methods.authenticate = function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
};
UserSchema.methods.encryptPassword = function (password) {
    if (!password)
        return "";
    try {
        return (0, node_crypto_1.createHmac)("sha1", this.salt).update(password).digest("hex");
    }
    catch (err) {
        return "";
    }
};
UserSchema.methods.makeSalt = function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
};
UserSchema.path("hashedPassword").validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate("password", "Password must be at least 6 characters.");
    }
    if (this.isNew && !this._password) {
        this.invalidate("password", "Password is required");
    }
}, "Invalid password validation");
exports.default = (0, mongoose_1.model)("User", UserSchema);
