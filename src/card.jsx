import { useState } from "react";
import Modal from "/src/modal.jsx"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const Card = ({book}) => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();
    return (
        <>
            {
                book.map((item)=> {
                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    if(thumbnail != undefined && amount != undefined) {
                        return (
                            <>
                            <div className = "card">
                                <img src={thumbnail} alt=""  onClick={()=> {setShow(true); setItem(item)}}></img>
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <p className="amount">&#8377;{amount}</p>
                                </div>
                                <div className="book-buttons">
                                    <div className="tooltip"><FavoriteBorderIcon  onClick={() => {console.log("fav")}}/>
                                        <span className="tooltiptext">Add to Favorites</span>
                                        </div>
                                        <div className="tooltip"><BookmarkBorderIcon  onClick={() => {console.log("read")}}/>
                                        <span className="tooltiptext">Add to Read List</span>
                                        </div>
                                    </div>
                            </div>
                            <Modal show={show} item={bookItem} onClose={()=>setShow(false)}/>
                            </>
                        )
                    }
                })
            }
        </>
    )
}
export default Card;