import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Adjust this import based on your styling needs
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  // Constant array for days
  const days = ['Today', 'Tomorrow', 'Weekly', 'Monthly'];

  return (
    <>
      <div>
        <Container>
          <h1>Welcome back, {userData.username}!</h1>
        </Container>
      </div>
      <Container>
        <h2>Budget Overview:</h2>
        {/* Display budget-related information here */}
        <Row>
          {days.map((days) => (
            <Col key={days}>
              <div>
                <h3>Expenses Due {days}</h3>
                {userData.savedBooks.map((book) => (
                  <div key={book.bookId}>
                    <p>Authors: {book.authors}</p>
                  </div>
                ))}
              </div>
            </Col>
          ))}
        </Row>
        <h2>Left in Budget: ?</h2>
      </Container>
    </>
  );
};

export default SavedBooks;
