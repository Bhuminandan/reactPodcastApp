import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice';
import podcastsSlice from "./slices/podcastsSlice";
import podcastsEpisodesSlice from "./slices/podcastsEpisodesSlice";
import audioSlice from "./slices/audioSlice";

const store = configureStore({
    reducer: {
        userSlice: userSlice,
        podcastsSlice: podcastsSlice,
        podcastEpisodes: podcastsEpisodesSlice,
        audioSlice: audioSlice,
    }
});

export default store;