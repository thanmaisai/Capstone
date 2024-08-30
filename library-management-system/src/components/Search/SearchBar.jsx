import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ searchText, setSearchText, onSearch }) {
  const theme = useTheme();

  return (
    <Paper
      component="div"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper,
      }}
      className="mb-4"
    >
      <InputBase
        placeholder="Search students by name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          flex: 1,
          padding: theme.spacing(1),
        }}
        inputProps={{ 'aria-label': 'search students' }}
      />
      <IconButton
        onClick={onSearch}
        style={{
          color: theme.palette.primary.main,
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;