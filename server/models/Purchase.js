const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Define the schema for the Purchase model
const purchaseSchema = new Schema({
  // Define the importance field with specific allowed values
  importance: {
    type: String,
    enum: ['low', 'medium', 'high'], // Correctly specify the allowed values for the importance field
  },
  cost: {
    type: Number,
    required: true, // Assuming every purchase must have a cost
    min: 0, // Optional: Define a minimum cost value
  },
  // Define the createdAt field with a default value and a custom getter
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
    get: (timestamp) => dateFormat(timestamp), // Use the custom getter to format the date
  },
}, {
  toJSON: { getters: true },
});

const Purchase = model('Purchase', purchaseSchema);

module.exports = Purchase;

