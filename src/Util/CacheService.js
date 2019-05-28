const Keys = {
  AUTH_DATA: 'AUTH_DATA',
  PROFILE_DATA: 'PROFILE_DATA',
};

export const CacheService = {
  saveAuthData: (data) => {
    localStorage.setItem(Keys.AUTH_DATA, JSON.stringify(data));
  },

  clearAuthData: () => {
    localStorage.removeItem(Keys.AUTH_DATA);
  },

  getAuthData: () => JSON.parse(localStorage.getItem(Keys.AUTH_DATA)),

  saveProfileData: (data) => {
    localStorage.setItem(Keys.PROFILE_DATA, JSON.stringify(data));
  },

  clearProfileData: () => {
    localStorage.removeItem(Keys.PROFILE_DATA);
  },

  getProfileData: () => JSON.parse(localStorage.getItem(Keys.PROFILE_DATA)),
};
