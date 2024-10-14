import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({show, item, onClose}) => {
    if(!show) return null;

    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;


    return (
        <>
        <div className="overlay">
            <div className="overlay-inner">
            <button className="close" onClick={onClose}><CloseIcon color="disabled"/></button>
                <div className="inner-box">
                    <img src={thumbnail}></img>
                    
                    <div className="info">
                        
                        <h1>{item.volumeInfo.title}</h1>
                        <h3>{item.volumeInfo.authors}</h3>
                        <h4>{item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></h4>
                        <h4>{amount}</h4>
                        <div className="book-buttons">
                                    <div className="tooltip"><FavoriteBorderIcon color="disabled"  onClick={() => { console.log("fav")}}/>
                                        <span className="tooltiptext">Add to Favorites</span>
                                        </div>
                                        <div className="tooltip"><BookmarkBorderIcon color="disabled"  onClick={() => { console.log("read")}}/>
                                        <span className="tooltiptext">Add to Read List</span>
                                        </div>
                                    </div>
                        <a href={item.volumeInfo.previewLink}><button>More</button></a>
                    </div>
                    
                </div>
                
                <h4 className="description">{item.volumeInfo.description}</h4>
                
            </div>
        </div>
        </>
    )

};
export default Modal;