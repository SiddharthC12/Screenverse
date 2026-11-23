import { useState, useEffect } from 'react';
import { X, Send, Edit3, AlertCircle } from 'lucide-react';
import RatingInput from './RatingInput';
import { useAuth } from '../../context/AuthContext';

export const ReviewForm = ({
  movieTitle,
  initialData = null, // If provided, mode is 'edit'
  onSubmit,
  onCancel,
}) => {
  const { user } = useAuth();

  const [rating, setRating] = useState(initialData?.rating || 8.0);
  const [reviewTitle, setReviewTitle] = useState(initialData?.reviewTitle || '');
  const [reviewText, setReviewText] = useState(initialData?.reviewText || '');
  const [error, setError] = useState('');

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating || 8.0);
      setReviewTitle(initialData.reviewTitle || '');
      setReviewText(initialData.reviewText || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!reviewTitle.trim() || reviewTitle.trim().length < 3) {
      setError('Please provide a review headline (at least 3 characters).');
      return;
    }

    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setError('Please provide a thoughtful review description (at least 10 characters).');
      return;
    }

    if (rating < 1 || rating > 10) {
      setError('Rating must be between 1.0 and 10.0.');
      return;
    }

    onSubmit({
      rating,
      reviewTitle: reviewTitle.trim(),
      reviewText: reviewText.trim(),
    });
  };

  return (
    <div className="card-cinematic p-6 sm:p-7 border-gold/40 shadow-cinematic bg-charcoal/95">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-charcoal-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full overflow-hidden border border-gold/40 flex-shrink-0 bg-midnight">
              <img
                src={user?.avatar || '/images/branding/film-reel-avatar.svg'}
                alt={user?.displayName || 'Arjun Sharma'}
                className="w-full h-full object-cover"
              />
            </span>
            <span className="text-xs font-semibold text-ivory">
              {user?.displayName || 'Arjun Sharma'}
            </span>
            <span className="text-[10px] text-gold uppercase tracking-wider font-medium">
              Reviewer
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-ivory">
            {isEditMode ? `Edit Your Review: ${movieTitle}` : `Review ${movieTitle}`}
          </h3>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-muted hover:text-ivory hover:bg-charcoal-hover transition-colors"
            aria-label="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Validation Alert */}
      {error && (
        <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating Selector */}
        <RatingInput value={rating} onChange={(val) => setRating(val)} />

        {/* Review Headline Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/90">
              Review Headline
            </label>
            <span className="text-[10px] text-muted">{reviewTitle.length}/100</span>
          </div>
          <input
            type="text"
            maxLength={100}
            placeholder="e.g. An Unforgettable Cinematic Experience"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-border text-sm text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors"
            required
          />
        </div>

        {/* Review Body Textarea */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/90">
              Your Review &amp; Reflections
            </label>
            <span className="text-[10px] text-muted">{reviewText.length}/1000</span>
          </div>
          <textarea
            rows="4"
            maxLength={1000}
            placeholder="Share your thoughts on the storytelling, acting, directing, score, or themes..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-border text-xs sm:text-sm text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors leading-relaxed"
            required
          />
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-xs font-medium text-muted hover:text-ivory transition-colors"
            >
              Cancel
            </button>
          )}

          <button type="submit" className="btn-gold !py-2.5 !px-5 shadow-gold-glow">
            {isEditMode ? (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publish Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
