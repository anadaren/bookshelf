import { useState, useContext } from 'react';
import './App.css';
import Card from '/src/card.jsx';
import axios from 'axios';
import { BookContext } from './book-context';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const API_KEY = 'AIzaSyBqsNcfxG7ol5yow21YDoMzE0KkaS22c8g';

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [bookData, setbookData] = useState([]);
  const { favData, readData, getTotalFav, getTotalRead } = useContext(BookContext);
  

  const search = () => {
      // Fetch API data
      axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchInput+'&key=AIzaSyBqsNcfxG7ol5yow21YDoMzE0KkaS22c8g'+'&maxResults=40')
      .then(res=>setbookData(res.data.items))
      .catch(err=>console.log(err))
  }

  const hideAll = () => {
    var x = document.getElementById("favorites");
    var y = document.getElementById("read-list");
    var z = document.getElementById("book-container");
    
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "none";
  }

  const showFav = () => {
    var x = document.getElementById("favorites");
    hideAll();
    x.style.display = "block";
  }

  const showRead = () => {
    var x = document.getElementById("read-list");
    hideAll();
    x.style.display = "block";
  }

  const showBooks = () => {
    var x = document.getElementById("book-container");
    hideAll();
    x.style.display = "grid";
  }

  return (
    <>
    <nav>
    <h1 onClick={() => { hideAll() }}>Bookshelf</h1>
    

    <div className="book-buttons">
        <div className="tooltip"><FavoriteIcon onClick={showFav}/>
        <span className="tooltiptext">Favorites</span>
        </div>
        <div className="tooltip"><BookmarkIcon  onClick={showRead}/>
        <span className="tooltiptext">Read List</span>
        </div>
    </div>

    <input type="input"
          placeholder="Search for Books"
          onKeyPress={(event) => {
            if(event.key == "Enter") {
              search();
              showBooks();
            }
          }}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button onClick={() => {search(); showBooks();}}>Search</button>

    </nav> 

    <div className="books">

        <div id='book-container'>
          {
            <Card book={bookData}/>
          }
        </div>

        <div id='favorites' style={{ display: 'none' }}>
          <h1>Favorite Books</h1>
          {Object.keys(favData).length > 0 ? (
            <>
            <div id='book-container'>
            {
              <Card book={favData}/>
            }
            </div>
            </>
          ) : (
            <p>No favorited books.</p>
          )}
        </div>

        <div id='read-list' style={{ display: 'none' }}>
          <h1>Read List</h1>
          {Object.keys(readData).length > 0 ? (
            <>
            <div id='book-container'>
            {
              <Card book={readData}/>
            }
            </div>
            </>
          ) : (
            <p>No books on read list.</p>
          )}
        </div>
    
    </div>

       
      <footer>
        <hr></hr>
      <p className="credits">
        ©2024 Built and Designed by <a href="https://github.com/anadaren">Anastasia Green</a>
      </p>
      </footer>
    </>
  )
};

export default App;
