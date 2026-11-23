import MovieCard from './MovieCard';
import { motion } from 'motion/react';

export const MovieGrid = ({ movies = [], className = '' }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 ${className}`}
    >
      {movies.map((movie, index) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
        >
          <MovieCard movie={movie} priority={index < 5} />
        </motion.div>
      ))}
    </div>
  );
};

export default MovieGrid;
