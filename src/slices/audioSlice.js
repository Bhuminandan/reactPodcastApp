import { createSlice } from '@reduxjs/toolkit'


// Audio slice for saving the current audio and the current player states
const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        currentAudio: '',
        isPlayerVisible: false,
        currentPlayer: '',
        isPlaying: true,
        isMuted: false
    },
    reducers: {

        // Setting the current audio
        setCurrentAudio: (state, action) => {
            state.currentAudio = action.payload;
        },

        // Making the player visible
        setIsPlayerVisible: (state, action) => {
            state.isPlayerVisible = !state.isPlayerVisible;
            state.isPlaying = false
        },

        // Setting the current player small or full screen
        setCurrentPlayer: (state, action) => {
            state.currentPlayer = action.payload
        },

        // Toggling the isPlaying
        toggleIsPlaying: (state, action) => {
            state.isPlaying = !state.isPlaying
        },

        // Toggling the isMuted
        tooglgeIsMuted: (state, action) => {
            state.isMuted = !state.isMuted
        }
    }
})

// Exporting the actions
export const { setCurrentAudio, setIsPlayerVisible, toggleIsPlaying, tooglgeIsMuted, setCurrentPlayer } = audioSlice.actions;

// Exporting the reducer
export default audioSlice.reducer

