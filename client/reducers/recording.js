import { FETCH_RECORDING_SUCCESS, FETCH_RECORDING_FAILURE, RECORDING_STATE_LOADING,
         RECORDING_STATE_LOADED, RECORDING_STATE_PLAYING, RECORDING_STATE_PAUSED,
         SET_RECORDING_STATE, RECORDING_LATCHED_TRUE, RECORDING_LATCHED_FALSE, 
         TOGGLE_LATCHED, SEARCH_RECORDINGS, SEARCH_RECORDINGS_SUCCESS, SEARCH_RECORDINGS_FAILURE } from '../actions/recording'

const initialState = {
    state: RECORDING_STATE_LOADING,
    currentCaption: null
};

export default function update(state = initialState, action) {
  switch(action.type) {
    case FETCH_RECORDING_SUCCESS:
        return { ...state, state: RECORDING_STATE_LOADED, data: action.payload.data };

    case SEARCH_RECORDINGS_SUCCESS:
        return { ...state, searchResults: action.payload.data }
  }

  return state
}

/*
function isParticle(definitions, token) {
    var particle = false;

    (definitions || []).forEach(function (definition) {
        if (definition.word === token) {
            particle = particle || definition.particle;
        }
    });

    return particle;
}
*/
