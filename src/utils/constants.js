/**
 * SCREENVERSE – Application Constants & Configuration
 * Tagline: Discover. Rate. Review.
 */

export const BRAND = {
  NAME: 'SCREENVERSE',
  TAGLINE: 'Discover. Rate. Review.',
  HEADLINE: 'Discover Your Next Favourite Movie.',
  SUBTITLE: 'Explore cinema, share your thoughts and rate the movies you love.',
  SHORT_DESCRIPTION: 'An independent cinematic movie discovery, rating and review platform for passionate cinema enthusiasts.',
  COLORS: {
    MIDNIGHT: '#101116',
    CHARCOAL: '#1D2028',
    CHAMPAGNE_GOLD: '#C9A45C',
    LIGHT_GOLD: '#E5BE72',
    IVORY: '#F5F3EE',
    MUTED_GREY: '#85858F',
  },
};

export const STORAGE_KEYS = {
  PROFILE: 'screenverse_demo_profile',
  AUTH_SESSION: 'screenverse_demo_auth_session',
  USER_REVIEWS: 'screenverse_user_reviews',
  USER_RATINGS: 'screenverse_user_ratings',
  WATCHLIST: 'screenverse_watchlist',
};

/**
 * Pre-populated default user profile: Arjun Sharma
 * Features the signature golden film-reel non-human avatar.
 */
export const DEFAULT_DEMO_USER = {
  id: 'user-arjun-sharma',
  username: 'arjunsharma',
  displayName: 'Arjun Sharma',
  email: 'arjun.sharma@example.com',
  avatar: '/images/branding/film-reel-avatar.svg',
  initials: 'AS',
  location: 'Bengaluru, India',
  membership: 'SCREENVERSE Member',
  bio: 'Cinema archivist, screen buff and storytelling enthusiast. Dedicated to atmospheric sci-fi, edge-of-the-seat thrillers, and character-driven world cinema.',
  favoriteGenres: ['Sci-Fi', 'Thriller', 'Action', 'Drama'],
  joinedDate: 'October 2024',
  isDemoUser: true,
};

export const MOVIE_GENRES = [
  'All',
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Thriller',
];

export const MOVIE_LANGUAGES = [
  'All',
  'English',
  'Hindi',
  'Telugu',
  'Tamil',
  'Malayalam',
  'Kannada',
  'Korean',
];

export const MOVIE_COLLECTIONS = [
  'All Collections',
  'Hollywood Action & Adventure',
  'Sci-Fi & Fantasy',
  'Thriller, Mystery & Horror',
  'Drama, Romance & Animation',
  'Bollywood',
  'Telugu & Tamil Cinema',
  'Malayalam & Kannada Cinema',
];

export const RATING_CONFIG = {
  MIN_RATING: 1,
  MAX_RATING: 10,
  STEP: 0.5,
};
