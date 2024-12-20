import { createContext, useState, useEffect } from "react";

export const BookContext = createContext(null);

export const BookContextProvider = (props) => {
  const [favData, setfavData] = useState(() => {
    const storedFavData = localStorage.getItem("favData");
    return storedFavData ? JSON.parse(storedFavData) : [];
  });
  const [readData, setreadData] = useState(() => {
    const storedReadData = localStorage.getItem("readData");
    return storedReadData ? JSON.parse(storedReadData) : [];
  });

  useEffect(() => {
    localStorage.setItem("favData", JSON.stringify(favData));
  }, [favData]);

  useEffect(() => {
    localStorage.setItem("readData", JSON.stringify(readData));
  }, [readData]);


  // Gets total number of favorite books
  const getTotalFav = () => favData.length;

  // Gets total number of read list books
  const getTotalRead = () => readData.length;


  // Adds books to fav (async function)
  const addFav = (bookId) => setfavData((prev) => [ ...prev, bookId ]);
  
  // Adds books to read list (async function)
  const addRead = (bookId) => setreadData((prev) => [ ...prev, bookId ]);

  // Removes books from favs
  const removeFav = (bookId) => {
    var id = bookId.id;
    setfavData((prev) => {
      const updatedFavData = prev.filter((obj) => obj.id !== id);
      //console.log("Removed " + bookId.volumeInfo.title + " from favorites.");
      return updatedFavData;
    });
  };
  // Removes books from read list
  const removeRead = (bookId) => {
    var id = bookId.id;
    setreadData((prev) => {
      const updatedReadData = prev.filter((obj) => obj.id !== id);
      //console.log("Removed " + bookId.volumeInfo.title + " from read list.");
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