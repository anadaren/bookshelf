import { createContext, useState } from "react";

export const BookContext = createContext(null);

const getDefaults = () => {
  let fav, read = {};
  return fav, read;
};

export const BookContextProvider = (props) => {
  const [favData, setfavData] = useState(getDefaults());
  const [readData, setreadData] = useState(getDefaults());


  // Gets total number of favorite books
  const getTotalFav = () => {
    let totalAmount = 0;
    for (const item in favData) {
      if (favData[item] > 0) {
        totalAmount += favData[item];
      }
    }
    return totalAmount;
  };

  // Gets total number of read list books
  const getTotalRead = () => {
    let totalAmount = 0;
    for (const item in readData) {
      if (readData[item] > 0) {
        totalAmount += readData[item];
      }
    }
    return totalAmount;
  };

  // Adds books to fav
  const addFav = (bookId) => {
    setfavData((prev) => ({ ...prev, [bookId]: (prev[bookId] || 0) + 1 }));
    console.log("Added " + bookId.volumeInfo.title + " to favorites.");
  };
  // Adds books to read list
  const addRead = (bookId) => {
    setreadData((prev) => ({ ...prev, [bookId]: (prev[bookId] || 0) + 1 }));
    console.log("Added " + bookId.volumeInfo.title + " to read list.");
  };
  // Removes books from favs
  const removeFav = (bookId) => {
    setfavData((prev) => ({ ...prev, [bookId]: prev[bookId] - 1}));
    console.log("Removed " + bookId.volumeInfo.title + " from favorites.");
  };
  // Removes books from read list
  const removeRead = (bookId) => {
    setreadData((prev) => ({ ...prev, [bookId]: prev[bookId] - 1 }));
    console.log("Removed " + bookId.volumeInfo.title + " from read list.");
  };

  const printFavBooks = () => {
    Object.keys(favData).forEach((bookId) => {
      console.log(`Book ID: ${favData}, Count: ${favData[bookId]}`);
    });
  };


  const contextValue = {
    getTotalFav,
    getTotalRead,
    favData,
    readData,
    addFav,
    addRead,
    removeFav,
    removeRead,
    printFavBooks
  };

  return (
    <BookContext.Provider value={contextValue}>
      {props.children}
    </BookContext.Provider>
  );
    
};  