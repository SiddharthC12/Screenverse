/**
 * SCREENVERSE – Review Service
 * Manages predefined sample reviews and interactive user reviews.
 * Implements two distinct rating categories: Community Sample Rating and User Rating.
 */

import sampleReviewsData from '../data/sampleReviews.json';
import moviesData from '../data/movies.json';
import { getItem, setItem } from '../utils/storage';
import { STORAGE_KEYS, DEFAULT_DEMO_USER } from '../utils/constants';

/**
 * Get all user reviews from localStorage
 * @returns {Array} List of user-submitted reviews
 */
export const getUserReviews = () => {
  return getItem(STORAGE_KEYS.USER_REVIEWS, []);
};

/**
 * Save user reviews to localStorage
 * @param {Array} reviews
 * @returns {boolean}
 */
const saveUserReviews = (reviews) => {
  return setItem(STORAGE_KEYS.USER_REVIEWS, reviews);
};

/**
 * Get combined reviews for a specific movie
 * User-submitted reviews appear first, followed by predefined community reviews.
 * @param {string} movieId
 * @returns {Array} Merged reviews
 */
export const getReviewsByMovieId = (movieId) => {
  if (!movieId) return [];
  const targetId = String(movieId).toLowerCase();

  const predefined = sampleReviewsData.filter(
    (r) => String(r.movieId).toLowerCase() === targetId
  );

  const userReviews = getUserReviews().filter(
    (r) => String(r.movieId).toLowerCase() === targetId
  );

  return [...userReviews, ...predefined];
};

/**
 * Calculate dynamic rating statistics for a movie with strictly separated categories:
 * 1. Community Sample Rating (from predefined 8 reviews)
 * 2. User Rating (calculated exclusively from user-submitted reviews)
 * @param {string} movieId
 * @param {number} fallbackInitialRating
 * @returns {Object} Distinct rating metrics
 */
export const getMovieRatingStats = (movieId, fallbackInitialRating = 0) => {
  const allReviews = getReviewsByMovieId(movieId);
  const predefined = allReviews.filter((r) => r.isPredefined);
  const userReviews = allReviews.filter((r) => !r.isPredefined);

  // 1. Community Sample Rating (Predefined reviews)
  let sampleAvg = Number(fallbackInitialRating) || 0;
  if (predefined.length > 0) {
    const sumPredefined = predefined.reduce((acc, curr) => acc + Number(curr.rating || 0), 0);
    sampleAvg = Math.round((sumPredefined / predefined.length) * 10) / 10;
  }

  // 2. User Rating (User-submitted reviews only)
  let userAvg = null;
  if (userReviews.length > 0) {
    const sumUser = userReviews.reduce((acc, curr) => acc + Number(curr.rating || 0), 0);
    userAvg = Math.round((sumUser / userReviews.length) * 10) / 10;
  }

  return {
    sampleRating: sampleAvg,
    sampleStarRating: Math.round((sampleAvg / 2) * 10) / 10,
    sampleReviewCount: predefined.length,
    userRating: userAvg,
    userStarRating: userAvg !== null ? Math.round((userAvg / 2) * 10) / 10 : null,
    userReviewCount: userReviews.length,
    totalReviewCount: allReviews.length,
  };
};

/**
 * Check if a specific user has already submitted an active review for a movie
 * @param {string} movieId
 * @param {string} userId
 * @returns {Object|null} Existing user review if found, otherwise null
 */
export const getUserReviewForMovie = (movieId, userId = DEFAULT_DEMO_USER.id) => {
  if (!movieId || !userId) return null;
  const userReviews = getUserReviews();
  const found = userReviews.find(
    (r) =>
      String(r.movieId).toLowerCase() === String(movieId).toLowerCase() &&
      String(r.userId) === String(userId)
  );
  return found ? { ...found } : null;
};

/**
 * Validate and add a new user-submitted review
 * @param {Object} reviewData
 * @returns {{ success: boolean, review?: Object, error?: string }}
 */
export const addUserReview = ({
  movieId,
  userId = DEFAULT_DEMO_USER.id,
  userName = DEFAULT_DEMO_USER.displayName,
  userAvatar = DEFAULT_DEMO_USER.avatar,
  initials = DEFAULT_DEMO_USER.initials,
  rating,
  reviewTitle,
  reviewText,
}) => {
  if (!movieId) {
    return { success: false, error: 'Movie identifier is required.' };
  }

  const numericRating = Number(rating);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 10) {
    return { success: false, error: 'Rating must be between 1.0 and 10.0.' };
  }

  if (!reviewTitle || reviewTitle.trim().length < 3) {
    return { success: false, error: 'Review title must be at least 3 characters long.' };
  }

  if (!reviewText || reviewText.trim().length < 10) {
    return { success: false, error: 'Review description must be at least 10 characters long.' };
  }

  // Prevent duplicate reviews
  const existingReview = getUserReviewForMovie(movieId, userId);
  if (existingReview) {
    return {
      success: false,
      error: 'You have already reviewed this film. You can edit your existing review instead.',
      existingReview,
    };
  }

  const newReview = {
    id: `usr-rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    movieId: String(movieId),
    userId: String(userId),
    userName: userName || DEFAULT_DEMO_USER.displayName,
    userAvatar: userAvatar || DEFAULT_DEMO_USER.avatar,
    initials: initials || DEFAULT_DEMO_USER.initials,
    rating: Math.round(numericRating * 10) / 10,
    reviewTitle: reviewTitle.trim(),
    reviewText: reviewText.trim(),
    date: new Date().toISOString().split('T')[0],
    isPredefined: false,
    isUserSubmitted: true,
  };

  const currentReviews = getUserReviews();
  const updatedReviews = [newReview, ...currentReviews];
  saveUserReviews(updatedReviews);

  return { success: true, review: newReview };
};

/**
 * Update an existing user-submitted review
 * @param {string} reviewId
 * @param {Object} updateData
 * @param {string} [requestingUserId=DEFAULT_DEMO_USER.id]
 * @returns {{ success: boolean, review?: Object, error?: string }}
 */
export const updateUserReview = (
  reviewId,
  { rating, reviewTitle, reviewText },
  requestingUserId = DEFAULT_DEMO_USER.id
) => {
  const currentReviews = getUserReviews();
  const index = currentReviews.findIndex((r) => String(r.id) === String(reviewId));

  if (index === -1) {
    return { success: false, error: 'Review not found or cannot be modified.' };
  }

  const reviewToUpdate = currentReviews[index];

  // Protect reviews from other users and predefined reviews
  if (reviewToUpdate.isPredefined || String(reviewToUpdate.userId) !== String(requestingUserId)) {
    return { success: false, error: 'Permission denied: You can only edit your own reviews.' };
  }

  const numericRating = Number(rating);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 10) {
    return { success: false, error: 'Rating must be between 1.0 and 10.0.' };
  }

  if (!reviewTitle || reviewTitle.trim().length < 3) {
    return { success: false, error: 'Review title must be at least 3 characters long.' };
  }

  if (!reviewText || reviewText.trim().length < 10) {
    return { success: false, error: 'Review description must be at least 10 characters long.' };
  }

  const updatedReview = {
    ...reviewToUpdate,
    rating: Math.round(numericRating * 10) / 10,
    reviewTitle: reviewTitle.trim(),
    reviewText: reviewText.trim(),
    dateEdited: new Date().toISOString().split('T')[0],
  };

  currentReviews[index] = updatedReview;
  saveUserReviews(currentReviews);

  return { success: true, review: updatedReview };
};

/**
 * Delete a user-submitted review with ownership check
 * @param {string} reviewId
 * @param {string} [requestingUserId=DEFAULT_DEMO_USER.id]
 * @returns {{ success: boolean, error?: string }}
 */
export const deleteUserReview = (reviewId, requestingUserId = DEFAULT_DEMO_USER.id) => {
  const currentReviews = getUserReviews();
  const reviewToDelete = currentReviews.find((r) => String(r.id) === String(reviewId));

  if (!reviewToDelete) {
    return { success: false, error: 'Review not found or cannot be deleted.' };
  }

  // Predefined reviews must never be deleted
  if (reviewToDelete.isPredefined) {
    return { success: false, error: 'Community sample reviews cannot be deleted.' };
  }

  if (String(reviewToDelete.userId) !== String(requestingUserId)) {
    return { success: false, error: 'Permission denied: You can only delete your own reviews.' };
  }

  const filtered = currentReviews.filter((r) => String(r.id) !== String(reviewId));
  saveUserReviews(filtered);

  return { success: true };
};

/**
 * Get all reviews authored by Arjun Sharma (both predefined spotlights and user-submitted)
 * @param {string} [userName=DEFAULT_DEMO_USER.displayName]
 * @param {string} [userId=DEFAULT_DEMO_USER.id]
 * @returns {Array} Enriched list of reviews with movie poster and title
 */
export const getReviewsForProfile = (
  userName = DEFAULT_DEMO_USER.displayName,
  userId = DEFAULT_DEMO_USER.id
) => {
  const userReviews = getUserReviews().filter((r) => String(r.userId) === String(userId));

  // Find predefined reviews attributed to Arjun Sharma
  const matchingPredefined = sampleReviewsData.filter(
    (r) =>
      r.userName.toLowerCase() === userName.toLowerCase() ||
      r.userName.toLowerCase() === 'alex morgan' ||
      r.isProfileUser
  );

  // Filter out any predefined review if user has submitted a live review for that movie
  const userReviewedMovieIds = new Set(userReviews.map((r) => r.movieId));
  const activePredefined = matchingPredefined.filter((r) => !userReviewedMovieIds.has(r.movieId));

  const combined = [...userReviews, ...activePredefined];

  return combined
    .map((rev) => {
      const movie = moviesData.find((m) => m.id === rev.movieId);
      return {
        ...rev,
        userName: rev.isUserSubmitted ? rev.userName : DEFAULT_DEMO_USER.displayName,
        userAvatar: DEFAULT_DEMO_USER.avatar,
        initials: DEFAULT_DEMO_USER.initials,
        movieTitle: movie?.title || 'Unknown Title',
        moviePoster: movie?.poster || '',
        movieYear: movie?.releaseYear || '',
        movieGenre: movie?.primaryGenre || '',
        movieSlug: movie?.slug || '',
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Calculate comprehensive review statistics for Arjun Sharma's profile
 * @param {string} [userName=DEFAULT_DEMO_USER.displayName]
 * @param {string} [userId=DEFAULT_DEMO_USER.id]
 * @returns {Object}
 */
export const getProfileReviewStats = (
  userName = DEFAULT_DEMO_USER.displayName,
  userId = DEFAULT_DEMO_USER.id
) => {
  const profileReviews = getReviewsForProfile(userName, userId);

  if (profileReviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      recentReviews: [],
      recentMovies: [],
    };
  }

  const sum = profileReviews.reduce((acc, curr) => acc + Number(curr.rating || 0), 0);
  const avg = sum / profileReviews.length;
  const roundedAvg = Math.round(avg * 10) / 10;

  const seenMovieIds = new Set();
  const recentMovies = [];
  for (const rev of profileReviews) {
    if (!seenMovieIds.has(rev.movieId)) {
      seenMovieIds.add(rev.movieId);
      recentMovies.push({
        id: rev.movieId,
        title: rev.movieTitle,
        poster: rev.moviePoster,
        releaseYear: rev.movieYear,
        genre: rev.movieGenre,
        userRating: rev.rating,
        reviewDate: rev.date,
        isUserSubmitted: rev.isUserSubmitted,
      });
    }
  }

  return {
    totalReviews: profileReviews.length,
    averageRating: roundedAvg,
    recentReviews: profileReviews,
    recentMovies: recentMovies.slice(0, 8),
  };
};
