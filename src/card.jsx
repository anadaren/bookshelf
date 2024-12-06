import { useState, useContext } from "react";
import Modal from "/src/modal.jsx"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { BookContext } from './book-context';

const Card = ({book}) => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();

    // Creates a list of favorites and a read list
    const [favorites, setFavorites] = useState({});
    const [readList, setReadList] = useState({});

    const { addFav, addRead, removeFav, removeRead } = useContext(BookContext);

    // Toggles if book is in favorites
    const toggleFavorite = (item) => {
        const currentBookId = item.id;

        setFavorites((prev) => ({
            ...prev,
            [currentBookId]: !prev[currentBookId], // Toggle the specific book's state
          }));

        // Adds or removes book to favorites:
        if (favorites[currentBookId]) {
            removeFav(item);
          } else {
            addFav(item);
          };
    };

    // Toggles if book is on read list
    const toggleRead = (item) => {
        const currentBookId = item.id;

        setReadList((prev) => ({
            ...prev,
            [currentBookId]: !prev[currentBookId], // Toggle the specific book's state
          }));

        // Adds or removes book to read list:
        if (readList[currentBookId]) {
            removeRead(item);
          } else {
            addRead(item);
          }
    };

    return (
        <>
            {
                book.map((item)=> {
                    const id = item.id;
                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    if(thumbnail != undefined && amount != undefined) {
                        return (
                            <>
                            <div key={id} className = "card">
                                <img src={thumbnail} alt=""  onClick={()=>{setShow(true); setItem(item)}}></img>
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <h4 className="author">{item.volumeInfo.authors}</h4>
                                    <p className="amount">&#36;{amount}</p>
                                </div>
                                <div className="book-buttons">
                                    <div className="tooltip" onClick={()=>{toggleFavorite(item)}}>{favorites[id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        <span className="tooltiptext">Add to Favorites</span>
                                        </div>
                                        <div className="tooltip" onClick={()=>{toggleRead(item)}}>{readList[id] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                        <span className="tooltiptext">Add to Read List</span>
                                        </div>
                                    </div>
                            </div>
                            <Modal show={show} item={bookItem} isFav={favorites[id]} isRead={readList[id]} onClose={()=>setShow(false)} toggleFav={()=>toggleFavorite(item)} toggleRead={()=>toggleRead(item)}/>
                            </>
                        )
                    }
                })
            }
        </>
    )
}
export default Card;