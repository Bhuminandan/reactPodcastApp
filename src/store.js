import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice';
import podcastsSlice from "./slices/podcastsSlice";
import podcastsEpisodesSlice from "./slices/podcastsEpisodesSlice";

const store = configureStore({
    reducer: {
        userSlice: userSlice,
        podcastsSlice: podcastsSlice,
        podcastEpisodes: podcastsEpisodesSlice
    }
});

export default store;