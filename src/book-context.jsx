import { createContext, useState } from "react";

export const BookContext = createContext(null);

const getDefaults = () => {
  let fav, read = {};
  return fav, read;
};

export const BookContextProvider = (props) => {
  const [favData, setfavData] = useState(getDefaults());
  const [readData, setreadData] = useState(getDefaults());

  const getTotalFav = () => {
    let totalAmount = 0;
    for (const item in favData) {
      if (favData[item] > 0) {
        totalAmount += favData[item];
      }
    }
    return totalAmount;
  };

  // Adds books to fav
  const addFav = (bookId) => {
    setfavData((prev) => ({ ...prev, [bookId]: (prev[bookId] || 0) + 1 }));
  };
  // Adds books to read list
  const addRead = (bookId) => {
    setreadData((prev) => ({ ...prev, [bookId]: (prev[bookId] || 0) + 1 }));
  };
  // Removes books from favs
  const removeFav = (bookId) => {
    setfavData((prev) => ({ ...prev, [bookId]: prev[bookId] - 1 }));
  };
  // Removes books from read list
  const removeRead = (bookId) => {
    setreadData((prev) => ({ ...prev, [bookId]: prev[bookId] - 1 }));
  };


  const contextValue = {
    getTotalFav,
    favData,
    readData,
    addFav,
    addRead,
    removeFav,
    removeRead
  };

  return (
    <BookContext.Provider value={contextValue}>
      {props.children}
    </BookContext.Provider>
  );
    
};  