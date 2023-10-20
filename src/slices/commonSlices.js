import { createSlice } from "@reduxjs/toolkit";

// Common slice for multiple things like toggle mob nav etc
const commonSlice = createSlice({
    name: "common",
    initialState: {
        isMobNavOpen: false,
    },
    reducers: {

        // Toggling the mob nav
        toggleMobNavOpen: (state) => {
            state.isMobNavOpen = !state.isMobNavOpen;
        },
    },
})

// Exporting the actions
export const { toggleMobNavOpen } = commonSlice.actions;

// Exporting the reducer
export default commonSlice.reducer;