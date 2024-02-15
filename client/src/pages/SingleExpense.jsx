import React, { useState, useEffect } from 'react';

const SingleExpense = ({ purchases = [], selectedExpenseName, totalCost, onUpdateExpense, onAddPurchase }) => {
  // State variables to manage the component's internal state
  const [newExpenseName, setNewExpenseName] = useState(selectedExpenseName);
  const [newTotalCost, setNewTotalCost] = useState(totalCost);
  const [newPurchase, setNewPurchase] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [purchaseList, setPurchaseList] = useState(purchases);

  // useEffect to update local state when selectedExpenseName or totalCost change
  useEffect(() => {
    if (selectedExpenseName !== null && totalCost !== null) {
      setNewExpenseName(selectedExpenseName);
      setNewTotalCost(totalCost);
      console.log('Expense Name:', selectedExpenseName);
    }
  }, [selectedExpenseName, totalCost]);

  // Handler for updating the expense details
  const handleUpdateExpense = () => {
    if (newExpenseName.trim() !== '' && newTotalCost.trim() !== '') {
      onUpdateExpense(newExpenseName, parseFloat(newTotalCost));
    } else {
      console.log('Invalid input for updating expense.');
    }
  };

  // Handler for adding a new purchase
  const handleAddPurchase = () => {
    if (newPurchase.trim() !== '' && purchaseCost.trim() !== '') {
      const newPurchaseItem = {
        _id: purchaseList.length + 1,
        createdAt: new Date().toLocaleString(),
        item: newPurchase,
        cost: parseFloat(purchaseCost),
      };

      // Updating purchaseList with the new purchase item
      setPurchaseList((prevPurchases) => [...prevPurchases, newPurchaseItem]);
      // Callback to parent component to handle the addition of a purchase
      onAddPurchase(newPurchaseItem);
      // Resetting input fields
      setNewPurchase('');
      setPurchaseCost('');
    } else {
      console.log('Invalid input for adding purchase.');
    }
  };

  return (
    <>
      {/* Expense Details Section */}
      <div className="p-5 border-b">
        <h2 className="text-2xl font-semibold mb-4">Expense Details</h2>
        <div className="mb-2">
          <span className="font-semibold">Expense Name:</span> {selectedExpenseName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Total Cost:</span> ${newTotalCost}
        </div>
      </div>

      {/* Add Purchase Section */}
      <div className="my-4">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold mb-2">Add Purchase</h3>
          {/* Input field for purchase item */}
          <input
            type="text"
            value={newPurchase}
            onChange={(e) => setNewPurchase(e.target.value)}
            placeholder="Enter purchase item"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {/* Input field for purchase cost */}
          <input
            type="text"
            value={purchaseCost}
            onChange={(e) => setPurchaseCost(e.target.value)}
            placeholder="Enter purchase cost"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {/* Button to add a new purchase */}
          <button
            onClick={handleAddPurchase}
            className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            Add Purchase
          </button>
        </div>

        {/* Displaying the list of purchases */}
        {purchaseList.map((purchase) => (
          <div key={purchase._id} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              <p>{purchase.createdAt}</p>
              <p>Item: {purchase.item}</p>
              <p>Cost: ${purchase.cost}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleExpense;
