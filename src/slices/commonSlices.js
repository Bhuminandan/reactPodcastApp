import { createSlice } from "@reduxjs/toolkit";

// Common slice for multiple things like toggle mob nav etc
const commonSlice = createSlice({
    name: "common",
    initialState: {
        isMobNavOpen: false,
        currentPodcastViews: []
    },
    reducers: {
        // Toggling the mob nav
        toggleMobNavOpen: (state) => {
            state.isMobNavOpen = !state.isMobNavOpen;
        },
        setCurrentPodcastViews: (state, action) => {
            state.currentPodcastViews = action.payload;
        }
    },
})

// Exporting the actions
export const { toggleMobNavOpen, setCurrentPodcastViews } = commonSlice.actions;

// Exporting the reducer
export default commonSlice.reducer;