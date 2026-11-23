import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Calendar,
  Globe,
  Clock,
  ShieldCheck,
  Film,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  PlusCircle,
  CheckCircle2,
  Users,
} from 'lucide-react';
import StarRating from '../components/common/StarRating';
import ReviewForm from '../components/reviews/ReviewForm';
import ConfirmModal from '../components/common/ConfirmModal';
import { useAuth } from '../context/AuthContext';
import { getMovieById } from '../services/movieService';
import {
  getReviewsByMovieId,
  getMovieRatingStats,
  getUserReviewForMovie,
  addUserReview,
  updateUserReview,
  deleteUserReview,
} from '../services/reviewService';
import { formatRuntime, formatDate } from '../utils/formatters';

export const MovieDetails = () => {
  const { id } = useParams();
  const movie = getMovieById(id);
  const { user } = useAuth();

  // Local state for dynamic real-time review updates without page reload
  const [reviewsVersion, setReviewsVersion] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Real-time reviews and separated rating statistics (Hooks called unconditionally at top)
  const reviews = useMemo(() => {
    return movie ? getReviewsByMovieId(movie.id) : [];
  }, [movie, reviewsVersion]);

  const stats = useMemo(() => {
    return movie ? getMovieRatingStats(movie.id, movie.rating) : { sampleRating: 0, sampleReviewCount: 0, userRating: null, userReviewCount: 0, totalReviewCount: 0 };
  }, [movie, reviewsVersion]);

  // Check if current user has an active submitted review
  const existingUserReview = useMemo(() => {
    return movie ? getUserReviewForMovie(movie.id, user?.id) : null;
  }, [movie, user?.id, reviewsVersion]);

  // Fallback if movie not found
  if (!movie) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-charcoal border border-charcoal-border flex items-center justify-center mx-auto mb-5">
          <Film className="w-8 h-8 text-gold" />
        </div>
        <h2 className="font-display text-3xl font-bold text-ivory mb-2">Movie Not Found</h2>
        <p className="text-muted text-sm mb-8 leading-relaxed">
          The requested movie id &quot;{id}&quot; does not exist in the SCREENVERSE collection.
        </p>
        <Link to="/explore" className="btn-gold">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Explore</span>
        </Link>
      </div>
    );
  }

  const showToast = (text, type = 'success') => {
    setFeedbackMessage({ text, type });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  // Review Submission Handlers
  const handleReviewSubmit = ({ rating, reviewTitle, reviewText }) => {
    if (editingReview) {
      // Edit existing review
      const res = updateUserReview(
        editingReview.id,
        { rating, reviewTitle, reviewText },
        user?.id
      );

      if (res.success) {
        setReviewsVersion((v) => v + 1);
        setIsFormOpen(false);
        setEditingReview(null);
        showToast('Your review has been updated successfully.');
      } else {
        showToast(res.error || 'Failed to update review.', 'error');
      }
    } else {
      // Create new review
      const res = addUserReview({
        movieId: movie.id,
        userId: user?.id,
        userName: user?.displayName,
        userAvatar: user?.avatar,
        initials: user?.initials,
        rating,
        reviewTitle,
        reviewText,
      });

      if (res.success) {
        setReviewsVersion((v) => v + 1);
        setIsFormOpen(false);
        showToast('Your review has been published successfully!');
      } else {
        showToast(res.error || 'Failed to publish review.', 'error');
      }
    }
  };

  // Delete Handlers
  const handleConfirmDelete = () => {
    if (!deleteCandidateId) return;

    const res = deleteUserReview(deleteCandidateId, user?.id);
    if (res.success) {
      setReviewsVersion((v) => v + 1);
      setDeleteCandidateId(null);
      if (editingReview && editingReview.id === deleteCandidateId) {
        setEditingReview(null);
        setIsFormOpen(false);
      }
      showToast('Your review has been deleted.');
    } else {
      showToast(res.error || 'Failed to delete review.', 'error');
      setDeleteCandidateId(null);
    }
  };

  const handleStartEdit = (rev) => {
    setEditingReview(rev);
    setIsFormOpen(true);
    window.scrollTo({ top: 550, behavior: 'smooth' });
  };

  // Visible reviews slice for Show More / Show Less
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  return (
    <div className="w-full pb-20 overflow-hidden">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-charcoal border border-gold/60 shadow-cinematic text-ivory text-xs sm:text-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Cinematic Top Backdrop Banner */}
      <div className="relative w-full h-72 sm:h-96 bg-midnight border-b border-charcoal-border overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center blur-2xl opacity-25 scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-transparent to-midnight" />

        {/* Back Button Overlay */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-midnight/80 backdrop-blur-md border border-charcoal-border hover:border-gold/50 text-xs text-ivory hover:text-gold transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </Link>
        </div>
      </div>

      {/* Main Details Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 sm:-mt-52 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Movie Poster */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-t from-gold/30 via-transparent to-gold/10 blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
              <div className="relative card-cinematic overflow-hidden aspect-[2/3] w-full shadow-cinematic border-gold/40">
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Rating, Synopsis */}
          <div className="md:col-span-7 lg:col-span-8 space-y-6 pt-2">
            {/* Genre & Collection Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {Array.isArray(movie.genre) ? (
                movie.genre.map((g) => (
                  <span key={g} className="badge-genre">
                    {g}
                  </span>
                ))
              ) : (
                <span className="badge-genre">{movie.genre}</span>
              )}

              {movie.collection && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold/15 text-gold border border-gold/40">
                  {movie.collection}
                </span>
              )}
            </div>

            {/* Movie Title & Director */}
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-ivory leading-tight mb-2">
                {movie.title}
              </h1>
              <p className="text-sm text-muted">
                Directed by <strong className="text-ivory font-medium">{movie.director}</strong>
              </p>
            </div>

            {/* SEPARATE DUAL RATING BOX */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5 rounded-2xl bg-charcoal border border-charcoal-border shadow-sm">
              {/* Category 1: Community Sample Rating */}
              <div className="space-y-1.5 pr-0 sm:pr-4 sm:border-r border-charcoal-border">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Community Sample Score</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-gold text-2xl font-extrabold font-display">
                    <Star className="w-6 h-6 fill-gold" />
                    <span>{stats.sampleRating.toFixed(1)}</span>
                    <span className="text-xs text-muted font-normal self-end pb-0.5">/ 10</span>
                  </div>
                  <div>
                    <StarRating rating={stats.sampleRating} size="sm" showNumber={false} />
                    <p className="text-[10px] text-muted">
                      Based on {stats.sampleReviewCount} curated critic reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Category 2: User Rating */}
              <div className="space-y-1.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-charcoal-border">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-gold" />
                  <span>Audience User Rating</span>
                </div>
                {stats.userRating !== null ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-gold text-2xl font-extrabold font-display">
                      <Star className="w-6 h-6 fill-gold" />
                      <span>{stats.userRating.toFixed(1)}</span>
                      <span className="text-xs text-muted font-normal self-end pb-0.5">/ 10</span>
                    </div>
                    <div>
                      <StarRating rating={stats.userRating} size="sm" showNumber={false} />
                      <p className="text-[10px] text-gold font-medium">
                        {stats.userReviewCount} user review{stats.userReviewCount > 1 ? 's' : ''} submitted
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-1">
                    <p className="text-xs text-ivory/80 font-medium">No user ratings submitted yet</p>
                    <p className="text-[11px] text-muted">
                      Be the first to rate and review this film!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Metadata Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-ivory/80">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-charcoal/50 border border-charcoal-border/70">
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-muted uppercase block">Release</span>
                  <span className="font-semibold">{movie.releaseYear}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-charcoal/50 border border-charcoal-border/70">
                <Globe className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-muted uppercase block">Language</span>
                  <span className="font-semibold">{movie.language}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-charcoal/50 border border-charcoal-border/70 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-muted uppercase block">Runtime</span>
                  <span className="font-semibold">{formatRuntime(movie.runtime)}</span>
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2 pt-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                <span>Synopsis</span>
              </h2>
              <p className="text-sm sm:text-base text-ivory/90 leading-relaxed font-light">
                {movie.description}
              </p>
            </div>
          </div>
        </div>

        {/* FUNCTIONAL REVIEW SUBMISSION / EDIT FORM */}
        <div className="mt-12">
          {isFormOpen ? (
            <ReviewForm
              movieTitle={movie.title}
              initialData={editingReview}
              onSubmit={handleReviewSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingReview(null);
              }}
            />
          ) : (
            <div className="p-5 sm:p-6 rounded-2xl card-cinematic border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/40 flex-shrink-0 bg-midnight">
                  <img
                    src={user?.avatar || '/images/branding/film-reel-avatar.svg'}
                    alt={user?.displayName || 'Arjun Sharma'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ivory">
                    {existingUserReview
                      ? `You reviewed ${movie.title}`
                      : `Rate and Review ${movie.title}`}
                  </h4>
                  <p className="text-xs text-muted">
                    {existingUserReview
                      ? `Your published review is rated ${existingUserReview.rating}/10.`
                      : 'Share your critical insights with the SCREENVERSE community.'}
                  </p>
                </div>
              </div>

              {existingUserReview ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(existingUserReview)}
                    className="btn-outline !py-2 !px-4 text-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-gold" />
                    <span>Edit Review</span>
                  </button>
                  <button
                    onClick={() => setDeleteCandidateId(existingUserReview.id)}
                    className="p-2 rounded-lg bg-charcoal border border-charcoal-border text-muted hover:text-red-400 hover:border-red-400/40 transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="btn-gold !py-2 !px-5 text-xs shadow-gold-glow flex-shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Write a Review</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-14 pt-10 border-t border-charcoal-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Audience &amp; Critic Perspectives</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
                Reviews for {movie.title}
              </h2>
            </div>
            <div className="text-xs text-muted">
              Showing {visibleReviews.length} of {reviews.length} reviews
            </div>
          </div>

          {/* User's Own Review (Pinned Highlight if present) */}
          {existingUserReview && (
            <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-charcoal/90 border-2 border-gold/50 shadow-gold-glow">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/60 flex-shrink-0 bg-midnight">
                    <img
                      src={user?.avatar || '/images/branding/film-reel-avatar.svg'}
                      alt={user?.displayName || 'Arjun Sharma'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-ivory">{user?.displayName || 'Arjun Sharma'}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold text-midnight">
                        Your Review
                      </span>
                    </div>
                    <p className="text-[11px] text-muted">
                      Published {formatDate(existingUserReview.date)}
                      {existingUserReview.dateEdited && ` (Edited ${formatDate(existingUserReview.dateEdited)})`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1 text-gold text-sm font-bold bg-midnight px-2.5 py-1 rounded-md border border-gold/40">
                    <Star className="w-3.5 h-3.5 fill-gold" />
                    <span>{Number(existingUserReview.rating).toFixed(1)}/10</span>
                  </div>

                  <button
                    onClick={() => handleStartEdit(existingUserReview)}
                    className="p-1.5 rounded-lg text-muted hover:text-gold hover:bg-charcoal transition-colors"
                    title="Edit review"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteCandidateId(existingUserReview.id)}
                    className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-charcoal transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {existingUserReview.reviewTitle && (
                <h5 className="font-display text-base font-semibold text-gold mb-1.5">
                  &quot;{existingUserReview.reviewTitle}&quot;
                </h5>
              )}
              <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-light">
                {existingUserReview.reviewText}
              </p>
            </div>
          )}

          {/* Reviews Grid (Predefined + other user reviews) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleReviews
              .filter((r) => r.id !== existingUserReview?.id)
              .map((rev) => (
                <div
                  key={rev.id}
                  className="card-cinematic p-5 sm:p-6 flex flex-col justify-between border-charcoal-border/80 hover:border-gold/50 transition-colors"
                >
                  <div>
                    {/* Reviewer Header */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-charcoal border border-gold/40 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {rev.userAvatar ? (
                            <img
                              src={rev.userAvatar}
                              alt={rev.userName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs font-bold text-gold">
                              {rev.initials || 'CR'}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-ivory flex items-center gap-1.5">
                            <span>{rev.userName}</span>
                            {rev.isUserSubmitted && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-gold/15 text-gold border border-gold/40 font-normal">
                                User Review
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-muted">{formatDate(rev.date)}</p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="inline-flex items-center gap-1 text-gold text-sm font-bold bg-midnight px-2.5 py-1 rounded-md border border-gold/30">
                          <Star className="w-3.5 h-3.5 fill-gold" />
                          <span>{Number(rev.rating).toFixed(1)}/10</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Title */}
                    {rev.reviewTitle && (
                      <h5 className="font-display text-base font-semibold text-gold mb-2">
                        &quot;{rev.reviewTitle}&quot;
                      </h5>
                    )}

                    {/* Review Body */}
                    <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
                      {rev.reviewText}
                    </p>
                  </div>

                  {/* Footer badge */}
                  <div className="mt-5 pt-3 border-t border-charcoal-border/50 flex items-center justify-between text-[11px] text-muted">
                    <span className="inline-flex items-center gap-1 text-gold/80 font-medium">
                      <ShieldCheck className="w-3 h-3 text-gold" />
                      <span>{rev.isUserSubmitted ? 'Verified User Review' : 'Community Critic'}</span>
                    </span>
                    <span>{rev.isUserSubmitted ? 'Audience' : 'Curated'}</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Show More / Show Less Toggle Button */}
          {reviews.length > 4 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="btn-outline !py-2.5 !px-6"
              >
                {showAllReviews ? (
                  <>
                    <ChevronUp className="w-4 h-4 text-gold" />
                    <span>Show Fewer Reviews</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 text-gold" />
                    <span>Show All Reviews ({reviews.length})</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Deleting Review */}
      <ConfirmModal
        isOpen={Boolean(deleteCandidateId)}
        title="Delete Your Review?"
        message="Are you sure you want to delete this review? Your rating and comments will be removed from this movie and your profile."
        confirmText="Yes, Delete Review"
        cancelText="Keep Review"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidateId(null)}
      />
    </div>
  );
};

export default MovieDetails;
