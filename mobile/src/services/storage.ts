import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session } from '../types';
const KEY = '@sapthagiri/session';
export const sessionStorage = { get: async (): Promise<Session | null> => { const raw = await AsyncStorage.getItem(KEY); return raw ? JSON.parse(raw) as Session : null; }, set: (session: Session) => AsyncStorage.setItem(KEY, JSON.stringify(session)), clear: () => AsyncStorage.removeItem(KEY) };
