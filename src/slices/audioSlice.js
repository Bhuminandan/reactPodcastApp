import { createSlice } from '@reduxjs/toolkit'

const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        currentAudio: '',
        isPlayerVisible: false,
        isPlaying: true,
        isMuted: false
    },
    reducers: {
        setCurrentAudio: (state, action) => {
            state.currentAudio = action.payload;
        },
        setIsPlayerVisible: (state, action) => {
            state.isPlayerVisible = !state.isPlayerVisible;
            state.isPlaying = false
        },
        toggleIsPlaying: (state, action) => {
            state.isPlaying = !state.isPlaying
        },
        tooglgeIsMuted: (state, action) => {
            state.isMuted = !state.isMuted
        }
    }
})

export const { setCurrentAudio, setIsPlayerVisible, toggleIsPlaying, tooglgeIsMuted } = audioSlice.actions;
export default audioSlice.reducer

