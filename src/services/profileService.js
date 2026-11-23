/**
 * SCREENVERSE – Profile Service
 * Manages user profile persistence and state synchronization.
 * Default profile: Arjun Sharma (@arjunsharma)
 */

import { getItem, setItem } from '../utils/storage';
import { STORAGE_KEYS, DEFAULT_DEMO_USER } from '../utils/constants';

/**
 * Migrate legacy profile and user reviews to Arjun Sharma if needed
 */
const migrateLegacyData = (storedProfile) => {
  // 1. Migrate user reviews in localStorage
  try {
    const existingReviews = getItem(STORAGE_KEYS.USER_REVIEWS, []);
    let modified = false;
    const migratedReviews = existingReviews.map((rev) => {
      if (
        rev.userName === 'Alex Morgan' ||
        rev.userName === 'Alex Mercer' ||
        rev.userId === 'user-alex-morgan' ||
        rev.userId === 'demo-user-screenverse'
      ) {
        modified = true;
        return {
          ...rev,
          userId: DEFAULT_DEMO_USER.id,
          userName: DEFAULT_DEMO_USER.displayName,
          userAvatar: DEFAULT_DEMO_USER.avatar,
          initials: DEFAULT_DEMO_USER.initials,
        };
      }
      return rev;
    });

    if (modified) {
      setItem(STORAGE_KEYS.USER_REVIEWS, migratedReviews);
    }
  } catch (err) {
    console.warn('[ProfileService] Migration check for user reviews failed:', err);
  }

  // 2. Build migrated profile
  const migratedProfile = {
    ...DEFAULT_DEMO_USER,
    ...(storedProfile && typeof storedProfile === 'object' ? storedProfile : {}),
    id: DEFAULT_DEMO_USER.id,
    displayName: DEFAULT_DEMO_USER.displayName,
    username: DEFAULT_DEMO_USER.username,
    email: DEFAULT_DEMO_USER.email,
    avatar: DEFAULT_DEMO_USER.avatar,
    initials: DEFAULT_DEMO_USER.initials,
    location: storedProfile?.location || DEFAULT_DEMO_USER.location,
    membership: storedProfile?.membership || DEFAULT_DEMO_USER.membership,
    favoriteGenres: storedProfile?.favoriteGenres || DEFAULT_DEMO_USER.favoriteGenres,
    bio: storedProfile?.bio || DEFAULT_DEMO_USER.bio,
    joinedDate: storedProfile?.joinedDate || DEFAULT_DEMO_USER.joinedDate,
    lastActive: new Date().toISOString(),
  };

  setItem(STORAGE_KEYS.PROFILE, migratedProfile);
  setItem(STORAGE_KEYS.AUTH_SESSION, {
    isAuthenticated: true,
    timestamp: Date.now(),
  });

  return migratedProfile;
};

/**
 * Retrieve current active profile from localStorage.
 * Automatically initializes and persists the default fictional profile if missing or outdated.
 * @returns {Object} Active user profile
 */
export const getCurrentProfile = () => {
  const stored = getItem(STORAGE_KEYS.PROFILE, null);

  // If already migrated Arjun Sharma with the new non-human avatar, return it
  if (
    stored &&
    stored.id === DEFAULT_DEMO_USER.id &&
    stored.displayName === DEFAULT_DEMO_USER.displayName &&
    stored.avatar === DEFAULT_DEMO_USER.avatar
  ) {
    return stored;
  }

  // Otherwise perform seamless migration to Arjun Sharma with golden film-reel avatar
  return migrateLegacyData(stored);
};

/**
 * Check if user is currently active/logged in
 * @returns {boolean}
 */
export const isDemoLoggedIn = () => {
  return true;
};

/**
 * Update editable profile fields
 * @param {Object} updates
 * @returns {Object} Updated profile
 */
export const updateProfile = (updates) => {
  const current = getCurrentProfile();

  const updated = {
    ...current,
    displayName: updates.displayName !== undefined ? updates.displayName.trim() : current.displayName,
    // Preserve film-reel avatar or allow valid custom paths
    avatar: updates.avatar !== undefined ? updates.avatar.trim() : current.avatar,
    location: updates.location !== undefined ? updates.location.trim() : current.location,
    bio: updates.bio !== undefined ? updates.bio.trim() : current.bio,
    favoriteGenres: Array.isArray(updates.favoriteGenres) ? updates.favoriteGenres : current.favoriteGenres,
    lastUpdated: new Date().toISOString(),
  };

  setItem(STORAGE_KEYS.PROFILE, updated);
  return updated;
};

/**
 * Reset profile back to original default specifications
 * @returns {Object}
 */
export const resetDefaultProfile = () => {
  setItem(STORAGE_KEYS.PROFILE, DEFAULT_DEMO_USER);
  return { ...DEFAULT_DEMO_USER };
};

/**
 * Optional session reset
 */
export const logoutDemoUser = () => {
  return resetDefaultProfile();
};
