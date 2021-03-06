import { FETCH_RECORDING_SUCCESS, FETCH_RECORDING_FAILURE, RECORDING_STATE_LOADING, FETCH_RECORDING, CLEAR_RECORDING,
         FETCH_ALL_RECORDINGS_SUCCESS, SEARCH_RECORDINGS_SUCCESS, SEARCH_RECORDINGS_FAILURE } from '../actions/recording'

const initialState = {
    data: null,
    searchResults: null
};

export default function update(state = initialState, action) {
  switch(action.type) {

    case CLEAR_RECORDING:
      return { ...state, data: null, searchResults: null };

    case FETCH_RECORDING:
      return { ...state, data: null, searchResults: null };

    case FETCH_RECORDING_SUCCESS:
      return { ...state, data: action.payload.data };

    case SEARCH_RECORDINGS_SUCCESS:
      return { ...state, searchResults: action.payload.data }

    case FETCH_ALL_RECORDINGS_SUCCESS:
      return { ...state, allRecordings: action.payload.data }
  }

  return state
}
