import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentProfile,
  updateProfile as updateProfileService,
  resetDefaultProfile,
} from '../services/profileService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Pre-initialize with default profile synchronously
  const [user, setUser] = useState(() => getCurrentProfile());
  const loading = false;

  useEffect(() => {
    // Ensure profile is always initialized and consistent
    const profile = getCurrentProfile();
    setUser(profile);
  }, []);

  const update = (updates) => {
    const updated = updateProfileService(updates);
    if (updated) {
      setUser(updated);
    }
    return updated;
  };

  const resetProfile = () => {
    const def = resetDefaultProfile();
    setUser(def);
    return def;
  };

  const value = {
    user,
    isAuthenticated: true,
    loading,
    updateProfile: update,
    resetProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
