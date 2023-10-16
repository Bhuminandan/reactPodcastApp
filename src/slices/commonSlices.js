import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        isMobNavOpen: false,
    },
    reducers: {
        toggleMobNavOpen: (state) => {
            state.isMobNavOpen = !state.isMobNavOpen;
        },
    },
})

export const { toggleMobNavOpen } = commonSlice.actions;
export default commonSlice.reducer;