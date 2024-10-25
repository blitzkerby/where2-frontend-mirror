import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice";
import pagReducer from './slices/paginationSlice';
import favoriteReducer from './slices/favoriteSlice';
import universityReducer from './slices/universitySlice';
import scholarReducer from './slices/scholarshipsSlice';
import accommodationReducer from './slices/accommodationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    universities: universityReducer,
    job: jobReducer,
    // auth: authReducer,
    // user: userReducer,
    pagination: pagReducer,
    favorites: favoriteReducer,
    scholarships: scholarReducer,
    accommodations: accommodationReducer
  },

},
);