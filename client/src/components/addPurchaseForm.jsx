import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { ADD_PURCHASE, CREATE_EXPENSE } from '../../utils/mutations';
import { QUERY_EXPENSES } from '../../utils/queries'; // Ensure the correct path
import Auth from '../../utils/auth';

const PurchaseForm = () => {
  const [purchaseText, setPurchaseText] = useState('');
  const [characterCount, setCharacterCount] = useState(0); // Assuming you want to use it later
  const [newExpenseName, setNewExpenseName] = useState('');
  const [selectedExpenseId, setSelectedExpenseId] = useState('');
  const [addToExisting, setAddToExisting] = useState(true);

  const [addPurchase] = useMutation(ADD_PURCHASE);
  const [createExpense] = useMutation(CREATE_EXPENSE);
  const { data: expensesData } = useQuery(QUERY_EXPENSES); // Fetch expenses
  const expenses = expensesData?.expenses || []; // Assuming your query stores expenses in an array

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!purchaseText) return;

    try {
      if (addToExisting && selectedExpenseId) {
        await addPurchase({
          variables: {
            expenseId: selectedExpenseId,
          },
        });
      } else {
        const userId = Auth.getProfile().data._id;
        const { data: expenseData } = await createExpense({
          variables: {
            name: newExpenseName, // Use the dynamically set expense name
            userId: userId,
          },
        });

        if (expenseData) {
          await addPurchase({
            variables: {
              expenseId: expenseData.createExpense._id,
            },
          });
        }
      }

      setPurchaseText('');
      setCharacterCount(0);
      setSelectedExpenseId('');
      setNewExpenseName(''); // Reset the new expense name field
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'purchaseText') {
      setPurchaseText(value);
      setCharacterCount(value.length);
    } else if (name === 'selectedExpense') {
      setSelectedExpenseId(value);
    } else if (name === 'newExpenseName') {
      setNewExpenseName(value);
    }
  };

  const toggleExpenseOption = () => {
    setAddToExisting(!addToExisting);
    setSelectedExpenseId('');
    setNewExpenseName('');
  };

  return (
    <div>
      <h4>Add a Purchase!</h4>

      {Auth.loggedIn() ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <div className="form-check">
              <input
                type="radio"
                name="expenseOption"
                id="existingExpense"
                checked={addToExisting}
                onChange={toggleExpenseOption}
              />
              <label htmlFor="existingExpense">Add to an Existing Expense</label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                name="expenseOption"
                id="newExpense"
                checked={!addToExisting}
                onChange={toggleExpenseOption}
              />
              <label htmlFor="newExpense">Add as a New Expense</label>
            </div>

            {addToExisting ? (
              <div className="col-12">
                <select
                  name="selectedExpense"
                  value={selectedExpenseId}
                  onChange={handleChange}
                  className="form-input w-100"
                >
                  <option value="">Select an Expense</option>
                  {expenses.map((expense) => (
                    <option key={expense._id} value={expense._id}>
                      {expense.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="col-12">
                <input
                  type="text"
                  name="newExpenseName"
                  placeholder="New Expense Name"
                  value={newExpenseName}
                  className="form-input w-100"
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="col-12">
              <textarea
                name="purchaseText"
                placeholder="Add your purchase details..."
                value={purchaseText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Purchase
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          Log in or Sign up to start budgeting!{' '}
          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>.
        </p>
      )}
    </div>
  );
};

export default PurchaseForm;

