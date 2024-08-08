import { match } from "assert";
import { model, Schema, Document } from "mongoose";
import { createHmac } from "node:crypto";

interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  hashedPassword: string;
  salt?: string | null;
  _password?: string;
  makeSalt: () => string;
  encryptPassword: (password: string) => string;
  authenticate: (plainText: string) => boolean;
}

const UserSchema = new Schema<IUser>({
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
  .set(function (password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods.authenticate = function (plainText: string) {
  return this.encryptPassword(plainText) === this.hashedPassword;
};

UserSchema.methods.encryptPassword = function (password: string) {
  if (!password) return "";
  try {
    return createHmac("sha1", this.salt).update(password).digest("hex");
  } catch (err) {
    return "";
  }
};

UserSchema.methods.makeSalt = function () {
  return Math.round(new Date().valueOf() * Math.random()) + "";
};

UserSchema.path("hashedPassword").validate(function (v: string) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, "Invalid password validation");

export default model("User", UserSchema);
