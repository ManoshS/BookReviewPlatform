import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import { BookContext } from '../context/BookContext';

const BookDetails = () => {
  const { id } = useParams();
  const { currentBook, fetchBook,fetchBookReview,bookReview, loading, error } = useContext(BookContext);

  useEffect(() => {
    fetchBook(id);
    fetchBookReview(id);
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="bg-neutral-100  rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105   ">

        <div className="lg:ml-8">
          <h1 className="text-4xl font-bold mb-4">{currentBook?.title}</h1>
          <h2 className="text-2xl text-gray-600 mb-4">Author : {currentBook?.author}</h2>
          <p className="text-gray-700 mb-4">Description : {currentBook?.description}</p>

          <p className="text-gray-500 mb-4"><strong>Published:</strong> {currentBook?.created_at}</p>

          <h3 className="text-xl font-semibold mt-8">Reviews</h3>
          <div className="space-y-4 mt-4">
            {bookReview?.map(review => (
              <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-gray-800">User ID : {review.user_id}</p>
                <p className="text-gray-800">Comment : {review.comment}</p>
                <p className="text-yellow-500 mt-2">Rating: {review.rating}/5</p>
              </div>
            ))}
          </div>
          <br/>
          <ReviewForm bookId={id} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
