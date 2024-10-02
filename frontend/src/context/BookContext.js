import React, { createContext, useState } from 'react';
import api from '../utils/api';

export const BookContext = createContext();
//creating Booking Context
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [bookReview, setBookReview] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchFeaturedBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/filter/rating/desc');
      setFeaturedBooks(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };


  const fetchBook = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/books/${id}`);
      setCurrentBook(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchUserProfile = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchBookReview = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/reviews/?bookId=${id}`);
      setBookReview(response.data);
    } catch (err) {
      console.log(error)
    }
    setLoading(false);
  };

  const submitReview = async (bookId, review) => {
    setLoading(true);
    try {
      await api.post(`/reviews/`, review);
      await fetchBookReview(bookId)
    } catch (err) {
      alert("Please Logout and Login")
      setError(err.message);
    }
    setLoading(false);
  };

  const AddBooksSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post(`/books/`, data);
      fetchFeaturedBooks();
      alert("Data submitted successfully ")
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchBooksInOrder = async (filterOption = ' ') => {
    setLoading(true);
    setError(null);

    var endpoint = '/filter';  // Base API endpoint for fetching books
    
    switch (filterOption) {
      case 'AscendingTime':
        endpoint += '/time/asc';
        break;
      case 'DescendingTime':
        endpoint += '/time/desc';
        break;
      case 'MoreRating':
        endpoint += '/rating/desc';
        break;
      case 'LessRating':
        endpoint += '/rating/asc';
        break;
      case 'All':
        endpoint ='/books/';
        break;
      default:
        break;
    }

    try {
      const response = await api.get(endpoint);
      
      setBooks(response.data);
    } catch (err) {
     
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        featuredBooks,
        currentBook,
        user,
        loading,
        error,
        bookReview,
        fetchBooks,
        fetchFeaturedBooks,
        fetchBook,
        fetchUserProfile,
        submitReview,
        fetchBookReview,
        AddBooksSubmit,
        fetchBooksInOrder
      }}
    >
      {children}
    </BookContext.Provider>
  );
};