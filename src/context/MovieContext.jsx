import { createContext, useContext, useState } from 'react';

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'year' | 'title'

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSortBy('rating');
  };

  const value = {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    resetFilters,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export default MovieContext;
