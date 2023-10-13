import { createSlice } from "@reduxjs/toolkit";

const podcastEpisodesSlice = createSlice({
    name: 'podcastEpisodes',
    initialState: [],
    reducers: {
        setPodcastEpisodes: (state, action) => {
            return action.payload;
        }
    }
})

export const { setPodcastEpisodes } = podcastEpisodesSlice.actions
export default podcastEpisodesSlice.reducer