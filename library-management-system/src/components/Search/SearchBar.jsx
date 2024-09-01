/* This code snippet is a React functional component called `SearchBar`. It is a reusable component
that represents a search bar UI element. Here is a breakdown of what the code is doing: */
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, InputBase, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ searchText, setSearchText, onSearch }) {
  const theme = useTheme();
  const [searchField, setSearchField] = useState('title');

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <Paper
      component="div"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '24px',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        maxWidth: '600px', // Adjust as needed
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none', // Removed box shadow for a cleaner look
      }}
      className="mb-4"
    >
      <FormControl style={{ marginRight: '8px', minWidth: '120px' }}>
        <InputLabel id="search-field-label" shrink={false}></InputLabel>
        <Select
          labelId="search-field-label"
          value={searchField}
          onChange={handleSearchFieldChange}
          style={{
            backgroundColor: theme.palette.background.default,
            borderRadius: '30px', 
            border: `1px solid ${theme.palette.divider}`,
            '& .MuiSelect-select': {
              padding: '8px',
              borderRadius: '20px',
            }
          }}
        >
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Author</MenuItem>
        </Select>
      </FormControl>

      <InputBase
        placeholder={`Search by ${searchField}...`}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          flex: 1,
          padding: '9px',
          fontSize: '0.975rem',
          borderRadius: '30px',
          border: `2px solid ${theme.palette.divider}`,
          marginLeft: '2px',
          backgroundColor: theme.palette.background.default,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        onClick={() => onSearch(searchField, searchText)}
        style={{
          padding: '2px',
          color: theme.palette.primary.main, 
          '&:hover': {
            backgroundColor: theme.palette.action.selected,
          }
        }}
        aria-label="search"
      >
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
