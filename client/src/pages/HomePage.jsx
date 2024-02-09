import { useState, useEffect } from 'react';
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
          <Col>
            <div>
              {userData.savedBooks.map((book) => {
            return (
              <Col >
                <div>
                  <div>
                    <h3>Expenses Due Today</h3>
                    <p >Authors: {book.authors}</p>
                  </div>
                </div>
              </Col>
            );
          })}
            </div>
          </Col>
          <Col>
            <div >
              {userData.savedBooks.map((book) => {
            return (
              <Col >
                <div>
                  <div>
                    <h3>Expenses Due Tomorrow</h3>
                    <p>Authors: {book.authors}</p>
                  </div>
                </div>
              </Col>
            );
          })}
            </div>
          </Col>
          <Col>
            <div>
              {userData.savedBooks.map((book) => {
            return (
              <Col >
                <div>
                  <div>
                    <h3>Expenses Due Weekly</h3>
                    <p >Authors: {book.authors}</p>
                  </div>
                </div>
              </Col>
            );
          })}
            </div>
          </Col>
          <Col>
            <div>
              {userData.savedBooks.map((book) => {
            return (
              <Col >
                <div>
                  <div>
                    <h3>Expenses Due Monthly</h3>
                    <p >Authors: {book.authors}</p>
                  </div>
                </div>
              </Col>
            );
          })}
            </div>
          </Col>
        </Row>
        <h2>Left in Budget: ?</h2>
      </Container>
    </>
  );
};

export default SavedBooks;
