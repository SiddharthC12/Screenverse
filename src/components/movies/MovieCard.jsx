import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

export const MovieCard = ({ movie, priority = false }) => {
  if (!movie) return null;

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="group relative flex flex-col h-full bg-charcoal-card border border-charcoal-border/70 rounded-xl overflow-hidden hover:border-gold/60 hover:shadow-gold-glow transition-colors duration-300"
    >
      <Link
        to={`/movie/${movie.id}`}
        className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-xl"
        aria-label={`View details for ${movie.title} (${movie.releaseYear})`}
      >
        {/* Poster Wrapper */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-charcoal">
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-card via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

          {/* Top Rating Badge */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-midnight/85 backdrop-blur-md border border-gold/40 flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span className="text-xs font-bold text-gold">
              {Number(movie.rating).toFixed(1)}
            </span>
          </div>

          {/* Language Chip */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-midnight/80 backdrop-blur-sm border border-charcoal-border text-[10px] uppercase font-semibold tracking-wider text-ivory/80">
            {movie.language}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-sm sm:text-base text-ivory group-hover:text-gold transition-colors duration-200 line-clamp-1">
              {movie.title}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {movie.releaseYear} • {movie.director || 'Cinema Feature'}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-charcoal-border/40 flex items-center justify-between text-xs">
            <span className="badge-genre !text-[11px] !py-0.5">
              {movie.primaryGenre || (Array.isArray(movie.genre) ? movie.genre[0] : movie.genre)}
            </span>
            <span className="text-[11px] text-gold/80 font-medium group-hover:translate-x-0.5 transition-transform">
              Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
