import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "./autocomplete.css";

const Autocomplete = ({ OnSearch, template, multiple }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const autocompleteRef = useRef(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredSuggestions(OnSearch(value));
    console.log(filteredSuggestions)
  };

  const handleSuggestionClick = (suggestion) => {
    if (multiple === true) {
      setSelectedItems((prevItems) => [...prevItems, suggestion]);
      setInputValue('');
    } else {
      setInputValue(`${suggestion.firstName} ${suggestion.lastName}`);
      setFilteredSuggestions([]);
    }
  };

  const handleClickOutside = (event) => {
    if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
      setFilteredSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete" ref={autocompleteRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>

                <span>{suggestion.firstName} {suggestion.lastName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Autocomplete.propTypes = {
  OnSearch: PropTypes.string.isRequired,
  OnSelect: PropTypes.func,
  template: PropTypes.string,
  multiple: PropTypes.bool,
};

export default Autocomplete;