/**
 * SCREENVERSE – Stage 6 Automated Verification Script
 * Validates:
 * 1. Arjun Sharma identity & constants
 * 2. Non-human golden film reel avatar
 * 3. 560 Predefined reviews integrity (8 per movie)
 * 4. Interactive Review CRUD, validation, and duplicate prevention
 * 5. Predefined reviews immutability
 * 6. Dual rating system separation (Sample vs User)
 * 7. Profile review statistics & reactive updates
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// In-memory localStorage mock for node environment
const storageStore = new Map();
globalThis.localStorage = {
  getItem: (key) => storageStore.get(key) || null,
  setItem: (key, value) => storageStore.set(key, String(value)),
  removeItem: (key) => storageStore.delete(key),
  clear: () => storageStore.clear(),
};

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log(' SCREENVERSE – STAGE 6 AUTOMATED VERIFICATION SUITE');
  console.log('======================================================\n');

  // TEST 1: Default Profile Identity
  console.log('TEST SUITE 1: Default Profile Identity & Constants');
  const { DEFAULT_DEMO_USER, BRAND } = await import('../src/utils/constants.js');
  
  assert(DEFAULT_DEMO_USER.displayName === 'Arjun Sharma', 'Display name is Arjun Sharma');
  assert(DEFAULT_DEMO_USER.username === 'arjunsharma', 'Username is arjunsharma');
  assert(DEFAULT_DEMO_USER.email === 'arjun.sharma@example.com', 'Email is arjun.sharma@example.com');
  assert(DEFAULT_DEMO_USER.location.includes('Bengaluru'), 'Location is Bengaluru, India');
  assert(DEFAULT_DEMO_USER.membership === 'SCREENVERSE Member', 'Membership is SCREENVERSE Member');
  assert(DEFAULT_DEMO_USER.avatar === '/images/branding/film-reel-avatar.svg', 'Avatar is /images/branding/film-reel-avatar.svg');
  assert(
    DEFAULT_DEMO_USER.favoriteGenres.includes('Sci-Fi') &&
    DEFAULT_DEMO_USER.favoriteGenres.includes('Thriller') &&
    DEFAULT_DEMO_USER.favoriteGenres.includes('Action') &&
    DEFAULT_DEMO_USER.favoriteGenres.includes('Drama'),
    'Favorite genres include Sci-Fi, Thriller, Action, and Drama'
  );

  // TEST 2: Non-Human Golden Film Reel Avatar
  console.log('\nTEST SUITE 2: Non-Human Golden Film Reel Avatar');
  const avatarPath = path.join(rootDir, 'public', 'images', 'branding', 'film-reel-avatar.svg');
  assert(fs.existsSync(avatarPath), 'Avatar file exists at public/images/branding/film-reel-avatar.svg');
  
  const avatarContent = fs.readFileSync(avatarPath, 'utf-8');
  assert(avatarContent.includes('<svg'), 'Avatar is a valid SVG document');
  assert(avatarContent.includes('#C9A45C') || avatarContent.includes('goldGradient'), 'Avatar uses champagne gold palette');
  assert(avatarContent.includes('circle'), 'Avatar contains film reel circular geometry');
  assert(!avatarContent.includes('unsplash.com') && !avatarContent.includes('http'), 'Avatar does not rely on external photo URLs');

  // TEST 3: Predefined Reviews Integrity
  console.log('\nTEST SUITE 3: Predefined Reviews Integrity (560 Reviews)');
  const sampleReviewsPath = path.join(rootDir, 'src', 'data', 'sampleReviews.json');
  const sampleReviews = JSON.parse(fs.readFileSync(sampleReviewsPath, 'utf-8'));
  const moviesPath = path.join(rootDir, 'src', 'data', 'movies.json');
  const movies = JSON.parse(fs.readFileSync(moviesPath, 'utf-8'));

  assert(movies.length === 70, `Exactly 70 curated movies in collection (found ${movies.length})`);
  assert(sampleReviews.length === 560, `Exactly 560 predefined reviews (8 per movie, found ${sampleReviews.length})`);

  // Count reviews per movie
  const movieReviewCounts = {};
  for (const r of sampleReviews) {
    movieReviewCounts[r.movieId] = (movieReviewCounts[r.movieId] || 0) + 1;
    if (r.userName === 'Arjun Sharma') {
      assert(r.userAvatar === '/images/branding/film-reel-avatar.svg', `Arjun Sharma review on ${r.movieId} uses film reel avatar`);
    }
  }
  const allMoviesHave8 = movies.every(m => movieReviewCounts[m.id] === 8);
  assert(allMoviesHave8, 'Every one of the 70 movies has exactly 8 predefined reviews');

  // TEST 4: Review CRUD & Validation Operations
  console.log('\nTEST SUITE 4: Interactive Review CRUD & Validation');
  const {
    addUserReview,
    updateUserReview,
    deleteUserReview,
    getUserReviewForMovie,
    getMovieRatingStats,
    getReviewsByMovieId,
    getProfileReviewStats,
    getReviewsForProfile
  } = await import('../src/services/reviewService.js');

  const testMovieId = 'the-dark-knight-2008';

  // 4.1 Rating validation
  const invalidRatingLow = addUserReview({ movieId: testMovieId, rating: 0.5, reviewTitle: 'Too low', reviewText: 'A great cinematic experience' });
  assert(!invalidRatingLow.success && invalidRatingLow.error.includes('1.0 and 10.0'), 'Rejects rating below 1.0');

  const invalidRatingHigh = addUserReview({ movieId: testMovieId, rating: 10.5, reviewTitle: 'Too high', reviewText: 'A great cinematic experience' });
  assert(!invalidRatingHigh.success && invalidRatingHigh.error.includes('1.0 and 10.0'), 'Rejects rating above 10.0');

  // 4.2 Title & Text validation
  const invalidTitle = addUserReview({ movieId: testMovieId, rating: 8.5, reviewTitle: 'ab', reviewText: 'A great cinematic experience' });
  assert(!invalidTitle.success && invalidTitle.error.includes('at least 3 characters'), 'Rejects title shorter than 3 characters');

  const invalidText = addUserReview({ movieId: testMovieId, rating: 8.5, reviewTitle: 'Valid Title', reviewText: 'Too short' });
  assert(!invalidText.success && invalidText.error.includes('at least 10 characters'), 'Rejects text shorter than 10 characters');

  // 4.3 Successful submission
  const validSubmission = addUserReview({
    movieId: testMovieId,
    rating: 9.5,
    reviewTitle: 'A Masterclass in Modern Cinema',
    reviewText: 'Ledger and Nolan created an untouchable standard for psychological comic book adaptations.'
  });
  assert(validSubmission.success, 'Submits valid review successfully');
  assert(validSubmission.review.rating === 9.5, 'Preserves decimal rating accurately (9.5/10)');
  assert(validSubmission.review.userName === 'Arjun Sharma', 'Attributed to Arjun Sharma');
  assert(validSubmission.review.userAvatar === '/images/branding/film-reel-avatar.svg', 'Uses film reel avatar');

  // 4.4 Duplicate prevention
  const duplicateSubmission = addUserReview({
    movieId: testMovieId,
    rating: 8.0,
    reviewTitle: 'Duplicate Attempt',
    reviewText: 'This submission should be rejected to prevent spam.'
  });
  assert(!duplicateSubmission.success, 'Rejects duplicate review submission for the same movie');
  assert(duplicateSubmission.error.includes('already reviewed'), 'Returns friendly duplicate warning message');

  // 4.5 Retrieval of existing review
  const existingReview = getUserReviewForMovie(testMovieId);
  assert(existingReview !== null && existingReview.id === validSubmission.review.id, 'Retrieves existing user review for movie');

  // 4.6 Review edit
  const editResult = updateUserReview(validSubmission.review.id, {
    rating: 10.0,
    reviewTitle: 'An Absolute Masterpiece',
    reviewText: 'Updated critique: A flawless symphony of tension, pacing, and philosophical chaos.'
  });
  assert(editResult.success, 'Updates existing user review successfully');
  assert(editResult.review.rating === 10.0, 'Updated rating is 10.0');
  assert(editResult.review.reviewTitle === 'An Absolute Masterpiece', 'Updated title matches');

  // 4.7 Immutability of predefined reviews
  const predefinedReviewToTest = sampleReviews[0];
  const illegalEdit = updateUserReview(predefinedReviewToTest.id, {
    rating: 1.0,
    reviewTitle: 'Hacked Title',
    reviewText: 'Should not be allowed to modify predefined sample.'
  });
  assert(!illegalEdit.success, 'Blocks editing of predefined sample reviews');

  const illegalDelete = deleteUserReview(predefinedReviewToTest.id);
  assert(!illegalDelete.success, 'Blocks deletion of predefined sample reviews');

  // TEST 5: Dual Rating System Separation
  console.log('\nTEST SUITE 5: Dual Rating System Separation (Sample vs User)');
  const ratingStats = getMovieRatingStats(testMovieId, 9.0);
  assert(ratingStats.sampleRating > 0, `Sample rating calculated (${ratingStats.sampleRating}/10)`);
  assert(ratingStats.sampleReviewCount === 8, `Sample count strictly 8 (${ratingStats.sampleReviewCount})`);
  assert(ratingStats.userRating === 10.0, `User rating calculated exclusively from user reviews (${ratingStats.userRating}/10)`);
  assert(ratingStats.userReviewCount === 1, `User review count reflects exactly 1 user review (${ratingStats.userReviewCount})`);
  assert(ratingStats.totalReviewCount === 9, `Total reviews reflects 8 sample + 1 user = 9 (${ratingStats.totalReviewCount})`);

  // Test movie with 0 user reviews
  const statsNoUser = getMovieRatingStats('parasite-2019', 8.5);
  assert(statsNoUser.userRating === null, 'User rating is null when no user reviews exist (no synthetic skewing)');
  assert(statsNoUser.userReviewCount === 0, 'User review count is 0');

  // TEST 6: Review Deletion & State Reset
  console.log('\nTEST SUITE 6: Review Deletion & State Reset');
  const deleteResult = deleteUserReview(validSubmission.review.id);
  assert(deleteResult.success, 'Deletes user review successfully');

  const reviewAfterDelete = getUserReviewForMovie(testMovieId);
  assert(reviewAfterDelete === null, 'User review is no longer found after deletion');

  const statsAfterDelete = getMovieRatingStats(testMovieId, 9.0);
  assert(statsAfterDelete.userRating === null, 'User rating returns to null after deleting user review');
  assert(statsAfterDelete.userReviewCount === 0, 'User review count returns to 0');

  // Re-submission is now allowed
  const reSubmission = addUserReview({
    movieId: testMovieId,
    rating: 9.0,
    reviewTitle: 'Fresh Critique',
    reviewText: 'Now that the previous review was deleted, a new review can be created.'
  });
  assert(reSubmission.success, 'Allows new review creation after previous review was deleted');

  // TEST 7: Profile Integration & Statistics
  console.log('\nTEST SUITE 7: Profile Review Statistics & Integration');
  const profileReviews = getReviewsForProfile('Arjun Sharma');
  assert(profileReviews.length > 0, `Profile reviews loaded (${profileReviews.length} total)`);
  
  const userSubmittedProfileReview = profileReviews.find(r => r.movieId === testMovieId && r.isUserSubmitted);
  assert(userSubmittedProfileReview !== undefined, 'User-submitted review is included in profile reviews');
  assert(userSubmittedProfileReview.movieTitle === 'The Dark Knight', 'Enriched with movie title');
  assert(userSubmittedProfileReview.moviePoster.length > 0, 'Enriched with movie poster');

  const profileStats = getProfileReviewStats('Arjun Sharma');
  assert(profileStats.totalReviews === profileReviews.length, `Profile total reviews matches (${profileStats.totalReviews})`);
  assert(profileStats.averageRating >= 1 && profileStats.averageRating <= 10, `Profile average rating is valid (${profileStats.averageRating}/10)`);
  assert(profileStats.recentMovies.length > 0, `Profile contains recent movies (${profileStats.recentMovies.length})`);

  // Clean up test data
  deleteUserReview(reSubmission.review.id);

  console.log('\n======================================================');
  console.log(` RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
