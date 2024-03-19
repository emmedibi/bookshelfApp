import React from 'react'
import { Link } from 'react-router-dom'

function Book( { book }) {
  return (
    <Link to={`/books/${book.id}`} className='book__item'>
        <div className='book__header'>
            <div className='book_image'>
                <img src={book.coverUrl} alt={book.title} />
            </div>
            <div className='book__details'>
                <p className='book_title'>{book.title}</p>
                <p className='book_author'>{book.author}</p>
            </div>
            <div className='book__body'>
                <p className='book_pages'><i className="bi bi-123"></i>{book.pages}</p>
                <p className='book_plot'><i className="bi bi-blockquote-left"></i>{book?.plot?.substring(0, 30) + " ..."}</p>
            </div>
        </div>
        </Link>
  )
}

export default Book