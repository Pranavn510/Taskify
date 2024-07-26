import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

/*userSchema.pre() function is a Mongoose middleware that runs before a specific operation on the schema. In this case, it is running before the "save" operation.

What userSchema.pre() Does
Middleware Hook: The pre method is a middleware hook in Mongoose that allows you to run some custom logic before a certain action. In this case, it runs before saving a user document to the database.

Password Hashing: When a user document is saved, this middleware checks if the password field has been modified. If it has, the middleware generates a salt and hashes the password before saving it to the database.*/

//This middleware is defined to run before a user document is saved.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//This sets up a pre-save middleware. The code inside this function will run before a user document is saved to the database.
/*Generating and Applying the Hash:

const salt = await bcrypt.genSalt(10);: Generates a salt with 10 rounds.
this.password = await bcrypt.hash(this.password, salt);: Hashes the password using the generated salt and sets the hashed password as the user's password. */

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
