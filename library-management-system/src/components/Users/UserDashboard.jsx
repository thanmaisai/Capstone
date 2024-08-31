// import React, { useEffect, useState } from 'react';
// import { useUser } from '../UserContext';
// import { useQuery } from '@apollo/client';
// import { GET_BOOKS } from '../../gqloperations/mutations';
// import { Container, Typography, Box, CircularProgress, Alert, Paper } from '@mui/material';
// import { motion } from 'framer-motion';
// import { useTheme } from '@mui/material/styles';
// import BookIcon from '@mui/icons-material/Book';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// const UserDashboard = () => {
//     const { user } = useUser();
//     const [borrowedBooks, setBorrowedBooks] = useState([]);
//     const { data, loading, error } = useQuery(GET_BOOKS);
//     const theme = useTheme();

//     useEffect(() => {
//         if (data && user && user.borrowedBooks) {
//             const borrowedBookIds = new Set(user.borrowedBooks);
//             const filteredBorrowedBooks = data.books.filter(book => borrowedBookIds.has(book._id));
//             setBorrowedBooks(filteredBorrowedBooks);
//         }
//     }, [data, user]);

//     if (loading) {
//         return (
//             <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 minHeight="100vh"
//                 sx={{ bgcolor: theme.palette.background.default }}
//             >
//                 <CircularProgress color="primary" />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 minHeight="100vh"
//                 sx={{ bgcolor: theme.palette.background.default }}
//             >
//                 <Alert
//                     severity="error"
//                     sx={{ width: '100%', bgcolor: theme.palette.background.paper }}
//                 >
//                     <ErrorOutlineIcon sx={{ mr: 1 }} />
//                     Error fetching books: {error.message}
//                 </Alert>
//             </Box>
//         );
//     }

//     return (
//         <Container maxWidth="lg" className="p-4">
//             <Box
//                 my={4}
//                 sx={{
//                     bgcolor: theme.palette.background.default,
//                     p: 4,
//                     borderRadius: 2,
//                     boxShadow: 3
//                 }}
//             >
//                 <Typography
//                     variant="h3"
//                     component="h1"
//                     align="center"
//                     gutterBottom
//                     color={theme.palette.text.primary}
//                 >
//                     <BookIcon sx={{ mr: 1 }} />
//                     User Dashboard
//                 </Typography>
//                 <Typography
//                     variant="h6"
//                     align="center"
//                     color={theme.palette.text.secondary}
//                     gutterBottom
//                 >
//                     Your role: {user?.role}
//                 </Typography>

//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <Box
//                         my={4}
//                         p={4}
//                         sx={{
//                             bgcolor: theme.palette.background.paper,
//                             borderRadius: 2,
//                             boxShadow: 3
//                         }}
//                     >
//                         <Typography
//                             variant="h4"
//                             component="h2"
//                             gutterBottom
//                             color={theme.palette.text.primary}
//                         >
//                             Summary
//                         </Typography>
//                         <Typography
//                             variant="body1"
//                             color={theme.palette.text.secondary}
//                         >
//                             Total books borrowed:
//                             <span
//                                 style={{ fontWeight: 'bold', color: theme.palette.primary.main }}
//                             >
//                                 {borrowedBooks.length}
//                             </span>
//                         </Typography>
//                     </Box>
//                 </motion.div>

//                 <div className="mt-8">
//                     <Typography
//                         variant="h5"
//                         component="h2"
//                         gutterBottom
//                         color={theme.palette.text.primary}
//                         className="mb-4"
//                     >
//                         <BookIcon sx={{ mr: 1 }} />
//                         Borrowed Books
//                     </Typography>
//                     {borrowedBooks.length > 0 ? (
//                         <ul className="space-y-4">
//                             {borrowedBooks.map(book => (
//                                 <motion.li
//                                     key={book._id}
//                                     initial={{ scale: 0.9, opacity: 0 }}
//                                     animate={{ scale: 1, opacity: 1 }}
//                                     transition={{ duration: 0.3 }}
//                                 >
//                                     <Paper
//                                         elevation={4}
//                                         sx={{
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             p: 2,
//                                             backgroundColor: theme.palette.background.paper,
//                                             borderRadius: 2,
//                                             boxShadow: theme.shadows[3],
//                                         }}
//                                     >
//                                         <img 
//                                             src={book.image} 
//                                             alt={book.title} 
//                                             className="w-24 h-36 object-cover rounded-md"
//                                         />
//                                         <div className="flex-1">
//                                             <Typography
//                                                 variant="h6"
//                                                 color={theme.palette.text.primary}
//                                                 className="text-xl font-medium"
//                                             >
//                                                 {book.title}
//                                             </Typography>
//                                             <Typography
//                                                 variant="body2"
//                                                 color={theme.palette.text.secondary}
//                                             >
//                                                 Author: {book.author}
//                                             </Typography>
//                                             <Typography
//                                                 variant="body2"
//                                                 color={theme.palette.text.secondary}
//                                             >
//                                                 Category: {book.category}
//                                             </Typography>
//                                         </div>
//                                     </Paper>
//                                 </motion.li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <Typography
//                             variant="body1"
//                             color={theme.palette.text.secondary}
//                             className="text-center"
//                         >
//                             No borrowed books
//                         </Typography>
//                     )}
//                 </div>
//             </Box>
//         </Container>
//     );
// };

// export default UserDashboard;

import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';
import { Container, Typography, Box, CircularProgress, Alert, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const UserDashboard = () => {
  const { user, setUser } = useUser();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { data, loading, error } = useQuery(GET_BOOKS);
  const theme = useTheme();

  useEffect(() => {
    if (data && user && user.borrowedBooks) {
      const borrowedBookIds = new Set(user.borrowedBooks);
      const filteredBorrowedBooks = data.books.filter(book => borrowedBookIds.has(book._id));
      setBorrowedBooks(filteredBorrowedBooks);
    }
  }, [data, user]);

  // Simulate borrowing a book for demonstration purposes
  const borrowBook = (bookId) => {
    const updatedUser = {
      ...user,
      borrowedBooks: [...user.borrowedBooks, bookId]
    };
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <Alert
          severity="error"
          sx={{ width: '100%', bgcolor: theme.palette.background.paper }}
        >
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          Error fetching books: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="p-4">
      <Box
        my={4}
        sx={{
          bgcolor: theme.palette.background.default,
          p: 4,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          color={theme.palette.text.primary}
        >
          <BookIcon sx={{ mr: 1 }} />
          User Dashboard
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color={theme.palette.text.secondary}
          gutterBottom
        >
          Your role: {user?.role}
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            my={4}
            p={4}
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color={theme.palette.text.primary}
            >
              Summary
            </Typography>
            <Typography
              variant="body1"
              color={theme.palette.text.secondary}
            >
              Total books borrowed:
              <span
                style={{ fontWeight: 'bold', color: theme.palette.primary.main }}
              >
                {borrowedBooks.length}
              </span>
            </Typography>
          </Box>
        </motion.div>

        <div className="mt-8">
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            color={theme.palette.text.primary}
            className="mb-4"
          >
            <BookIcon sx={{ mr: 1 }} />
            Borrowed Books
          </Typography>
          {borrowedBooks.length > 0 ? (
            <ul className="space-y-4">
              {borrowedBooks.map(book => (
                <motion.li
                  key={book._id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 2,
                      boxShadow: theme.shadows[3],
                    }}
                  >
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-24 h-36 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <Typography
                        variant="h6"
                        color={theme.palette.text.primary}
                        className="text-xl font-medium"
                      >
                        {book.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={theme.palette.text.secondary}
                      >
                        Author: {book.author}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={theme.palette.text.secondary}
                      >
                        Category: {book.category}
                      </Typography>
                      <button onClick={() => borrowBook(book._id)}>Borrow this book</button>
                    </div>
                  </Paper>
                </motion.li>
              ))}
            </ul>
          ) : (
            <Typography
              variant="body1"
              color={theme.palette.text.secondary}
              className="text-center"
            >
              No borrowed books
            </Typography>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default UserDashboard;
