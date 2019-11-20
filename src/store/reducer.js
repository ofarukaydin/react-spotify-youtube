import * as actionTypes from './actions';

const initialState = {
    player: {
        url: null,
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        seeking: false
    }

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TRACK:
            return {
                ...state,
                player: {
                    ...state.player,
                    url: action.url,
                    played: 0,
                    loaded: 0,
                    pip: false,
                    playing: true
                }
            }
        case actionTypes.PLAY_PAUSE:
            return {
                ...state,
                player: {
                    ...state.player,
                    playing: !state.player.playing
                }
            }
        case actionTypes.TOGGLE_LOOP:
            return {
                ...state,
                player: {
                    ...state.player,
                    loop: !state.player.loop
                }
            }
        case actionTypes.VOLUME_CHANGE:
            return {
                ...state,
                player: {
                    ...state.player,
                    volume: action.value
                }
            }
        case actionTypes.TOGGLE_MUTED:
            return {
                ...state,
                player: {
                    ...state.player,
                    muted: !state.player.muted
                }
            }
        case actionTypes.PLAY:
            return {
                ...state,
                player: {
                    ...state.player,
                    playing: true
                }
            }
        case actionTypes.PAUSE:
            return {
                ...state,
                player: {
                    ...state.player,
                    playing: false
                }
            }
        case actionTypes.SEEK_MOUSE_DOWN:
            return {
                ...state,
                player: {
                    ...state.player,
                    seeking: true
                }
            }

        case actionTypes.SEEK_CHANGE:
            return {
                ...state,
                player: {
                    ...state.player,
                    played: action.value
                }
            }

        case actionTypes.SEEK_MOUSE_UP:
            return {
                ...state,
                player: {
                    ...state.player,
                    seeking: false
                }
            }
        case actionTypes.HANDLE_PROGRESS:
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.value
                }
            }
        case actionTypes.HANDLE_ENDED:
            return {
                ...state,
                player: {
                    ...state.player,
                    playing: state.player.loop
                }
            }
        case actionTypes.HANDLE_DURATION:
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.value
                }
            }
        default:
            return state;
    }

};

export default reducer;