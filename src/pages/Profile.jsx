import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Calendar,
  Award,
  Star,
  MessageSquare,
  Edit2,
  Trash2,
  Film,
  X,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import ConfirmModal from '../components/common/ConfirmModal';
import { useAuth } from '../context/AuthContext';
import {
  getProfileReviewStats,
  getReviewsForProfile,
  deleteUserReview,
} from '../services/reviewService';
import { formatDate } from '../utils/formatters';
import { MOVIE_GENRES, DEFAULT_DEMO_USER } from '../utils/constants';

export const Profile = () => {
  const { user, updateProfile, resetProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [reviewsVersion, setReviewsVersion] = useState(0);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Edit form state
  const [editName, setEditName] = useState(user?.displayName || DEFAULT_DEMO_USER.displayName);
  const [editBio, setEditBio] = useState(user?.bio || DEFAULT_DEMO_USER.bio);
  const [editLocation, setEditLocation] = useState(user?.location || DEFAULT_DEMO_USER.location);
  const [editAvatar, setEditAvatar] = useState(user?.avatar || DEFAULT_DEMO_USER.avatar);
  const [selectedGenres, setSelectedGenres] = useState(user?.favoriteGenres || DEFAULT_DEMO_USER.favoriteGenres);

  // Compute profile statistics and user-authored reviews reactively
  const stats = useMemo(() => {
    return getProfileReviewStats(
      user?.displayName || DEFAULT_DEMO_USER.displayName,
      user?.id || DEFAULT_DEMO_USER.id
    );
  }, [user?.displayName, user?.id, reviewsVersion]);

  const profileReviews = useMemo(() => {
    return getReviewsForProfile(
      user?.displayName || DEFAULT_DEMO_USER.displayName,
      user?.id || DEFAULT_DEMO_USER.id
    );
  }, [user?.displayName, user?.id, reviewsVersion]);

  const handleOpenEdit = () => {
    setEditName(user?.displayName || DEFAULT_DEMO_USER.displayName);
    setEditBio(user?.bio || DEFAULT_DEMO_USER.bio);
    setEditLocation(user?.location || DEFAULT_DEMO_USER.location);
    setEditAvatar(user?.avatar || DEFAULT_DEMO_USER.avatar);
    setSelectedGenres(user?.favoriteGenres || DEFAULT_DEMO_USER.favoriteGenres);
    setIsEditing(true);
  };

  const handleToggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      if (selectedGenres.length < 5) {
        setSelectedGenres([...selectedGenres, genre]);
      }
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      displayName: editName.trim() || user?.displayName,
      bio: editBio.trim() || user?.bio,
      location: editLocation.trim() || user?.location,
      avatar: editAvatar.trim() || user?.avatar,
      favoriteGenres: selectedGenres,
    });
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteCandidateId) return;
    const res = deleteUserReview(deleteCandidateId, user?.id || DEFAULT_DEMO_USER.id);
    if (res.success) {
      setReviewsVersion((v) => v + 1);
      setFeedbackToast('Review deleted successfully.');
      setTimeout(() => setFeedbackToast(null), 3500);
    } else {
      setFeedbackToast(res.error || 'Failed to delete review.');
      setTimeout(() => setFeedbackToast(null), 3500);
    }
    setDeleteCandidateId(null);
  };

  const availableGenres = MOVIE_GENRES.filter((g) => g !== 'All');

  return (
    <div className="w-full pb-20">
      {/* Toast Feedback Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-charcoal border border-gold/40 text-ivory shadow-cinematic text-xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Profile Header Ambient Background */}
      <div className="relative w-full h-56 sm:h-72 bg-gradient-to-b from-charcoal via-midnight to-midnight border-b border-charcoal-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
      </div>

      {/* Main Profile Content Wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 sm:-mt-36 relative z-10">
        {/* Profile Card Header */}
        <div className="card-cinematic p-6 sm:p-8 mb-10 border-gold/30 shadow-cinematic">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
            {/* Avatar with Golden Film Reel Branding */}
            <div className="relative group flex-shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-gold/50 shadow-gold-glow bg-midnight flex items-center justify-center">
                <img
                  src={user?.avatar || '/images/branding/film-reel-avatar.svg'}
                  alt={user?.displayName || 'Arjun Sharma'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* User Core Details */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
                      {user?.displayName || 'Arjun Sharma'}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold/15 text-gold border border-gold/40">
                      <Award className="w-3.5 h-3.5" />
                      <span>{user?.membership || 'SCREENVERSE Member'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-gold/90 font-medium">@{user?.username || 'arjunsharma'}</p>
                </div>

                {/* Edit Profile Button */}
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <button
                    onClick={handleOpenEdit}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-charcoal border border-charcoal-border hover:border-gold/50 text-xs text-ivory hover:text-gold transition-colors shadow-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed max-w-2xl font-light">
                {user?.bio || 'Passionate film archivist, cinephile, and community reviewer.'}
              </p>

              {/* Meta details (Email, Location, Joined Date) */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-muted pt-1">
                {user?.email && (
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    <span>{user.email}</span>
                  </span>
                )}
                {user?.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>{user.location}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>Member since {user?.joinedDate || 'October 2024'}</span>
                </span>
              </div>

              {/* Favourite Genres */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-1.5">
                <span className="text-[11px] uppercase tracking-wider text-muted font-medium mr-1">
                  Favourite Genres:
                </span>
                {(user?.favoriteGenres || ['Sci-Fi', 'Thriller', 'Action', 'Drama']).map((g) => (
                  <span key={g} className="badge-genre !text-[11px]">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="card-cinematic p-5 text-center">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-2">
              <MessageSquare className="w-4 h-4 text-gold" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-ivory">
              {stats.totalReviews}
            </p>
            <p className="text-xs text-muted mt-0.5">Reviews Published</p>
          </div>

          <div className="card-cinematic p-5 text-center">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-2">
              <Star className="w-4 h-4 text-gold fill-gold" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-gold">
              {stats.averageRating.toFixed(1)}
              <span className="text-xs text-muted font-normal">/10</span>
            </p>
            <p className="text-xs text-muted mt-0.5">Average Rating Given</p>
          </div>

          <div className="card-cinematic p-5 text-center">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-2">
              <Film className="w-4 h-4 text-gold" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-ivory">
              {stats.recentMovies.length}
            </p>
            <p className="text-xs text-muted mt-0.5">Distinct Films Critiqued</p>
          </div>

          <div className="card-cinematic p-5 text-center">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-gold" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-ivory">Top 5%</p>
            <p className="text-xs text-muted mt-0.5">Community Reviewer</p>
          </div>
        </div>

        {/* Recently Reviewed Movies Carousel/Grid */}
        {stats.recentMovies.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-ivory flex items-center gap-2">
                  <Film className="w-5 h-5 text-gold" />
                  <span>Recently Reviewed Titles</span>
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Films actively critiqued and rated by {user?.displayName || 'Arjun Sharma'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {stats.recentMovies.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  to={`/movie/${item.id}`}
                  className="card-cinematic group overflow-hidden flex flex-col hover:border-gold/60 transition-all shadow-sm"
                >
                  <div className="aspect-[2/3] w-full overflow-hidden bg-charcoal relative">
                    <img
                      src={item.poster}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-midnight/85 border border-gold/40 flex items-center gap-1 text-[11px] font-bold text-gold">
                      <Star className="w-3 h-3 fill-gold" />
                      <span>{Number(item.userRating).toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <h3 className="text-xs font-semibold text-ivory group-hover:text-gold transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-muted mt-0.5">{item.releaseYear}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Detailed User Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-charcoal-border">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-ivory flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gold" />
                <span>Reviews by {user?.displayName || 'Arjun Sharma'}</span>
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Detailed reflections and critical perspectives
              </p>
            </div>
            <span className="badge-genre !text-xs font-semibold">
              {profileReviews.length} Reviews
            </span>
          </div>

          {profileReviews.length === 0 ? (
            <div className="card-cinematic p-12 text-center border-dashed border-charcoal-border">
              <div className="w-14 h-14 rounded-2xl bg-charcoal border border-charcoal-border flex items-center justify-center mx-auto mb-4 text-gold">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-ivory mb-2">No Reviews Yet</h3>
              <p className="text-xs text-muted max-w-md mx-auto mb-6 leading-relaxed">
                You haven&apos;t reviewed any films yet. Explore the SCREENVERSE cinema catalogue, rate your favourite films, and share your critical perspectives.
              </p>
              <Link to="/explore" className="btn-gold !py-2.5 !px-6 text-xs inline-flex items-center gap-2">
                <Film className="w-4 h-4" />
                <span>Explore Movies &amp; Review</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {profileReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="card-cinematic p-5 sm:p-6 border-charcoal-border hover:border-gold/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    {/* Left: Movie thumbnail and Review title */}
                    <div className="flex items-start gap-4">
                      {rev.moviePoster && (
                        <Link
                          to={`/movie/${rev.movieId}`}
                          className="w-12 h-16 sm:w-14 sm:h-20 rounded-lg overflow-hidden bg-charcoal border border-charcoal-border flex-shrink-0 group"
                        >
                          <img
                            src={rev.moviePoster}
                            alt={rev.movieTitle}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </Link>
                      )}

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            to={`/movie/${rev.movieId}`}
                            className="font-display text-base sm:text-lg font-bold text-ivory hover:text-gold transition-colors inline-block"
                          >
                            {rev.movieTitle}
                          </Link>
                          {rev.isUserSubmitted ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gold/15 text-gold border border-gold/40">
                              Your Review
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-charcoal text-muted border border-charcoal-border">
                              Curated Review
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted mt-0.5">
                          {rev.movieYear} • {rev.movieGenre}
                        </p>
                        {rev.reviewTitle && (
                          <h4 className="text-sm font-semibold text-gold mt-1.5">
                            &quot;{rev.reviewTitle}&quot;
                          </h4>
                        )}
                      </div>
                    </div>

                    {/* Right: Rating Badge & Action Buttons */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 flex-shrink-0">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-midnight border border-gold/30 text-gold text-sm font-bold">
                        <Star className="w-3.5 h-3.5 fill-gold" />
                        <span>{Number(rev.rating).toFixed(1)}/10</span>
                      </div>
                      <span className="text-[11px] text-muted">{formatDate(rev.date)}</span>

                      {/* Interactive Controls for User-Authored Reviews */}
                      {rev.isUserSubmitted && (
                        <div className="flex items-center gap-1.5 pt-1">
                          <Link
                            to={`/movie/${rev.movieId}`}
                            className="p-1.5 rounded-lg text-muted hover:text-gold hover:bg-midnight transition-colors"
                            title="Edit Review"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteCandidateId(rev.id)}
                            className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-midnight transition-colors"
                            title="Delete Review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light pl-0 sm:pl-18">
                    {rev.reviewText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteCandidateId)}
        title="Delete Review?"
        message="Are you sure you want to delete your review? This action cannot be undone and will update your profile rating statistics."
        confirmText="Delete Review"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteCandidateId(null)}
      />

      {/* Edit Profile Modal Dialog */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-charcoal border border-charcoal-border rounded-2xl p-6 sm:p-8 shadow-cinematic text-ivory max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-2 text-muted hover:text-ivory rounded-lg hover:bg-charcoal-hover transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-6">
              <h3 className="font-display text-2xl font-bold text-ivory">Edit Profile</h3>
              <p className="text-xs text-muted">
                Update your community profile details and favourite genres.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ivory/80 mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-midnight border border-charcoal-border text-sm text-ivory focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ivory/80 mb-1">Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="e.g. Bengaluru, India"
                  className="w-full px-3.5 py-2 rounded-lg bg-midnight border border-charcoal-border text-sm text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ivory/80 mb-1">Profile Introduction / Bio</label>
                <textarea
                  rows="3"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-midnight border border-charcoal-border text-xs text-ivory focus:outline-none focus:border-gold leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ivory/80 mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  placeholder="/images/branding/film-reel-avatar.svg"
                  className="w-full px-3.5 py-2 rounded-lg bg-midnight border border-charcoal-border text-xs text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ivory/80 mb-2">
                  Favourite Genres (Select up to 5)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableGenres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                      <button
                        type="button"
                        key={genre}
                        onClick={() => handleToggleGenre(genre)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
                          isSelected
                            ? 'bg-gold text-midnight border-gold'
                            : 'bg-midnight text-muted border-charcoal-border hover:border-gold/40 hover:text-ivory'
                        }`}
                      >
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3 border-t border-charcoal-border">
                <button
                  type="button"
                  onClick={() => {
                    resetProfile();
                    setIsEditing(false);
                  }}
                  className="text-xs text-muted hover:text-gold transition-colors"
                >
                  Reset Defaults
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-xs text-muted hover:text-ivory"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold !text-xs !py-2 !px-5">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;