import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from './services/api';
import type { Session } from './types';
type AuthState = { session: Session | null; restored: boolean };
const authSlice = createSlice({ name: 'auth', initialState: { session: null, restored: false } as AuthState, reducers: { setSession: (s, a: PayloadAction<Session | null>) => { s.session = a.payload; }, setRestored: (s) => { s.restored = true; } } });
export const { setSession, setRestored } = authSlice.actions;
export const store = configureStore({ reducer: { auth: authSlice.reducer, [api.reducerPath]: api.reducer }, middleware: (gDM) => gDM().concat(api.middleware) });
export type RootState = ReturnType<typeof store.getState>; export type AppDispatch = typeof store.dispatch;
