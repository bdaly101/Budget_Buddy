import React from 'react';

const SingleExpense = ({ purchases = [], expenseName, totalCost }) => {
  if (!purchases.length) {
    return <h3>No Purchases Yet</h3>;
  }

  return (
    <>
      <div className="p-5 display-inline-block" style={{ borderBottom: '1px dotted #1a1a1a' }}>
        <h3>Purchases</h3>
        <p>Expense Name: {expenseName}</p>
        <p>Total Cost: ${totalCost}</p>
      </div>
      <div className="flex-row my-4">
        {purchases.map((purchase) => (
          <div key={purchase._id} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              <p>{purchase.createdAt}</p>
              <p>{purchase.cost}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleExpense;

  