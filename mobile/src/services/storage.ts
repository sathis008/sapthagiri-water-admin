import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session } from '../types';
const KEY = '@sapthagiri/session';
export const sessionStorage = {
  get: async (): Promise<Session | null> => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  },
  set: async (session: Session) => {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(session));
    } catch {}
  },
  clear: async () => {
    try {
      await AsyncStorage.removeItem(KEY);
    } catch {}
  }
};
