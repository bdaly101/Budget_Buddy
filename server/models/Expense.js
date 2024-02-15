// Import the necessary functions from the mongoose package.
const { Schema, model } = require('mongoose');

// Define the schema for the Expense model.
const expenseSchema = new Schema({
  // The name field is of type String and is required for every Expense document.
  name: {
    type: String,
    required: false,
  },
  // The purchases field is an array of ObjectId references to documents in the Purchase collection.
  // This creates a relationship between Expense documents and Purchase documents.
  cost: {
    type: Number,
    required: true, // Assuming every purchase must have a cost
    
  },
});
// Static method to calculate total cost


const Expense = model('Expense', expenseSchema);

module.exports = Expense;
