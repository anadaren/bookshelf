import { createContext, useState } from "react";

export const BookContext = createContext(null);

/*const getDefaults = () => {
  let fav, read = {};
  return fav, read;
};*/

export const BookContextProvider = (props) => {
  const [favData, setfavData] = useState([]);
  const [readData, setreadData] = useState([]);


  // Gets total number of favorite books
  const getTotalFav = () => {
    let totalAmount = favData.length;
    return totalAmount;
  };

  // Gets total number of read list books
  const getTotalRead = () => {
    let totalAmount = readData.length;
    return totalAmount;
  };

  // Adds books to fav
  const addFav = (bookId) => {
    
    setfavData((prev) => [ ...prev, bookId ]);  // Async function

    // CODE FOR TESTING //
    /*setfavData((prev) => {    
      const updatedFavData = [...prev, bookId];
      console.log("Added " + bookId.volumeInfo.title + " to favorites.");
      console.log(updatedFavData);
      return updatedFavData;
    });*/
  };
  // Adds books to read list
  const addRead = (bookId) => {
    setreadData((prev) => [ ...prev, bookId ]);  // Async function

    // CODE FOR TESTING //
    /*setfavData((prev) => {    
      const updatedReadData = [...prev, bookId];
      console.log("Added " + bookId.volumeInfo.title + " to read list.");
      console.log(updatedReadData);
      return updatedReadData;
    });*/
  };
  // Removes books from favs
  const removeFav = (bookId) => {
    var id = bookId.id;
    setfavData((prev) => {
      const updatedFavData = prev.filter((obj) => obj.id !== id);
      //console.log("Removed " + bookId.volumeInfo.title + " from favorites.");
      //console.log(updatedFavData);
      return updatedFavData;
    });
  };
  // Removes books from read list
  const removeRead = (bookId) => {
    var id = bookId.id;
    setreadData((prev) => {
      const updatedReadData = prev.filter((obj) => obj.id !== id);
      //console.log("Removed " + bookId.volumeInfo.title + " from read list.");
      //console.log(updatedReadData);
      return updatedReadData;
    });
  };



  const contextValue = {
    favData,
    readData,
    getTotalFav,
    getTotalRead,
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