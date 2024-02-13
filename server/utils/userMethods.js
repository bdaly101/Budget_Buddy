const moment = require('moment'); // Moment.js is great for handling dates

// Utility function to get time frame start dates
function getStartDate(timeFrame) {
  switch (timeFrame) {
    case 'today':
      return moment().startOf('day').toDate();
    case 'week':
      return moment().startOf('week').toDate();
    case 'month':
      return moment().startOf('month').toDate();
    case 'year':
      return moment().startOf('year').toDate();
    default: // 'all' or undefined timeFrame
      return new Date(0); // Very start of Unix epoch, essentially includes all time
  }
}

// Function to calculate total spending
async function calculateTotalSpending(userId, timeFrame) {
  const startDate = getStartDate(timeFrame);

  const result = await Purchase.aggregate([
    {
      $match: {
        userId: userId,
        createdAt: { $gte: startDate } // Filter purchases from the start of the time frame
      }
    },
    {
      $group: {
        _id: null,
        totalSpending: { $sum: '$cost' }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalSpending : 0;
}

async function calculateSpendingByExpense(userId, expenseId, timeFrame) {
    const startDate = getStartDate(timeFrame);
  
    const result = await Expense.aggregate([
      { $match: { _id: expenseId, userId: userId } },
      { $lookup: {
          from: 'purchases',
          localField: 'purchases',
          foreignField: '_id',
          as: 'matchedPurchases'
        }
      },
      { $unwind: '$matchedPurchases' },
      { $match: { 'matchedPurchases.createdAt': { $gte: startDate } } },
      { $group: {
          _id: '$_id',
          totalSpending: { $sum: '$matchedPurchases.cost' }
        }
      }
    ]);
  
    return result.length > 0 ? result[0].totalSpending : 0;
  }
  