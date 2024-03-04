import './App.css';
import React, { useEffect, useState } from 'react';
import {getBooks} from "./api/BookService";
import Header from "./components/Header"
import { Routes, Route, Navigate } from 'react-router-dom';
import BookList from './components/BookList'

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  
  const getAllBooks = async(page= 0, size=10) => {
    try {
      setCurrentPage(page);
      const { data } = await getBooks(page, size);
      setData(data);
      console.log(data);
    } catch(error){
      console.log(error);
    }
  }

  const toggleModal = (show) => {}

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
    </>
  );
}

export default App;
