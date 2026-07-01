import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth";
import { customerReducer } from "./customer";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
});

const storageEngine = (storage as { default?: typeof storage }).default ?? storage;

const persistConfig = {
  key: "root",
  storage: storageEngine,
  whitelist: ["auth"], // Only auth will be persisted
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;