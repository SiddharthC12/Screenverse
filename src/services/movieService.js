/**
 * SCREENVERSE – Movie Service
 * Handles querying, filtering, and sorting the curated 70-movie local catalogue.
 */

import moviesData from '../data/movies.json';
import { MOVIE_GENRES, MOVIE_LANGUAGES } from '../utils/constants';

/**
 * Get all 70 movies in the catalogue
 * @returns {Array} Complete list of movies
 */
export const getAllMovies = () => {
  return [...moviesData];
};

/**
 * Get a single movie by its unique ID or slug
 * @param {string} idOrSlug - Movie ID or slug
 * @returns {Object|null}
 */
export const getMovieById = (idOrSlug) => {
  if (!idOrSlug) return null;
  const target = String(idOrSlug).toLowerCase();
  const movie = moviesData.find(
    (m) => m.id.toLowerCase() === target || m.slug.toLowerCase() === target
  );
  return movie ? { ...movie } : null;
};

/**
 * Get featured movies for homepage hero showcase & carousel
 * @returns {Array} Featured movies
 */
export const getFeaturedMovies = () => {
  return moviesData.filter((m) => m.featured);
};

/**
 * Get popular movies
 * @param {number} [limit=10]
 * @returns {Array}
 */
export const getPopularMovies = (limit = 10) => {
  return moviesData
    .filter((m) => m.popular)
    .slice(0, limit);
};

/**
 * Get recently released movies sorted by year descending
 * @param {number} [limit=10]
 * @returns {Array}
 */
export const getRecentMovies = (limit = 10) => {
  return [...moviesData]
    .sort((a, b) => b.releaseYear - a.releaseYear)
    .slice(0, limit);
};

/**
 * Get top rated movies
 * @param {number} [limit=10]
 * @returns {Array}
 */
export const getTopRatedMovies = (limit = 10) => {
  return [...moviesData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

/**
 * Get movies by genre
 * @param {string} genre
 * @returns {Array}
 */
export const getMoviesByGenre = (genre) => {
  if (!genre || genre === 'All') return getAllMovies();
  const lower = genre.toLowerCase();
  return moviesData.filter((m) => {
    if (Array.isArray(m.genre)) {
      return m.genre.some((g) => g.toLowerCase() === lower);
    }
    return String(m.genre).toLowerCase() === lower;
  });
};

/**
 * Get movies by collection group (Collection A through G)
 * @param {string} collection
 * @returns {Array}
 */
export const getMoviesByCollection = (collection) => {
  if (!collection || collection === 'All Collections') return getAllMovies();
  return moviesData.filter((m) => m.collection === collection);
};

/**
 * Universal catalogue query with multi-faceted filtering & sorting
 * @param {Object} options
 * @param {string} [options.search='']
 * @param {string} [options.genre='All']
 * @param {string} [options.language='All']
 * @param {string|number} [options.year='All']
 * @param {string} [options.collection='All Collections']
 * @param {string} [options.sortBy='rating'] - 'rating' | 'year' | 'title'
 * @param {string} [options.sortOrder='desc'] - 'desc' | 'asc'
 * @returns {Array}
 */
export const filterMovies = ({
  search = '',
  genre = 'All',
  language = 'All',
  year = 'All',
  collection = 'All Collections',
  sortBy = 'rating',
  sortOrder = 'desc',
} = {}) => {
  let results = [...moviesData];

  // 1. Search Query (Title, Director, Synopsis)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter((m) => {
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDirector = m.director ? m.director.toLowerCase().includes(q) : false;
      const matchDesc = m.description ? m.description.toLowerCase().includes(q) : false;
      const matchGenre = Array.isArray(m.genre)
        ? m.genre.some((g) => g.toLowerCase().includes(q))
        : false;
      return matchTitle || matchDirector || matchDesc || matchGenre;
    });
  }

  // 2. Genre Filter
  if (genre && genre !== 'All') {
    const gLower = genre.toLowerCase();
    results = results.filter((m) => {
      if (Array.isArray(m.genre)) {
        return m.genre.some((g) => g.toLowerCase() === gLower);
      }
      return String(m.genre).toLowerCase() === gLower;
    });
  }

  // 3. Language Filter
  if (language && language !== 'All') {
    const lLower = language.toLowerCase();
    results = results.filter((m) => m.language.toLowerCase() === lLower);
  }

  // 4. Collection Filter
  if (collection && collection !== 'All Collections') {
    results = results.filter((m) => m.collection === collection);
  }

  // 5. Release Year Filter
  if (year && year !== 'All') {
    const yNum = Number(year);
    results = results.filter((m) => m.releaseYear === yNum);
  }

  // 6. Sorting
  results.sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'year') {
      comparison = a.releaseYear - b.releaseYear;
    } else {
      // Default: rating
      comparison = a.rating - b.rating;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  return results;
};

/**
 * Get all available unique genres
 * @returns {Array<string>}
 */
export const getAvailableGenres = () => {
  return MOVIE_GENRES;
};

/**
 * Get all available unique languages
 * @returns {Array<string>}
 */
export const getAvailableLanguages = () => {
  return MOVIE_LANGUAGES;
};

/**
 * Get all unique release years sorted descending
 * @returns {Array<number>}
 */
export const getAvailableYears = () => {
  const years = Array.from(new Set(moviesData.map((m) => m.releaseYear)));
  return years.sort((a, b) => b - a);
};
