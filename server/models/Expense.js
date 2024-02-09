// Import the necessary functions from the mongoose package.
const { Schema, model } = require('mongoose');

// Define the schema for the Expense model.
const expenseSchema = new Schema({
  // The name field is of type String and is required for every Expense document.
  name: {
    type: String,
    required: true,
  },
  // The purchases field is an array of ObjectId references to documents in the Purchase collection.
  // This creates a relationship between Expense documents and Purchase documents.
  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Purchase', // Specifies that the ObjectId references the Purchase model.
    },
  ],
});

// Create the Expense model using the defined schema.
const Expense = model('Expense', expenseSchema);

// Export the Expense model to make it available for import in other parts of the application.
module.exports = Expense;
