import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice';
import podcastsSlice from "./slices/podcastsSlice";
import podcastsEpisodesSlice from "./slices/podcastsEpisodesSlice";
import audioSlice from "./slices/audioSlice";
import commonSlices from "./slices/commonSlices";
import genreSlice from "./slices/genreSlice";


// Creating the store
const store = configureStore({

    // Configuring the store
    reducer: {
        userSlice: userSlice,
        podcastsSlice: podcastsSlice,
        podcastEpisodes: podcastsEpisodesSlice,
        audioSlice: audioSlice,
        commonSlice: commonSlices,
        genreSlice: genreSlice,
    }
});

export default store;