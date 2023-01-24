import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const SearchBar = ({ searchTerm, updateSearchTerm }) => {
  

  const handleChange = event => {
    updateSearchTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // perform search with searchTerm here
  };

  return (
    <form onSubmit={handleSubmit} style={{
    width: "500px", /* Set the width of the search bar */
    height: "40px", /* Set the height of the search bar */
    borderRadius: "50px", /* Add rounded edges to the search bar */
    border: "2px solid purple", /* Add a border to the search bar */
    display: "flex", /* Make the search bar a flex container */
    alignItems: "center", /* Center the child elements vertically */
    }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search"
        style={{
            border: "none", /* Remove the default border of the input */
            outline: "none", /* Remove the default outline of the input */
            fontSize: "1rem", /* Set the font size of the input */
            padding: "0.5rem", /* Add padding to the input */
            flexGrow: 1, /* Allow the input to take up all available space */
            background: "transparent", /* Remove the default background color of the input */
        }}
      />
    </form>
  );
      }

export default SearchBar;
