import React, { useContext } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';

// Information overlay when book is clicked on
const Modal = ({show, item, isFav, isRead, onClose, toggleFav, toggleRead}) => {

    if(!show) return null;

    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;



    return (
        <>
        <div className="overlay">
            <div className="overlay-inner">
            
            <button className="close" onClick={onClose}>
                <CloseIcon color="disabled"/>
            </button>

                <div className="inner-box">
                    <img src={thumbnail}/>
                    
                    <div className="info">
                        
                        <h1>{item.volumeInfo.title}</h1>
                        <h3>{item.volumeInfo.authors}</h3>
                        <h4>{item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></h4>
                        <h4>{amount}</h4>
                        <div className="book-buttons">
                                    <div className="tooltip" id="favs" onClick={toggleFav}>{isFav ? <FavoriteIcon color="disabled"/> : <FavoriteBorderIcon color="disabled"/>}
                                        <span className="tooltiptext">Add to Favorites</span>
                                    </div>
                                    <div className="tooltip" id="reads" onClick={toggleRead}>{isRead ? <BookmarkIcon color="disabled"/> : <BookmarkBorderIcon color="disabled"/>}
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