import { configureStore } from "@reduxjs/toolkit";
// redux-logger
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/language/languageSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        language: languageReducer,
        auth: authReducer
    },
    devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AddDispatch = typeof store.dispatch;