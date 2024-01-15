import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const themesAvailable = ['light', 'dark'];
const theme = localStorage.getItem('theme');

const isThemeSetExisting = () => {
    if (theme) {
        return themesAvailable.includes(JSON.parse(theme));
    }

    return false;
}

type InitialState = {
    theme: string;
}

const initialState: InitialState = {
    theme: isThemeSetExisting() ? JSON.parse(theme!) : 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';

            localStorage.setItem('theme', JSON.stringify(state.theme));
        }
    }
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;