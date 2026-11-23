import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Star,
  Sparkles,
  Flame,
  Clock,
  Film,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import MovieCard from '../components/movies/MovieCard';
import StarRating from '../components/common/StarRating';
import {
  getFeaturedMovies,
  getPopularMovies,
  getRecentMovies,
  getAllMovies,
} from '../services/movieService';
import { BRAND, MOVIE_GENRES } from '../utils/constants';

export const Home = () => {
  const navigate = useNavigate();

  // Curated datasets
  const allMovies = getAllMovies();
  const featuredMovies = getFeaturedMovies();
  const popularMovies = getPopularMovies(10);
  const recentMovies = getRecentMovies(10);

  // The primary hero featured movie
  const heroMovie =
    featuredMovies.find((m) => m.id === 'inception-2010') || featuredMovies[0] || allMovies[0];

  const genresList = MOVIE_GENRES.filter((g) => g !== 'All');

  return (
    <div className="flex flex-col w-full pb-16 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[620px] lg:min-h-[720px] flex items-center justify-center bg-midnight border-b border-charcoal-border overflow-hidden">
        {/* Background Artwork Layer with Cinematic Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroMovie.poster}
            alt={heroMovie.title}
            className="w-full h-full object-cover object-center scale-110 blur-xl opacity-20 transform -translate-y-6"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/90 to-midnight/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Branding, Headline, Supporting Text, CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal/90 border border-gold/40 text-xs font-semibold text-gold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Cinema Collection • Discover Great Films</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ivory leading-[1.15]">
                {BRAND.HEADLINE}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                {BRAND.SUBTITLE}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/explore" className="btn-gold !text-base !px-6 !py-3 shadow-gold-glow">
                  <Compass className="w-5 h-5" />
                  <span>Explore the Collection</span>
                </Link>

                <Link
                  to={`/movie/${heroMovie.id}`}
                  className="btn-outline !text-base !px-6 !py-3"
                >
                  <Film className="w-5 h-5 text-gold" />
                  <span>Featured: {heroMovie.title}</span>
                </Link>
              </div>

              {/* Platform Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-charcoal-border/70 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-bold font-display text-gold">Masterworks</p>
                  <p className="text-xs text-muted">Hand-Curated Films</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold font-display text-gold">Community</p>
                  <p className="text-xs text-muted">Insightful Reviews</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold font-display text-gold">Global</p>
                  <p className="text-xs text-muted">World Cinema</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Featured Movie Card Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative group max-w-sm w-full">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold/30 via-gold/10 to-charcoal blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />

                <div className="relative bg-charcoal border border-gold/40 rounded-2xl overflow-hidden shadow-cinematic flex flex-col">
                  {/* Poster image */}
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-midnight">
                    <img
                      src={heroMovie.poster}
                      alt={heroMovie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-midnight/80 backdrop-blur-md border border-gold/40 text-[11px] font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-gold" />
                      <span>Featured Spotlight</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-bold text-ivory group-hover:text-gold transition-colors">
                          {heroMovie.title}
                        </h3>
                        <p className="text-xs text-muted">
                          {heroMovie.releaseYear} • Directed by {heroMovie.director}
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-midnight border border-gold/40 text-gold font-bold text-sm flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3.5 h-3.5 fill-gold" />
                        <span>{heroMovie.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-ivory/80 line-clamp-2 leading-relaxed font-light">
                      {heroMovie.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <StarRating rating={heroMovie.rating} size="sm" />
                      <Link
                        to={`/movie/${heroMovie.id}`}
                        className="text-xs font-semibold text-gold hover:text-gold-light inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED MOVIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Hand-Picked Selections</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
              Featured Masterpieces
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-semibold text-gold hover:text-gold-light inline-flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Explore the Collection</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {featuredMovies.slice(0, 5).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* POPULAR MOVIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
              <Flame className="w-4 h-4" />
              <span>Audience Favorites</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
              Popular Across the SCREENVERSE
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-semibold text-gold hover:text-gold-light inline-flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View Full Catalogue</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Popular Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {popularMovies.slice(0, 5).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* GENRE COLLECTIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-2">
            <Layers className="w-4 h-4" />
            <span>Curated Categories</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
            Browse by Genre Collections
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1.5">
            Dive into diverse storytelling styles, from high-stakes science fiction to soul-stirring dramas.
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {genresList.map((genre) => (
            <button
              key={genre}
              onClick={() => navigate(`/explore?genre=${encodeURIComponent(genre)}`)}
              className="group p-4 rounded-xl bg-charcoal-card border border-charcoal-border hover:border-gold/60 hover:shadow-gold-glow text-left transition-all duration-200 flex flex-col justify-between h-24"
            >
              <span className="font-display text-sm font-semibold text-ivory group-hover:text-gold transition-colors">
                {genre}
              </span>
              <div className="flex items-center justify-between text-[11px] text-muted">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* RECENTLY RELEASED CINEMA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
              <Clock className="w-4 h-4" />
              <span>Modern Releases</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
              Recently Released Cinema
            </h2>
          </div>
          <Link
            to="/explore?sortBy=year"
            className="text-xs font-semibold text-gold hover:text-gold-light inline-flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Sort by Year</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {recentMovies.slice(0, 5).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* REGIONAL CINEMA SPOTLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 w-full">
        <div className="card-cinematic p-6 sm:p-10 border-gold/30 bg-gradient-to-br from-charcoal-card via-charcoal to-midnight">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center">
                <Film className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-lg font-bold text-ivory">
                Bollywood Classics &amp; Hits
              </h3>
              <p className="text-xs text-muted leading-relaxed font-light">
                Experience iconic Hindi storytelling, from Aamir Khan&apos;s <em>3 Idiots</em> and <em>Dangal</em> to Sriram Raghavan&apos;s gripping thriller <em>Andhadhun</em>.
              </p>
              <Link
                to="/explore?collection=Bollywood"
                className="text-xs font-semibold text-gold inline-flex items-center gap-1 hover:underline"
              >
                <span>Explore Bollywood Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-lg font-bold text-ivory">
                Telugu &amp; Tamil Epics
              </h3>
              <p className="text-xs text-muted leading-relaxed font-light">
                From S.S. Rajamouli&apos;s global sensations <em>RRR</em> and <em>Baahubali 2</em> to Lokesh Kanagaraj&apos;s <em>Vikram</em> and the nostalgic romance <em>96</em>.
              </p>
              <Link
                to="/explore?collection=Telugu+%26+Tamil+Cinema"
                className="text-xs font-semibold text-gold inline-flex items-center gap-1 hover:underline"
              >
                <span>Explore Telugu &amp; Tamil Cinema</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-lg font-bold text-ivory">
                Malayalam &amp; Kannada Gems
              </h3>
              <p className="text-xs text-muted leading-relaxed font-light">
                Groundbreaking storytelling featuring <em>Drishyam</em>, acclaimed survival thriller <em>Manjummel Boys</em>, <em>Kumbalangi Nights</em>, and Kannada triumphs like <em>Lucia</em>.
              </p>
              <Link
                to="/explore?collection=Malayalam+%26+Kannada+Cinema"
                className="text-xs font-semibold text-gold inline-flex items-center gap-1 hover:underline"
              >
                <span>Explore Malayalam &amp; Kannada Cinema</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHORT SCREENVERSE INTRODUCTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory mb-3">
          About SCREENVERSE
        </h2>
        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 font-light max-w-2xl mx-auto">
          SCREENVERSE is an independent cinematic platform crafted for film lovers to discover exceptional cinema, explore diverse world traditions, and engage in thoughtful community critiques. From timeless Hollywood epics and modern sci-fi masterpieces to the vibrant storytelling of Bollywood and South Indian regional cinema, SCREENVERSE is your doorway to stories that resonate.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-gold">
          <Star className="w-3.5 h-3.5 fill-gold" />
          <span>Curated with passion for the magic of moving pictures</span>
          <Star className="w-3.5 h-3.5 fill-gold" />
        </div>
      </section>
    </div>
  );
};

export default Home;
