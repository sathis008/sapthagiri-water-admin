import { STORAGE_KEYS } from '@/constants/storage';

export const Storage = {
  setToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  removeToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  setUser(user: unknown) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);

    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getSession() {
    return {
      token: this.getToken(),
      user: this.getUser(),
    };
  },

  clear() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
