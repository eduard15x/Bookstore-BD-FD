import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    theme: string;
}

const initialState: InitialState = {
    theme: 'light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme == 'light' ? 'dark' : 'light';
        }
    }
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;