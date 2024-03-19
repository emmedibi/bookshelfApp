import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import {getBooks} from "./api/BookService";
import Header from "./components/Header"
import { Routes, Route, Navigate } from 'react-router-dom';
import BookList from './components/BookList'

function App() {
  const modalRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    title: '',
    author: '',
    pages: 0,
    plot: '',
});

const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value});
    console.log(values);
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
          <Route path="/books" element={ <BookList data = {data} currentPage = {currentPage} getAllBooks = { getAllBooks }/>} > </Route>
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
        <form>
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
              <input type="file" onChange={(event) => {setFile(event.target.files[0])}} name="cover" required/>
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
