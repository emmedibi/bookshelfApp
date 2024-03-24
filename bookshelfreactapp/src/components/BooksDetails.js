import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getBook } from "../api/BookService";

const BooksDetails = ({ updateBook, updateImage }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    pages: 0,
    plot: "",
    coverUrl: "",
  });

  const inputRef = useRef();
  const { id } = useParams();
  console.log(id);

  const fetchBook = async (id) => {
    try {
      const { data } = await getBook(id);
      setBook(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCover = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      await updateImage(formData);
      setBook((prev) => ({
        ...prev,
        coverUrl: `${prev.coverUrl}?updated_at=${new Date().getTime()}`,
      }));
      console.log("data");
    } catch (error) {
      console.log(error);
    }
  };

  const selectCover = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    fetchBook(id);
  }, []);

  return (
    <>
      <Link to={`/books`} className="link">
        <i className="bi bi-arrow-left"></i> Back to list{" "}
      </Link>
      <br />
      <div className="profile">
        <div className="profile__details">
          <div className="profile__metadata">
            <img src={book.coverUrl} alt={book.title} />
            <button className="btn" onClick={selectCover}>
              {" "}
              <i className="bi bi-cloud-upload"></i>Change cover
            </button>
          </div>
          <div className="profile__settings">
            <p className="book_title">{book.title}</p>
            <p className="book_author" align="center">
              {book.author}
            </p>
            <p className="book_pages">
              <i className="bi bi-123"></i> {book.pages} pages
            </p>
            <p className="book_plot">
              <i className="bi bi-blockquote-left"></i> {book?.plot}
            </p>
          </div>
        </div>
      </div>
      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={inputRef}
          onChange={(event) => updateCover(event.target.files[0])}
          name="file"
          accept="cover/*"
        />
      </form>
    </>
  );
};

export default BooksDetails;
