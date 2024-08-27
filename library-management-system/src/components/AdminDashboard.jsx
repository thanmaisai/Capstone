import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import BooksList from '../components/BooksList';

// GraphQL queries and mutations
const GET_BOOKS = gql`
  query {
    books {
      _id
      title
      author
      category
      image
      available
      borrowed
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($_id: ID!) {
    deleteBook(_id: $_id) {
      _id
      title
      author
    }
  }
`;

const AdminDashboard = () => {
  const { data, loading, error, refetch } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error deleting book:", error),
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async (bookId) => {
    try {
      await deleteBook({ variables: { _id: bookId } });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books: {error.message}</p>;

  return (
    <div className="p-4">
      <BooksList books={data.books} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;
