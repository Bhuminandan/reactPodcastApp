import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice';
import podcastsSlice from "./slices/podcastsSlice";

const store = configureStore({
    reducer: {
        userSlice: userSlice,
        podcastsSlice: podcastsSlice,
    }
});

export default store;