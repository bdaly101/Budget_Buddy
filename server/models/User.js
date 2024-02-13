const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      unique: false, // Typically, first names are not unique.
    },
    lastName: {
      type: String,
      required: true,
      unique: false, // Similarly, last names are not unique.
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    budget: {
      type: Number, 
      required: true,
    },
    expenses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Expense', // References documents from the Expense collection.
      },
    ],
  },
);

// Middleware to hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Method to validate a user's password during login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

