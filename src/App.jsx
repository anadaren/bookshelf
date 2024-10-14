import { useEffect, useState } from 'react';
import './App.css';
import Card from '/src/card.jsx';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const API_KEY = 'AIzaSyBqsNcfxG7ol5yow21YDoMzE0KkaS22c8g';

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [bookData, setbookData] = useState([]);
  const [favData, setfavData] = useState([]);
  const [readData, setreadData] = useState([]);

  const search = () => {
      // Fetch API data
      axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchInput+'&key=AIzaSyBqsNcfxG7ol5yow21YDoMzE0KkaS22c8g'+'&maxResults=40')
      .then(res=>setbookData(res.data.items))
      .catch(err=>console.log(err))
      
  }

  const addFav = (book) => {
    console.log(setfavData);
  }

  const addRead = (book) => {
    console.log(setreadData);
  }
  

  return (
    <>
    <nav>
    <h1>Bookshelf</h1>
    </nav>

    <div className="book-buttons">
        <div className="tooltip"><FavoriteIcon onClick={() => { addFav() }}/>
        <span className="tooltiptext">Favorites</span>
        </div>
        <div className="tooltip"><BookmarkIcon  onClick={() => { addRead() }}/>
        <span className="tooltiptext">Read List</span>
        </div>
    </div>
    
    <div className="books">

    <input type="input"
          placeholder="Search for Books"
          onKeyPress={event => {
            if(event.key == "Enter") {
              search();
            }
          }}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button onClick={() => {search()}}>Search</button>
        
        <div className='container'>
          {
            <Card book={bookData}/>
          }
        </div>

        <div className='favorites'>
          {
            <Card book={favData}/>
          }
        </div>

        <div className='read-list'>
          {
            <Card book={readData}/>
          }
        </div>
    
    </div>

       
      <footer>
      <p className="credits">
        ©2024 Built and Designed by <a href="https://github.com/anadaren">Anastasia Green</a>
      </p>
      </footer>
    </>
  )
};

export default App;
