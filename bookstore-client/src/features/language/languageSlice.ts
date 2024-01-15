import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const languagesAvailable = ['en', 'ro'];
const language = localStorage.getItem('language');

const checkActualLanguage = () => {
    if (language) {
        return languagesAvailable.includes(JSON.parse(language));
    }

    return false;
}

type InitialState = {
    language: string;
}

const initialState: InitialState = {
    language:  checkActualLanguage() ? JSON.parse(language!) : 'en'
}

const languageSlice = createSlice({
    name: 'language',
    initialState: initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    }
});

export default languageSlice.reducer;
export const { setLanguage } = languageSlice.actions;