import { useState, useContext } from "react";
import Modal from "/src/modal.jsx"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { BookContext } from './book-context';

const Card = ({book}) => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState(null);

    // Creates a list of favorites and a read list
    const [favorites, setFavorites] = useState({});
    const [readList, setReadList] = useState({});

    // Import methods for adding/removing books to/from favorites and read lists from BookContext
    const { favData, readData, addFav, addRead, removeFav, removeRead } = useContext(BookContext);

    // Toggles if book is in favorites
    const toggleFavorite = (item) => {
        const currentBookId = item.id;

        // If book is already in favData, remove it, otherwise add it
        if(favData.some((favBook) => favBook.id === currentBookId)) {
            removeFav(item);
        } else {
            addFav(item);
        }
    };

    // Toggles if book is on read list
    const toggleRead = (item) => {
        const currentBookId = item.id;

        // If book is already in readData, remove it, otherwise add it
        if(readData.some((readBook) => readBook.id === currentBookId)) {
            removeRead(item);
        } else {
            addRead(item);
        }
    };

    return (
        <>
            {
                book.map((item)=> {
                    if(!item) return null;

                    const id = item.id;

                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    
                    const isFavorited = favData.some((favBook) => favBook.id === id);
                    const isRead = readData.some((readBook) => readBook.id === id);

                    
                    if(thumbnail != undefined && amount != undefined) {
                        return (
                            <>
                            <div key={id} className = "card" >
                                <div className="module-link" onClick={()=>{setItem(item); setShow(true)}}>
                                    <img src={thumbnail} alt=""/>
                                    <div className="bottom">
                                        <h3 className="title">{item.volumeInfo.title}</h3>
                                        <h4 className="author">{item.volumeInfo.authors}</h4>
                                        <p className="amount">&#36;{amount}</p>
                                    
                                    </div>
                                </div>
                                    <div className="book-buttons">
                                        <div className="tooltip" onClick={()=>{toggleFavorite(item)}}>{isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                            <span className="tooltiptext">Add to Favorites</span>
                                        </div>
                                        <div className="tooltip" onClick={()=>{toggleRead(item)}}>{isRead ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                            <span className="tooltiptext">Add to Read List</span>
                                        </div>
                                    </div>
                                  
                            </div>
                            <Modal // Displays whenever book is clicked
                                show={show} 
                                item={bookItem} 
                                isFav={isFavorited} 
                                isRead={isRead} 
                                onClose={()=>setShow(false)} 
                                toggleFav={()=>toggleFavorite(bookItem)} 
                                toggleRead={()=>toggleRead(bookItem)}
                            />
                            </>
                        )
                    }
                })
            }
        </>
    )
}
export default Card;