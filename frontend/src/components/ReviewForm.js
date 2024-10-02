
import React, { useState, useContext } from 'react';
import { BookContext } from '../context/BookContext';

const ReviewForm = ({ bookId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const { submitReview, loading, error } = useContext(BookContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReview(bookId, { bookId: bookId, comment: reviewText,rating: rating });
  };

  if (loading) return <div className="text-blue-500">Submitting review...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-2xl font-semibold mb-4">Submit a Review</h3>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        required
        className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center space-x-4">
        <label htmlFor="rating" className="text-lg font-medium">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
