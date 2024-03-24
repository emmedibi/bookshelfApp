import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import {getBooks, saveBook, updateBook, updateCover} from "./api/BookService";
import Header from "./components/Header"
import { Routes, Route, Navigate, Form, useAsyncError } from 'react-router-dom';
import BookList from './components/BookList'
import BooksDetails from './components/BooksDetails';

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    title: '',
    author: '',
    pages: 0,
    plot: '',
});

const handleNewBook = async (event) => {
  event.preventDefault();
  try {
    const {data} = await saveBook(values);
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id', data.id);
    const {data: coverUrl} = await updateCover(formData);
    // Close the modal window //
    toggleModal(false);
    console.log(data);
    //Set values as null or blank //
    setFile(undefined);
    fileRef.current.value = null;
    setValues({
      title: '',
      author: '',
      pages: 0,
      plot: '',
    });
    getAllBooks();
  } catch(error){
    console.log(error);
  }
}

const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value});
    // console.log(values);
};
  
  const getAllBooks = async(page= 0, size=10) => {
    try {
      setCurrentPage(page);
      const { data } = await getBooks(page, size);
      setData(data);
      console.log(data);
    } catch(error){
      console.log(error);
    }
  };

  const updateBook = async () => {

  };

  const updateImage = async (formData) => {
    try{
      const {data: coverUrl} = await updateCover(formData);
    } catch(error) {
      console.log(error);
    }
  };

  const toggleModal = (show) => show? modalRef.current.showModal() :modalRef.current.close();

  useEffect(() => {
    getAllBooks();

  }, []);

  return (
    <>
    <Header toggleModal={toggleModal} nbOfBooks={50} />
    <main className='main'>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Navigate to={'/books'} />}></Route>
          <Route path="/books" element={ <BookList data = { data } currentPage = { currentPage } getAllBooks = { getAllBooks }/>} > </Route>
          <Route path="/books/:id" element={ <BooksDetails updateBook={ updateBook } updateImage={ updateImage }/>} > </Route>
        </Routes>
      </div>
    </main>

    {/*Modal*/}
    <dialog ref={modalRef} className='modal' id="modal">
      <div className='modal__header'>
        <h3>New Book</h3>
        <i onClick={() => toggleModal(false)} className='bi bi-x-lg'></i>
      </div>
      <div className='divider'></div>
      <div className='modal__body'>
        <form onSubmit={handleNewBook}>
          <div className='modal__details'>
            <div className='input-box'>
              <span className='details'>Title</span>
              <input type="text" value={values.title} onChange = {onChange} name="title" required/>
            </div>
            <div className='input-box'>
              <span className='details'>Author</span>
              <input type="text" value={values.author} onChange = {onChange} name="author" required/>
            </div>
            <div className='input-box'>
              <span className='details'>Number of pages</span>
              <input type="number" value={values.pages} onChange = {onChange} name="pages" required/>
            </div>
            <div className='input-box'>
              <span className='details'>Plot</span>
              <input type="text" value={values.plot} onChange = {onChange} name="plot" required/>
            </div>
            <div className='file-input'>
              <span className='details'>Cover</span>
              <br/>
              <input type="file" onChange={(event) => {setFile(event.target.files[0])}} ref={fileRef} name="cover" required/>
            </div>
          </div>
          <div className='form_footer'>
            <button onClick={() => toggleModal(false)} type='button' className='btn btn-danger'>Cancel</button>
            <button type='submit' className='btn'>Save</button>
          </div>
        </form>
      </div>
    </dialog>
    </>
  );
}

export default App;
