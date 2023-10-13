import { createSlice } from '@reduxjs/toolkit'

const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        currentAudio: '',
        isPlayerVisible: false,
        isPlaying: false,
    },
    reducers: {
        setCurrentAudio: (state, action) => {
            state.currentAudio = action.payload;
        },
        setIsPlayerVisible: (state, action) => {
            state.isPlayerVisible = !state.isPlayerVisible;
        },
        toggleIsPlaying: (state, action) => {
            state.isPlaying = !state.isPlaying
        }
    }
})

export const { setCurrentAudio, setIsPlayerVisible, toggleIsPlaying } = audioSlice.actions;
export default audioSlice.reducer

