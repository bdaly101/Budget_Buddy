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
}, {
  toJSON: { virtuals: true }, // Enable virtuals when document is converted to JSON
  toObject: { virtuals: true }, // Enable virtuals when document is converted to a plain object
});
// Static method to calculate total cost
expenseSchema.statics.calculateTotalCost = async function(expenseId) {
  const result = await this.aggregate([
    { $match: { _id: expenseId } },
    { $lookup: {
        from: 'purchases', 
        localField: 'purchases',
        foreignField: '_id',
        as: 'purchaseDetails'
      }
    },
    { $unwind: '$purchaseDetails' },
    { $group: {
        _id: '$_id',
        totalCost: { $sum: '$purchaseDetails.cost' },
        name: { $first: '$name' }
      }
    }
  ]);

  return result.length > 0 ? result[0] : null;
};

const Expense = model('Expense', expenseSchema);

module.exports = Expense;
