import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const [role, setRole] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data.books;

  // Calculating overall stats
  const totalBooks = books.length;
  const totalAvailable = books.reduce((sum, book) => sum + book.available, 0);
  const totalBorrowed = books.reduce((sum, book) => sum + book.borrowed, 0);

  // Data for charts
  const categories = [...new Set(books.map(book => book.category))];
  const booksPerCategory = categories.map(category => {
    return books
      .filter(book => book.category === category)
      .reduce((total, book) => total + book.available, 0);
  });
  const borrowedPerCategory = categories.map(category => {
    return books
      .filter(book => book.category === category)
      .reduce((total, book) => total + book.borrowed, 0);
  });

  const availabilityChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Books Available',
        data: booksPerCategory,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const borrowedChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Books Borrowed',
        data: borrowedPerCategory,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Overall Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Total Books</h2>
          <p className="text-3xl font-bold text-blue-600">{totalBooks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Books Available</h2>
          <p className="text-3xl font-bold text-green-600">{totalAvailable}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Books Borrowed</h2>
          <p className="text-3xl font-bold text-red-600">{totalBorrowed}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Books Available by Category</h2>
          <Bar data={availabilityChartData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Books Borrowed by Category</h2>
          <Bar data={borrowedChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Detailed List Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Books List by Category</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-center">Available</th>
                <th className="py-3 px-6 text-center">Borrowed</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {books.map((book) => (
                <tr key={book._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{book.title}</td>
                  <td className="py-3 px-6 text-left">{book.category}</td>
                  <td className="py-3 px-6 text-center">{book.available}</td>
                  <td className="py-3 px-6 text-center">{book.borrowed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
